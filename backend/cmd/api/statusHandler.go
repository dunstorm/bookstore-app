package main

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *Application) GetHome(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "REST API created by @dunstorm")
}
