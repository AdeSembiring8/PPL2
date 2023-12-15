package main

import (
	"bytes"
	"encoding/json"
	"io"
	"math/rand"
	"strconv"
	"net/http"
	"testing"
)

var baseUrl string = "http://52.221.249.20:8080"

func TestGetProducts(t *testing.T){
	url := baseUrl+"/api/products/656e0c412bdae0ba3854fc44"

	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:", err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:", err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		t.Error("Error decoding JSON:", err)
		return
	}

	message, ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
		return
	}

	if message == "Success" {
		t.Log("API test passed!")
	} else {
		t.Error("API test failed.\nresponse:",result,"\nexpected: Success")
	}
}

func TestGetProductsById(t *testing.T){
	url := baseUrl+"/api/products/656e0c412bdae0ba3854fc44"
	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:",err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body : ",err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body,&result)
	if err != nil {
		t.Error("Error decoding JSON : ",err)
		return
	}

	data, ok := result["data"].(map[string]interface{})
	if !ok {
		t.Error("Error: 'data' not found in JSON")
		return
	}

	name, ok := data["name"].(string)
	if !ok {
		t.Error("Error: 'name' not found in data JSON")
		return
	}

	if name == "Beras" {
		t.Log("API test passed!")
	}else{
		t.Error("API test failed.\nresponse:",result,"\nexpected: Beras")
	}
}

func TestRegisterSuccess(t *testing.T){
	url:= baseUrl+"/api/register"
	
	// variables for testing
	username := "testing" + strconv.Itoa(rand.Intn(101)) // Generate random username for testings
	password := "medan04"	
	requestBody := map[string]interface{}{
		"username": username,
		"password": password,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		t.Error("Error Encoding JSON:",err)
		return
	}

	response, err := http.Post(url,"application/json",bytes.NewBuffer(jsonData))
	if err != nil {
		t.Error("Error:",err)
		return
	}
	defer response.Body.Close()

	body,err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error Reading Response Body:",err)
	}

	var result map[string]interface{}
	err = json.Unmarshal(body,&result)
	if err != nil {
		t.Error("Error Encoding JSON:",err)
	}

	message,ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
	}

	if message == "Success" {
		t.Log("API test passed!")
	}else {
		t.Error("API test failed.\nresponse:",message,"\nexpected: Success")
	}
}

func TestRegisterAlreadyTaken(t *testing.T){
	url:= baseUrl+"/api/register"
	
	// variables for testing
	username := "ade"
	password := "tes"
	requestBody := map[string]interface{}{
		"username": username,
		"password": password,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		t.Error("Error Encoding JSON:",err)
		return
	}

	response, err := http.Post(url,"application/json",bytes.NewBuffer(jsonData))
	if err != nil {
		t.Error("Error:",err)
		return
	}
	defer response.Body.Close()

	body,err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error Reading Response Body:",err)
	}

	var result map[string]interface{}
	err = json.Unmarshal(body,&result)
	if err != nil {
		t.Error("Error Encoding JSON:",err)
	}

	message,ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
	}

	if message == "Username already exists" {
		t.Log("API test passed!")
	}else {
		t.Error("API test failed.\nresponse:",message,"\nexpected: Username already exists")
	}
}

