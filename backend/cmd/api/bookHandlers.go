package main

import (
	"backend/models"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/julienschmidt/httprouter"
)

type JsonResponse struct {
	OK bool `json:"ok"`
}

func (app *Application) GetOneBook(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.Logger.Println(errors.New("invalid id parameter"))
		app.RespondWithError(w, err)
		return
	}

	book, err := app.Models.DB.Get(id)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	err = app.RespondWithJson(w, http.StatusOK, book, "book")
	if err != nil {
		app.RespondWithError(w, err)
	}
}

func (app *Application) GetAllBooks(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	books, err := app.Models.DB.GetAll()
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	err = app.RespondWithJson(w, http.StatusOK, books, "books")
	if err != nil {
		app.RespondWithError(w, err)
	}
}

type BookPayload struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Author      string `json:"author"`
	Image       string `json:"image"`
	Description string `json:"description"`
	Rating      string `json:"rating"`
	Tags        string `json:"tags"`
}

func PayloadToBook(payload *BookPayload) (*models.Book, error) {
	var book models.Book
	var err error

	book.ID, err = strconv.Atoi(payload.ID)
	if err != nil {
		return nil, err
	}

	book.Title = payload.Title
	book.Author = payload.Author
	book.Description = payload.Description
	book.Image = payload.Image
	book.Rating, err = strconv.Atoi(payload.Rating)
	if err != nil {
		return nil, err
	}

	book.Image = payload.Image
	book.CreatedAt = time.Now()
	book.UpdatedAt = time.Now()
	book.BookTag = strings.Split(payload.Tags, ", ")

	return &book, nil
}

func (app *Application) AddBook(w http.ResponseWriter, r *http.Request) {
	var payload BookPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	book, err := PayloadToBook(&payload)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	err = app.Models.DB.Add(*book)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	response := JsonResponse{
		OK: true,
	}

	app.RespondWithJson(w, http.StatusAccepted, response, "response")
}

func (app *Application) UpdateBook(w http.ResponseWriter, r *http.Request) {
	var payload BookPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	book, err := PayloadToBook(&payload)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	err = app.Models.DB.Update(*book)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	response := JsonResponse{
		OK: true,
	}

	err = app.RespondWithJson(w, http.StatusOK, response, "response")
	if err != nil {
		app.RespondWithError(w, err)
	}
}

func (app *Application) DeleteBook(w http.ResponseWriter, r *http.Request) {
	ps := r.Context().Value("params").(httprouter.Params)

	id, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		app.Logger.Println(errors.New("invalid id parameter"))
		app.RespondWithError(w, err)
		return
	}

	err = app.Models.DB.Delete(id)
	if err != nil {
		app.RespondWithError(w, err)
		return
	}

	response := JsonResponse{
		OK: true,
	}

	err = app.RespondWithJson(w, http.StatusOK, response, "response")
	if err != nil {
		app.RespondWithError(w, err)
	}
}
