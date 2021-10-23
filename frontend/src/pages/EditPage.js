import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { Helmet } from 'react-helmet'

import Page from '../components/Page'
import EditInputField from '../components/EditInputField'
import EditTextArea from '../components/EditTextArea'
import Button from '../components/Button'

export default function Detail({ token, notifyMessage }) {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const requiredFields = ["title", "author", "description", "tags", "ratings", "image"];

    if (token === "") {
        history.push("/login");
    }

    useEffect(() => {
        if (token === "") {
            return;
        }
        fetch("http://localhost:4000/v1/book/" + id)
            .then((response) => {
                if (response.status !== 200) {
                    let message = "Invalid response code: " + response.status;
                    setError(message);
                    setIsLoaded(true);
                    return
                }

                return response.json()
            })
            .then((json) => {
                if (typeof json !== 'undefined') {
                    json.book.id = json.book.id.toString();
                    json.book.rating = json.book.rating.toString();
                    json.book.tags = json.book.tags.join(", ");
                    setBook(json.book);
                    setIsLoaded(true);
                    setError('');
                }
            })
    }, [id, token])

    const onEditBook = () => {
        let conditionsMet = true;
        console.log(book)

        requiredFields.forEach(item => {
            if (book[item] === "") {
                notifyMessage("error", "Required field: " + item)
                conditionsMet = false;
            }
        })

        if (conditionsMet === true) {
            fetch("http://localhost:4000/v1/book", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(book)
            }).then(response => response.json())
            .then((json) => {
                if (json !== null) {
                    if (json.hasOwnProperty("error")) {
                        notifyMessage("error", json.error.message)
                    } else {
                        if (json.response.ok === true) {
                            notifyMessage("success", "Updated")
                            history.push("/dashboard");
                        }
                    }
                }
            }).catch((e) => {
                notifyMessage("error", e.toString())
            })
        }
    }

    const onChange = (e) => {
        const name = e.target.name;
        setBook({...book, [name]: e.target.value});
    }

    if (error) {
        return (
            <div className="p-6">{error}</div>
        )
    } else {
        if (isLoaded) {
            return (
                <Page className="flex flex-col">
                    <Helmet>
                        <title>Bookstore - Edit Book</title>
                    </Helmet>
                    <EditInputField onChange={onChange} marginTop="2" name="Title" type="text" value={book.title}></EditInputField>
                    <EditInputField onChange={onChange} name="Author" value={book.author}></EditInputField>
                    <EditTextArea onChange={onChange} name="Description" value={book.description}></EditTextArea>
                    <EditInputField onChange={onChange} name="Tags" value={book.tags}></EditInputField>
                    <EditInputField onChange={onChange} name="Stars" type="text" value={book.rating}></EditInputField>
                    <EditInputField onChange={onChange} name="Image" value={book.image}></EditInputField>
                    <img src={book.image} className="mt-6 w-40" alt="" />
                    <Button name="Save" onClick={onEditBook}></Button>
                </Page>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}