func TestLoginSuccess(t *testing.T){
	url := baseUrl + "/api/login"

	username := "royalgen"
	password := "kamalganteng"
	requestBody := map[string]interface{}{
		"username" : username,
		"password" : password,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		t.Error("Error Encoding JSON:",err)
		return
	}

	response, err := http.Post(url,"application/json",bytes.NewBuffer(jsonData))
	if err != nil {
		t.Error("Error:",err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:",err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body,&result)
	if err != nil {
		t.Error("Error Decoding JSON:",err)
		return
	}

	message,ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
	}

	if message == "Success" {
		t.Log("API test success!")
	}else {
		t.Error("API test failed.\nresponse:",message,"\nexpected: Success")
	}
}

func TestLoginInvalid(t *testing.T){
	url := baseUrl + "/api/login"

	username := "royalgen"
	password := "kamalanteng"
	requestBody := map[string]interface{}{
		"username" : username,
		"password" : password,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		t.Error("Error Encoding JSON:",err)
		return
	}

	response, err := http.Post(url,"application/json",bytes.NewBuffer(jsonData))
	if err != nil {
		t.Error("Error:",err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:",err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body,&result)
	if err != nil {
		t.Error("Error Decoding JSON:",err)
		return
	}

	message,ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
	}

	if message == "Invalid username or password" {
		t.Log("API test success!")
	}else {
		t.Error("API test failed.\nresponse:",message,"\nexpected: Invalid username or password")
	}
}

func TestLogoutSuccess(t *testing.T){
	url := baseUrl + "/api/logout"

	response, err := http.Post(url,"application/json",&bytes.Buffer{})
	if err != nil {
		t.Error("Error:",err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:",err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body,&result)
	if err != nil {
		t.Error("Error Decoding JSON:",err)
		return
	}

	message,ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
	}

	if message == "Success" {
		t.Log("API test success!")
	}else {
		t.Error("API test failed.\nresponse:",message,"\nexpected: Success")
	}
}

func TestGetCategories(t *testing.T){
	url := baseUrl+"/api/categories"

	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:", err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:", err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		t.Error("Error decoding JSON:", err)
		return
	}

	message, ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
		return
	}

	if message == "Success" {
		t.Log("API test passed!")
	} else {
		t.Error("API test failed.\nresponse:",result,"\nexpected: Success")
	}
}

func TestGetProvinces(t *testing.T){
	url := baseUrl+"/api/provinces"

	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:", err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:", err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		t.Error("Error decoding JSON:", err)
		return
	}

	message, ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
		return
	}

	if message == "Success" {
		t.Log("API test passed!")
	} else {
		t.Error("API test failed.\nresponse:",result,"\nexpected: Success")
	}
}

func TestGetRegencies(t *testing.T){
	url := baseUrl+"/api/regencies/12"

	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:", err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:", err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		t.Error("Error decoding JSON:", err)
		return
	}

	message, ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
		return
	}

	if message == "Success" {
		t.Log("API test passed!")
	} else {
		t.Error("API test failed.\nresponse:",result,"\nexpected: Success")
	}	
}

func TestGetDistricts(t *testing.T){
	url := baseUrl+"/api/districts/1201"

	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:", err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:", err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		t.Error("Error decoding JSON:", err)
		return
	}

	message, ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
		return
	}

	if message == "Success" {
		t.Log("API test passed!")
	} else {
		t.Error("API test failed.\nresponse:",result,"\nexpected: Success")
	}
}

func TestGetVillages(t *testing.T){
	url := baseUrl+"/api/villages/1201060"

	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:", err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:", err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		t.Error("Error decoding JSON:", err)
		return
	}

	message, ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
		return
	}

	if message == "Success" {
		t.Log("API test passed!")
	} else {
		t.Error("API test failed.\nresponse:",result,"\nexpected: Success")
	}
}

func TestTransactionByUser(t *testing.T){
	url := baseUrl+"/api/transactions/656e0c412bdae0ba3854fc44"

	response, err := http.Get(url)
	if err != nil {
		t.Error("Error:", err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:", err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		t.Error("Error decoding JSON:", err)
		return
	}

	message, ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
		return
	}

	if message == "Success" {
		t.Log("API test passed!")
	} else {
		t.Error("API test failed.\nresponse:",result,"\nexpected: Success")
	}
}

func TestCheckout(t *testing.T){
	url := baseUrl + "/api/login"

	requestBody := map[string]interface{}{
		"userId": "656e0c412bdae0ba3854fc44",
		"productId": "656e0c412bdae0ba3854fc44",
		"address": "testing",
		"shipping": "reguler",
		"quantity": 10,
		"total": 10000,
		"adminFee": 5000,
		"shippingFee": 5000,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		t.Error("Error Encoding JSON:",err)
		return
	}

	response, err := http.Post(url,"application/json",bytes.NewBuffer(jsonData))
	if err != nil {
		t.Error("Error:",err)
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Error("Error reading response body:",err)
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(body,&result)
	if err != nil {
		t.Error("Error Decoding JSON:",err)
		return
	}

	message,ok := result["message"].(string)
	if !ok {
		t.Error("Error: 'message' not found in JSON")
	}

	if message == "Success" {
		t.Log("API test success!")
	}else {
		t.Error("API test failed.\nresponse:",message,"\nexpected: Success")
	}
}