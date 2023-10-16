package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

type User struct {
    Username string
    Password string
}

func Register(username, password string) error {
    collection := client.Database("yourDBName").Collection("users")
    user := User{Username: username, Password: password}

    _, err := collection.InsertOne(context.Background(), user)
    return err
}

func Login(username, password string) bool {
    collection := client.Database("yourDBName").Collection("users")
    var user User
    err := collection.FindOne(context.Background(), User{Username: username, Password: password}).Decode(&user)

    if err != nil {
        return false
    }

    return true
}

func main() {
    ConnectDB()
    r := mux.NewRouter()
    r.HandleFunc("/register", RegisterHandler).Methods("POST")
    r.HandleFunc("/login", LoginHandler).Methods("POST")

    http.Handle("/", r)
    http.ListenAndServe(":8080", nil)
}