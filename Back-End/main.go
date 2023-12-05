package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

var client *mongo.Client
var userCollection *mongo.Collection
var jwtSecretKey = []byte("kamsskuy")

type user struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type produk struct {
	Name     string `json:"name"`
	Category string `json:"category"`
	Price    uint8  `json:"price"`
	Unit     string `json:"unit"`
	Image    string `json:"image"`
}

type transaction struct {
	User     primitive.ObjectID `json:"userId" bson:"_id,omitempty"`
	Product  primitive.ObjectID `json:"productId" bson:"_id,omitempty"`
	Address  string             `json:"address"`
	Shipping string             `json:"shipping"`
	Quantity uint8              `json:"quantity"`
}

func registerUser(c *gin.Context) {
	var newUser user

	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Check if the username already exists
	existingUser := user{}
	err := userCollection.FindOne(context.TODO(), bson.M{"username": newUser.Username}).Decode(&existingUser)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"message": "Username already exists"})
		return
	}

	// Hash the user's password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password"})
		return
	}

	// Store the hashed password in the user struct
	newUser.Password = string(hashedPassword)

	// Insert the new user into the MongoDB collection
	_, err = userCollection.InsertOne(context.TODO(), newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to register user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Success Create User !!"})
}

func loginUser(c *gin.Context) {
	var loginData user

	if err := c.BindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Find the user by username
	existingUser := user{}
	err := userCollection.FindOne(context.TODO(), bson.M{"username": loginData.Username}).Decode(&existingUser)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid username or password"})
		return
	}

	// Check the password using bcrypt
	err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(loginData.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid username or password"})
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
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		return
	}

	c.SetCookie("token", tokenString, int(time.Hour.Seconds()), "/", "localhost", false, false)

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// logoutUser handles user logout by deleting the token cookie.
func logoutUser(c *gin.Context) {
	// Delete the token cookie by setting an expired cookie
	c.SetCookie("token", "", -1, "/", "localhost", false, false)

	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

func main() {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI("mongodb+srv://irfankamal021002:ovz8898ez1560@server1.yxruxl1.mongodb.net/?retryWrites=true&w=majority").SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	userCollection = client.Database("agrigo").Collection("users")

	router := gin.Default()
	router.POST("/register", registerUser)
	router.POST("/login", loginUser)
	router.POST("/logout", logoutUser)

	fmt.Println("Start server on localhost:8080")
	router.Run("localhost:8080")
}
