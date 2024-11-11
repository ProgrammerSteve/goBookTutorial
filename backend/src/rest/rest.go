package rest

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func RunAPIWithHandler(address string, h HandlerInterface) error {
	r := gin.Default() //gin.New() gets rid of default middlware

	r.GET("/", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"res": "okay"}) })
	r.GET("/products", h.GetProducts)
	r.GET("/promos", h.GetPromos)

	userGroup := r.Group("/user")
	{
		userGroup.POST("/:id/signout", h.SignOut)
		userGroup.GET("/:id/orders", h.GetOrders)
	}

	usersGroups := r.Group("/users")
	{
		usersGroups.POST("/charge", h.Charge)
		usersGroups.POST("/signin", h.SignIn)
		usersGroups.POST("", h.AddUser)
	}

	//return r.Run(address)
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	certPath := filepath.Join(wd, "cert.pem")
	keyPath := filepath.Join(wd, "key.pem")
	return r.RunTLS(address, certPath, keyPath)
}

func RunAPI(address string) error {
	h, err := NewHandler("mysql", "root:root@/gomusic")
	if err != nil {
		log.Println("Failed to connect to database")
		return err
	}
	return RunAPIWithHandler(address, h)
}
