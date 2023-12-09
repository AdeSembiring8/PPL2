package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	. "github.com/tbxark/g4vercel"
	"github.com/veritrans/go-midtrans"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var userCollection *mongo.Collection
var productsCollection *mongo.Collection
var categoriesCollection *mongo.Collection
var transactionsCollection *mongo.Collection
var googleOauthConfig *oauth2.Config
var jwtSecretKey = []byte(os.Getenv("SECRET_KEY"))

type user struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type product struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name     string             `json:"name"`
	Category string             `json:"category"`
	Price    int64              `json:"price"`
	Unit     string             `json:"unit"`
	Image    string             `json:"image"`
}

type category struct {
	Id   primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name string             `json:"name"`
}

type province struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type regency struct {
	ID         string `json:"id"`
	ProvinceID string `json:"province_id"`
	Name       string `json:"name"`
}

type district struct {
	ID        string `json:"id"`
	RegencyID string `json:"regency_id"`
	Name      string `json:"name"`
}

type village struct {
	ID         string `json:"id"`
	DistrictID string `json:"district_id"`
	Name       string `json:"name"`
}

type transaction struct {
	OrderID       string `json:"orderId"`
	User          string `json:"userId"`
	Product       string `json:"productId"`
	Address       string `json:"address"`
	Shipping      string `json:"shipping"`
	Quantity      int64  `json:"quantity"`
	AdminFee      int64  `json:"adminFee"`
	ShippingFee   int64  `json:"shippingFee"`
	PaymentStatus string `json:"paymentStatus"`
}

type transactionRequest struct {
	User        string `json:"userId"`
	Product     string `json:"productId"`
	Address     string `json:"address"`
	Shipping    string `json:"shipping"`
	Quantity    int64  `json:"quantity"`
	Total       int64  `json:"total"`
	AdminFee    int64  `json:"adminFee"`
	ShippingFee int64  `json:"shippingFee"`
}

func registerUser(c *Context) {
	var newUser user

	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, H{"message": err.Error()})
		return
	}

	// Check if the username already exists
	existingUser := user{}
	err := userCollection.FindOne(context.TODO(), bson.M{"username": newUser.Username}).Decode(&existingUser)
	if err == nil {
		c.JSON(http.StatusConflict, H{"message": "Username already exists"})
		return
	}

	// Hash the user's password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to hash password"})
		return
	}

	// Store the hashed password in the user struct
	newUser.Password = string(hashedPassword)

	// Insert the new user into the MongoDB collection
	_, err = userCollection.InsertOne(context.TODO(), newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to register user"})
		return
	}

	c.JSON(http.StatusCreated, H{"message": "Success"})
}

func loginUser(c *Context) {
	var loginData user

	if err := c.BindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, H{"message": err.Error()})
		return
	}

	// Find the user by username
	existingUser := user{}
	err := userCollection.FindOne(context.TODO(), bson.M{"username": loginData.Username}).Decode(&existingUser)
	if err != nil {
		c.JSON(http.StatusUnauthorized, H{"message": "Invalid username or password"})
		return
	}

	// Check the password using bcrypt
	err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(loginData.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, H{"message": "Invalid username or password"})
		return
	}

	// Generate a JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": existingUser.Username,
		"exp":      time.Now().Add(time.Hour * 1).Unix(), // Token expires in 1 hour
	})

	// Sign and get the complete encoded token as a string
	tokenString, err := token.SignedString(jwtSecretKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to generate token"})
		return
	}

	c.SetCookie("token", tokenString, int(time.Hour.Seconds()), "/", os.Getenv("HOST"), false, false)

	c.JSON(http.StatusOK, H{"message": "Success", "data": H{"token": tokenString}})
}

func loginGoogle(c *Context) {
	url := googleOauthConfig.AuthCodeURL(os.Getenv("OAUTH_KEY"))
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func loginGoogleCallback(c *Context) {
	state := c.Query("state")
	if state != os.Getenv("OAUTH_KEY") {
		fmt.Println("Invalid oauth state")
		c.Redirect(http.StatusTemporaryRedirect, "/")
		return
	}

	code := c.Query("code")
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		fmt.Println("Code exchange failed with error:", err)
		c.Redirect(http.StatusTemporaryRedirect, "/")
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		fmt.Println("Failed to get user info:", err)
		c.Redirect(http.StatusTemporaryRedirect, "/")
		return
	}
	defer resp.Body.Close()

	// Parse the JSON response to get user details
	// For simplicity, you might want to use a library like `encoding/json`

	fmt.Println("Login successful")
	c.Redirect(http.StatusTemporaryRedirect, "/")
}

func logoutUser(c *Context) {
	// Delete the token cookie by setting an expired cookie
	c.SetCookie("token", "", -1, "/", os.Getenv("HOST"), false, false)

	c.JSON(http.StatusOK, H{"message": "Success"})
}

