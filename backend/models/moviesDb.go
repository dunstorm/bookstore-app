package models

import (
	"context"
	"database/sql"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

func (m *DBModel) Get(id int) (*Book, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		SELECT id, title, author, image, description, rating, created_at, updated_at
		FROM books
		WHERE id = $1
	`

	row := m.DB.QueryRowContext(ctx, query, id)

	var book Book

	err := row.Scan(
		&book.ID,
		&book.Title,
		&book.Author,
		&book.Image,
		&book.Description,
		&book.Rating,
		&book.CreatedAt,
		&book.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	query = `
		SELECT t.name
		FROM books_tags bt
		LEFT JOIN tags t
		ON (t.id = bt.tag_id)
		WHERE bt.book_id = $1
	`
	rows, _ := m.DB.QueryContext(ctx, query, id)
	defer rows.Close()

	tags := []string{}

	for rows.Next() {
		var bt BookTag
		err := rows.Scan(
			&bt.Tag.TagName,
		)
		if err != nil {
			return nil, err
		}
		tags = append(tags, bt.Tag.TagName)
	}
	book.BookTag = tags

	return &book, nil
}

func (m *DBModel) GetAll() (*[]Book, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		SELECT id, title, author, image
		FROM books
		ORDER BY id
	`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []Book

	for rows.Next() {
		var book Book
		err := rows.Scan(
			&book.ID,
			&book.Title,
			&book.Author,
			&book.Image,
		)
		if err != nil {
			return nil, err
		}

		books = append(books, book)
	}

	return &books, nil
}

func CreateOrUpdate(m *DBModel, ctx *context.Context, book *Book, update bool) error {
	now := time.Now()

	for _, name := range book.BookTag {
		var tagRowId int
		query := `
			SELECT id
			FROM tags
			WHERE name = $1
		`
		err := m.DB.QueryRowContext(*ctx, query, name).Scan(&tagRowId)
		if err != nil {
			if err == sql.ErrNoRows {
				stmt := `
					INSERT INTO tags (name, created_at, updated_at)
					VALUES ($1, $2, $3)
					RETURNING id
				`
				err := m.DB.QueryRowContext(*ctx, stmt, name, now, now).Scan(&tagRowId)
				if err != nil {
					return err
				}
			} else {
				return err
			}
		}

		stmt := `
			INSERT INTO books_tags (book_id, tag_id, created_at, updated_at)
			VALUES ($1, $2, $3, $4)
		`
		_, err = m.DB.ExecContext(*ctx, stmt, book.ID, tagRowId, now, now)
		if err != nil {
			return err
		}
	}

	return nil
}

func (m *DBModel) Add(book Book) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		INSERT INTO books (title, author, image, description, rating, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id
	`

	err := m.DB.QueryRowContext(ctx, query,
		book.Title,
		book.Author,
		book.Image,
		book.Description,
		book.Rating,
		book.CreatedAt,
		book.UpdatedAt,
	).Scan(&book.ID)
	if err != nil {
		return err
	}

	err = CreateOrUpdate(m, &ctx, &book, false)
	if err != nil {
		return err
	}

	return nil
}

func (m *DBModel) Update(book Book) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		UPDATE books
		SET
			title = $1,
			author = $2,
			image = $3,
			description = $4,
			rating = $5,
			created_at = $6,
			updated_at = $7
		WHERE
			id = $8
	`

	_, err := m.DB.ExecContext(ctx, query,
		book.Title,
		book.Author,
		book.Image,
		book.Description,
		book.Rating,
		book.CreatedAt,
		book.UpdatedAt,
		book.ID,
	)
	if err != nil {
		return err
	}

	return nil
}

func (m *DBModel) Delete(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		DELETE FROM books
		WHERE id = $1
	`

	_, err := m.DB.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	return nil
}
