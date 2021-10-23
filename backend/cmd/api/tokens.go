package main

import (
	"backend/models"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/julienschmidt/httprouter"
	"github.com/pascaldekloe/jwt"
	"golang.org/x/crypto/bcrypt"
)

var validUser = models.User{
	ID:       10,
	Email:    "dunstorm",
	Password: "$2a$12$jFDadqueVBx.kHUKJNWxS.tkLWrTLTF9Qu/ofU9xZ8MeCRs..29pS",
}

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (app *Application) Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var creds Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		app.RespondWithError(w, errors.New("unauthorized"))
		return
	}

	hashedPassword := validUser.Password

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(creds.Password))
	if err != nil {
		app.RespondWithError(w, errors.New("unauthorized"))
		return
	}

	var claims jwt.Claims
	claims.Subject = fmt.Sprint(validUser.ID)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "bookybook.com"
	claims.Audiences = []string{"bookybook.com"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.Config.jwt.secret))
	if err != nil {
		app.RespondWithError(w, errors.New("error signing"))
		return
	}

	app.RespondWithJson(w, http.StatusOK, string(jwtBytes), "token")
}
