package main

import (
	"context"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *Application) Wrap(next http.Handler) httprouter.Handle {
	return func(rw http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		ctx := context.WithValue(r.Context(), "params", ps)
		next.ServeHTTP(rw, r.WithContext(ctx))
	}
}

func (app *Application) routes() http.Handler {
	router := httprouter.New()
	secure := alice.New(app.CheckToken)

	router.GET("/", app.GetHome)
	router.GET("/v1/book/:id", app.GetOneBook)
	router.GET("/v1/books", app.GetAllBooks)

	// admin operations
	router.POST("/v1/book", app.Wrap(secure.ThenFunc(app.AddBook)))
	router.PUT("/v1/book", app.Wrap(secure.ThenFunc(app.UpdateBook)))
	router.DELETE("/v1/book/:id", app.Wrap(secure.ThenFunc(app.DeleteBook)))

	router.POST("/v1/login", app.Login)

	return app.EnableCors(router)
}
