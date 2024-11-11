package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RunAPIWithHandler(address string, h HandlerInterface) error {
	r := gin.Default()

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

	return r.Run(address)
}

func RunAPI(address string) error {
	h, err := NewHandler()
	if err != nil {
		return err
	}
	return RunAPIWithHandler(address, h)
}
