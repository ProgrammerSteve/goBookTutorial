package main

import (
	"log"

	"github.com/ProgrammerSteve/goBookTutorial/src/rest"
)

func main() {
	log.Println("Main log...")
	rest.RunAPI(":9090")
}
