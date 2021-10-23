import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Book from '../components/Book';
import ShadowBook from '../components/ShadowBook';
import Page from '../components/Page'
import { Helmet } from 'react-helmet';

export default function Homepage({ token }) {
    const history = useHistory();

    const [books, setBooks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    if (token !== "") {
        history.push("/dashboard");
    }

    useEffect(() => {
        if (token !== "") {
            return;
        }

        fetch("http://localhost:4000/v1/books")
            .then((response) => {
                console.log(response.status !== 200);
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
            })
    }, [token])

    return (
        <Page title="Popular">
            <Helmet>
                <title>Bookstore - Home</title>
            </Helmet>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-4">
                {isLoaded === true ?
                    (
                        errorMsg !== '' ? <div className="col-span-2">{errorMsg}</div> :
                            books.map((book) => (
                                <Book key={book.id} id={book.id} img={book.image} title={book.title} author={book.author}></Book>
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
    )
}
