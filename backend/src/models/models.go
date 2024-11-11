package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type Product struct {
	gorm.Model
	Image       string  `json:"img"`
	ImageAlt    string  `gorm:"column:imgalt" json:"imgalt"`
	Price       float64 `json:"price"`
	Promotion   float64 `json:"promotion"` //sql.NullFloat64
	ProductName string  `gorm:"column:productname" json:"productname"`
	Description string
}

type Customer struct {
	gorm.Model
	Name      string  `json:"name"`
	FirstName string  `gorm:"column:firstname" json:"firstname"`
	LastName  string  `gorm:"column:lastname" json:"lastname"`
	Email     string  `gorm:"column:email" json:"email"`
	Pass      string  `json:"password"`
	LoggedIn  bool    `gorm:"column:loggedin" json:"loggedin"`
	Orders    []Order `json:"orders"`
}

type Order struct {
	gorm.Model
	Product      `sql:"-"`
	Customer     `sql:"-"`
	CustomerID   int       `gorm:"column:customer_id"`
	ProductID    int       `gorm:"column:product_id"`
	Price        float64   `gorm:"price" json:"sell_price"`
	PurchaseDate time.Time `gorm:"column:pruchase_date" json:"purchase_date"`
}

// Used to define the table names with the GORM library
func (Customer) TableName() string {
	return "customers"
}
func (Product) TableName() string {
	return "products"
}
func (Order) TableName() string {
	return "orders"
}