func getProducts(c *Context) {
	cursor, err := productsCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to fetch products"})
		return
	}
	defer cursor.Close(context.TODO())

	var products []product
	if err := cursor.All(context.TODO(), &products); err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to decode products"})
		return
	}

	c.JSON(http.StatusOK, H{"message": "Success", "data": products})
}

func getCategories(c *Context) {
	cursor, err := categoriesCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to fetch categories"})
		return
	}
	defer cursor.Close(context.TODO())

	var categories []category
	if err := cursor.All(context.TODO(), &categories); err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to decode categories"})
		return
	}

	c.JSON(http.StatusOK, H{"message": "Success", "data": categories})
}

func getProduct(c *Context) {
	productID := c.Param("id")

	objectID, err := primitive.ObjectIDFromHex(productID)
	if err != nil {
		c.JSON(http.StatusBadRequest, H{"message": "Invalid product ID"})
		return
	}

	var foundProduct product
	err = productsCollection.FindOne(context.TODO(), bson.M{"_id": objectID}).Decode(&foundProduct)
	if err != nil {
		c.JSON(http.StatusNotFound, H{"message": "Product not found"})
		return
	}

	c.JSON(http.StatusOK, H{"message": "Success", "data": foundProduct})
}

func getProvinces(c *Context) {
	// Create a new request to the external API
	url := "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to create request to external API", "error": err.Error()})
		return
	}

	// Forward the request to the external API
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to call external API", "error": err.Error()})
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to read response from external API", "error": err.Error()})
		return
	}

	// Unmarshal the JSON data into a slice of Province structs
	var provinces []province
	if err := json.Unmarshal([]byte(string(body)), &provinces); err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to unmarshal JSON data", "error": err.Error()})
		return
	}

	result := H{
		"message": "Success",
		"data":    provinces,
	}

	// Return the response from the external API
	c.JSON(http.StatusOK, result)
}

func getRegencies(c *Context) {
	provinceID := c.Param("id")
	// Create a new request to the external API
	url := fmt.Sprintf("https://emsifa.github.io/api-wilayah-indonesia/api/regencies/%s.json", provinceID)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to create request to external API", "error": err.Error()})
		return
	}

	// Forward the request to the external API
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to call external API", "error": err.Error()})
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to read response from external API", "error": err.Error()})
		return
	}

	// Unmarshal the JSON data into a slice of Province structs
	var regencies []regency
	if err := json.Unmarshal([]byte(string(body)), &regencies); err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to unmarshal JSON data", "error": err.Error()})
		return
	}

	result := H{
		"message": "Success",
		"data":    regencies,
	}

	// Return the response from the external API
	c.JSON(http.StatusOK, result)
}

func getDistricts(c *Context) {
	regencyID := c.Param("id")
	// Create a new request to the external API
	url := fmt.Sprintf("https://emsifa.github.io/api-wilayah-indonesia/api/districts/%s.json", regencyID)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to create request to external API", "error": err.Error()})
		return
	}

	// Forward the request to the external API
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to call external API", "error": err.Error()})
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to read response from external API", "error": err.Error()})
		return
	}

	// Unmarshal the JSON data into a slice of Province structs
	var districts []district
	if err := json.Unmarshal([]byte(string(body)), &districts); err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to unmarshal JSON data", "error": err.Error()})
		return
	}

	result := H{
		"message": "Success",
		"data":    districts,
	}

	// Return the response from the external API
	c.JSON(http.StatusOK, result)
}

func getVillages(c *Context) {
	districtID := c.Param("id")
	// Create a new request to the external API
	url := fmt.Sprintf("https://emsifa.github.io/api-wilayah-indonesia/api/villages/%s.json", districtID)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to create request to external API", "error": err.Error()})
		return
	}

	// Forward the request to the external API
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to call external API", "error": err.Error()})
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to read response from external API", "error": err.Error()})
		return
	}

	// Unmarshal the JSON data into a slice of Province structs
	var villages []village
	if err := json.Unmarshal([]byte(string(body)), &villages); err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to unmarshal JSON data", "error": err.Error()})
		return
	}

	result := H{
		"message": "Success",
		"data":    villages,
	}

	// Return the response from the external API
	c.JSON(http.StatusOK, result)
}

