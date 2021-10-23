import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Helmet } from 'react-helmet'

import Page from '../components/Page'
import EditInputField from '../components/EditInputField'
import EditTextArea from '../components/EditTextArea'
import Button from '../components/Button'

export default function AddBook({ token, notifyMessage }) {
    const [book, setBook] = useState({
        "id": "0",
        "title": "",
        "author": "",
        "description": "",
        "tags": "",
        "rating": "",
        "image": "",
    });
    const history = useHistory();
    const requiredFields = ["title", "author", "description", "tags", "ratings", "image"];

    if (token === "") {
        history.push("/login");
    }

    const onAddBook = () => {
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
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(book)
            }).then((response) => {
                if (response.status !== 202) {
                    notifyMessage("error", "Invalid response code: " + response.status)
                    return null
                }
                return response.json()
            }).then((json) => {
                if (json !== null) {
                    if (json.response.ok === true) {
                        notifyMessage("success", "Created")
                        history.push("/dashboard");
                    } else {
                        notifyMessage("error", "Something went wrong")
                    }
                }
            }).catch((e) => {
                notifyMessage("error", e.toString())
            })
        }

    }

    const onChange = (e) => {
        const name = e.target.name;
        setBook({ ...book, [name]: e.target.value });
    }

    return (
        <Page className="flex flex-col">
            <Helmet>
                <title>Bookstore - Add Book</title>
            </Helmet>
            <EditInputField onChange={onChange} marginTop="2" name="Title" type="text" placeholder="What's the title?"></EditInputField>
            <EditInputField onChange={onChange} name="Author" value={book.author} placeholder="Who is the author?"></EditInputField>
            <EditTextArea onChange={onChange} name="Description" value={book.description} placeholder="Summarise the book"></EditTextArea>
            <EditInputField onChange={onChange} name="Tags" value={book.tags} placeholder="Tags separated by comma (,)"></EditInputField>
            <EditInputField onChange={onChange} name="Rating" type="text" value={book.rating} placeholder="Stars as integer"></EditInputField>
            <EditInputField onChange={onChange} name="Image" value={book.image} placeholder="Enter image url"></EditInputField>
            <img src={book.image} className="mt-6 w-40" alt="" />
            <Button name="Create" onClick={onAddBook}></Button>
        </Page>
    )
}
