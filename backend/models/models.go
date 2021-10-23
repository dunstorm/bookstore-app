package models

import (
	"database/sql"
	"time"
)

type Models struct {
	DB DBModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		DB: DBModel{DB: db},
	}
}

type Book struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	Image       string    `json:"image"`
	Description string    `json:"description"`
	Rating      int       `json:"rating"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	BookTag     []string  `json:"tags"`
}

type Tag struct {
	ID        int64     `json:"-"`
	TagName   string    `json:"name"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type BookTag struct {
	ID        int       `json:"-"`
	BookID    int       `json:"-"`
	TagID     int       `json:"-"`
	Tag       Tag       `json:"tag"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

// User is the type for user
type User struct {
	ID       int
	Email    string
	Password string
}