func checkout(c *Context) {
	var req transactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, H{"error": err.Error()})
		return
	}

	midclient := midtrans.NewClient()

	// Generate a unique OrderID on the backend
	orderID := fmt.Sprintf("order_%d", time.Now().UnixNano())

	// Set your Midtrans API credentials
	midclient.ClientKey = os.Getenv("MIDTRANS_CLIENT_KEY")
	midclient.ServerKey = os.Getenv("MIDTRANS_SERVER_KEY")

	snapGateway := midtrans.SnapGateway{
		Client: midclient,
	}

	// Set transaction details
	snapReq := &midtrans.SnapReq{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  orderID,
			GrossAmt: req.AdminFee + req.ShippingFee + req.Total,
		},
		CustomerDetail: nil,
		Items:          nil,
	}

	// Create a Snap Token for checkout
	snapTokenResp, err := snapGateway.GetToken(snapReq)
	if err != nil {
		log.Println("Failed to create Snap Token:", err)
		c.JSON(http.StatusInternalServerError, H{"error": "Failed to create Snap Token"})
		return
	}

	// Save the transaction details in the database
	transaction := transaction{
		OrderID:       orderID,
		User:          req.User,
		Product:       req.Product,
		Address:       req.Address,
		Shipping:      req.Shipping,
		Quantity:      req.Quantity,
		AdminFee:      req.AdminFee,
		ShippingFee:   req.AdminFee,
		PaymentStatus: "Unpaid",
	}

	result, err := transactionsCollection.InsertOne(context.Background(), transaction)
	fmt.Println(result)
	if err != nil {
		log.Println("Failed to save transaction:", err)
		c.JSON(http.StatusInternalServerError, H{"error": "Failed to save transaction"})
		return
	}

	c.JSON(http.StatusOK, H{"message": "Success", "data": H{"token": snapTokenResp.Token}})
}

func midtransNotification(c *Context) {
	// Read the request body
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Println("Failed to read request body:", err)
		c.JSON(http.StatusInternalServerError, H{"error": "Failed to read request body"})
		return
	}

	// Process the callback data
	var callbackData map[string]interface{}
	err = json.Unmarshal(body, &callbackData)
	if err != nil {
		log.Println("Failed to unmarshal callback data:", err)
		c.JSON(http.StatusInternalServerError, H{"error": "Failed to process callback data"})
		return
	}

	// Extract relevant information from the callback data
	orderID, ok := callbackData["order_id"].(string)
	if !ok {
		log.Println("Failed to extract order_id from callback data")
		c.JSON(http.StatusBadRequest, H{"error": "Invalid callback data"})
		return
	}

	transactionStatus, ok := callbackData["transaction_status"].(string)
	if !ok {
		log.Println("Failed to extract transaction_status from callback data")
		c.JSON(http.StatusBadRequest, H{"error": "Invalid callback data"})
		return
	}

	filter := bson.M{"orderid": orderID}
	update := bson.M{"$set": bson.M{"status": transactionStatus}}

	// Update the payment status in the database based on the received data
	result, err := transactionsCollection.UpdateOne(context.Background(), filter, update)
	fmt.Println((result))
	if err != nil {
		log.Println("Failed to update payment status in the database:", err)
		c.JSON(http.StatusInternalServerError, H{"error": "Failed to update payment status"})
		return
	}

	c.JSON(http.StatusOK, H{"message": "Success"})
}

func getTransactionsByUser(c *Context) {
	userID := c.Param("id")
	cursor, err := transactionsCollection.Find(context.TODO(), bson.M{"user": userID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to fetch transactions"})
		return
	}
	defer cursor.Close(context.TODO())

	var transactions []transaction
	if err := cursor.All(context.TODO(), &transactions); err != nil {
		c.JSON(http.StatusInternalServerError, H{"message": "Failed to decode transactions"})
		return
	}

	c.JSON(http.StatusOK, H{"message": "Success", "data": transactions})
}

func test(c *Context) {
	c.String(http.StatusOK, "Hello worlds")
}

func Handler(w http.ResponseWriter, r *http.Request) {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(os.Getenv("MONGO_URI")).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	userCollection = client.Database(os.Getenv("MONGO_DATABASE")).Collection("users")
	productsCollection = client.Database(os.Getenv("MONGO_DATABASE")).Collection("products")
	categoriesCollection = client.Database(os.Getenv("MONGO_DATABASE")).Collection("categories")
	transactionsCollection = client.Database(os.Getenv("MONGO_DATABASE")).Collection("transactions")
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  fmt.Sprintf("http://%s/callback", os.Getenv("HOST")),
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}

	router := New()
	router.POST("/api/testing", test)
	router.POST("/api/register", registerUser)
	router.POST("/api/login", loginUser)
	router.GET("/api/login/google", loginGoogle)
	router.GET("/api/login/google/callback", loginGoogleCallback)
	router.POST("/api/logout", logoutUser)
	router.GET("/api/products", getProducts)
	router.GET("/api/products/:id", getProduct)
	router.GET("/api/categories", getCategories)
	router.GET("/api/provinces", getProvinces)
	router.GET("/api/regencies/:id", getRegencies)
	router.GET("/api/districts/:id", getDistricts)
	router.GET("/api/villages/:id", getVillages)
	router.GET("/api/transactions/:id", getTransactionsByUser)
	router.POST("/api/checkout", checkout)
	router.POST("/api/notification/midtrans", midtransNotification)
	router.Handle(w, r)
}
