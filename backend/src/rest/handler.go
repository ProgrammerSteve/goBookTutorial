package rest

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"https://github.com/ProgrammerSteve/goBookTutorial/backend/src/dblayer"
	"https://github.com/ProgrammerSteve/goBookTutorial/backend/src/models"
	"github.com/gin-gonic/gin"
)


type HandlerInterface interface {
	GetProducts(c *gin.Context)
	GetPromos(c *gin.Context)
	AddUser(c *gin.Context)
	SignIn(c *gin.Context)
	SignOut(c *gin.Context)
	GetOrders(c *gin.Context)
	Charge(c *gin.Context)
   }

   type Handler struct{
    db dblayer.DBLayer
 }


 func NewHandler() (*Handler, error) {
	//This creates a new pointer to the Handler object
   return new(Handler), nil
   }