package main

import (
	"encoding/json"
	"net/http"
)

type Error struct {
	Message string `json:"message"`
}

func (app *Application) RespondWithJson(w http.ResponseWriter, status int, data interface{}, wrap string) error {
	wrapper := make(map[string]interface{})

	wrapper[wrap] = data

	js, err := json.Marshal(wrapper)
	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)

	return nil
}

func (app *Application) RespondWithError(w http.ResponseWriter, err error) {
	theError := &Error{
		Message: err.Error(),
	}

	app.RespondWithJson(w, 400, theError, "error")
}
