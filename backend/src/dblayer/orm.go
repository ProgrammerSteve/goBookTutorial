package dblayer

import (
	"errors"

	"github.com/ProgrammerSteve/goBookTutorial/src/models"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type DBORM struct {
	*gorm.DB
}

// takes in a database name and connection string
// returns address to DBORM struct that embeds gorm.DB and err
func NewOrm(dbname, con string) (*DBORM, error) {
	db, err := gorm.Open(dbname, con)
	return &DBORM{
		DB: db,
	}, err
}

func (db *DBORM) GetAllProducts() (products []models.Product, err error) {
	return products, db.Find(&products).Error
}
func (db *DBORM) GetAllPromos() (products []models.Product, err error) {
	return products, db.Where("promotion IS NOT NULL").Find(&products).Error
}
func (db *DBORM) GetCustomerByName(firstname, lastname string) (customer models.Customer, err error) {
	return customer, db.Where(&models.Customer{FirstName: firstname, LastName: lastname}).Find(&customer).Error
}
func (db *DBORM) GetCustomerById(id int) (customer models.Customer, err error) {
	return customer, db.First(&customer, id).Error
}
func (db *DBORM) GetProduct(id int) (product models.Product, err error) {
	return product, db.First(&product, id).Error
}
func (db *DBORM) AddUser(customer models.Customer) (models.Customer, error) {
	hashPassword(&customer.Pass) //WE WILL COVER LATER
	customer.LoggedIn = true
	return customer, db.Create(&customer).Error
}

func (db *DBORM) SignInUser(email, pass string) (customer models.Customer, err error) {
	//verify pass, we cover this later
	if !checkPassword(pass) {
		return customer, errors.New("Invalid password")
	}
	//obtain a *gorm.DB object ref representing our customer's row
	result := db.Table("Customers").Where(&models.Customer{Email: email})
	//update the loggedin field
	err = result.Update("loggedin", 1).Error
	if err != nil {
		return customer, err
	}
	//return the new customer row from db
	return customer, result.Find(&customer).Error
}
func (db *DBORM) SignOutUserById(id int) error {
	customer := models.Customer{
		Model: gorm.Model{
			ID: uint(id),
		},
	}
	return db.Table("customers").Where(&customer).Update("loggedin", 0).Error
}
func (db *DBORM) GetCustomerOrdersByID(id int) (orders []models.Order, err error) {
	return orders, db.Table("orders").Select("*").Joins("join customers on customers.id = customer_id").Joins("join products on products.id = product_id").Where("customer_id = ?", id).Scan(&orders).Error
}
