import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Page from '../components/Page'
import Book from '../components/Book'
import { Helmet } from 'react-helmet'
import ShadowBook from '../components/ShadowBook'
import Modal from '../components/Modal'

import HoverIcon from '../components/HoverIcon'
import AddIcon from '../components/AddIcon'

export default function Dashboard({ token, notifyMessage }) {
    const history = useHistory();
    const [books, setBooks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isModalOpen, setModalOpen] = useState(null);
    const [idBook, setCurrentBook] = useState(null);

    if (token === "") {
        history.push("/login");
    }

    useEffect(() => {
        if (token === "") {
            return;
        }
        fetch("http://localhost:4000/v1/books")
            .then((response) => {
                if (response.status !== 200) {
                    let message = "Invalid response code: " + response.status;
                    setErrorMsg(message);
                    setIsLoaded(true);
                    return
                }

                return response.json()
            })
            .then((json) => {
                if (typeof json !== 'undefined') {
                    setBooks(json.books);
                    setIsLoaded(true);
                    setErrorMsg('');
                }
            }).catch((e) => {
                setErrorMsg(e.toString())
                setIsLoaded(true);
            })
    }, [token])

    const onBookDelete = (id) => {
        setModalOpen(true);
        setCurrentBook(id);
    }

    const onAgree = () => {
        fetch('http://localhost:4000/v1/book/' + idBook, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (response.status !== 200) {
                let message = "Invalid response code: " + response.status;
                notifyMessage("error", message)
                return null
            }

            return response.json()
        }).then((json) => {
            if (json !== null) {
                if (json.response.ok === true) {
                    const filteredBooks = books.filter(function(book){
                        return book.id !== idBook;
                    });
                    setBooks(filteredBooks)
                    notifyMessage("success", "Deleted")
                } else {
                    notifyMessage("error", "Error while deleting")
                }
            }
        })
        .catch((e) => {
            notifyMessage("error", e.toString())            
        })
        .finally(() => {
            setModalOpen(false);
        })
    }

    return (
        <>
            <Page title="Dashboard" className={isModalOpen ? 'filter blur pointer-events-none' : null}>
                <Helmet>
                    <title>Bookstore - Dashboard</title>
                </Helmet>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-4">
                    {isLoaded === true ?
                        (
                            errorMsg !== '' ? <div className="col-span-2">{errorMsg}</div> :
                                books.map((book) => (
                                    <Book key={book.id} onBookDelete={() => onBookDelete(book.id)} setModalOpen={setModalOpen} isAdmin={true} id={book.id} img={book.image} title={book.title} author={book.author}></Book>
                                ))
                        ) :
                        (
                            <>
                                <ShadowBook />
                                <ShadowBook />
                                <ShadowBook />
                            </>
                        )
                    }
                </div>
            </Page>
            <HoverIcon className="fixed bottom-6 right-6 bg-yellow-200" onClick={() => history.push("/book/add")}><AddIcon/></HoverIcon>
            <Modal isModalOpen={isModalOpen} onAgree={onAgree} handleClose={() => setModalOpen(false)}></Modal>
        </>
    )
}
