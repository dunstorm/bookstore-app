package main

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/pascaldekloe/jwt"
)

func (app *Application) EnableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Authorization,Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

		next.ServeHTTP(w, r)
	})
}

func (app *Application) CheckToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Vary", "Authorization")

		authHeader := r.Header.Get("Authorization")

		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 {
			app.RespondWithError(w, errors.New("invalid auth header"))
			return
		}

		if headerParts[0] != "Bearer" {
			app.RespondWithError(w, errors.New("no bearer"))
			return
		}

		token := headerParts[1]

		claims, err := jwt.HMACCheck([]byte(token), []byte(app.Config.jwt.secret))
		if err != nil {
			app.RespondWithError(w, errors.New("failed hmac check"))
			return
		}

		if !claims.Valid(time.Now()) {
			app.RespondWithError(w, errors.New("token expired"))
			return
		}

		if !claims.AcceptAudience("bookybook.com") || claims.Issuer != "bookybook.com" {
			app.RespondWithError(w, errors.New("invalid audience"))
			return
		}

		_, err = strconv.ParseInt(claims.Subject, 10, 64)
		if err != nil {
			app.RespondWithError(w, err)
			return
		}

		next.ServeHTTP(w, r)
	})
}
