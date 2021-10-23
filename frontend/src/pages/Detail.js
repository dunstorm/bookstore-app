import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Page from '../components/Page'
import Star from '../components/Star'
import SubHeader from '../components/SubHeader'
import EditIcon from '../components/EditIcon'

import _ from "lodash"

export default function Detail({ token }) {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch("http://localhost:4000/v1/book/" + id)
            .then((response) => {
                console.log(response.status !== 200);
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
                    setBook(json.book);
                    setIsLoaded(true);
                    setError('');
                }
            })
    }, [id])

    if (error) {
        return (
            <div className="p-6">{error}</div>
        )
    } else {
        if (isLoaded) {
            return (
                <Page title={book.title}>
                    <Helmet>
                        <title>Bookstore - {book.title}</title>
                    </Helmet>
                    {token && <div className="mt-4 w-10 transition duration-150 hover:text-yellow-400"><Link to={`/book/${book.id}/edit`}><EditIcon/></Link></div>}
                    <img className="mt-6 w-48 sepia rounded" src={book.image} alt="" />
                    <div className="mt-4 flex">
                        {_.times(book.rating, () => (
                            <Star isSolid></Star>
                        ))}
                        {_.times(5 - book.rating, () => (
                            <Star></Star>
                        ))}
                    </div>
                    <SubHeader title="Title" content={book.title}></SubHeader>
                    <SubHeader title="Author" content={book.author}></SubHeader>
                    <SubHeader title="Description" content={book.description}></SubHeader>
                    <SubHeader title="Tags" content={book.tags.join(", ")}></SubHeader>
                </Page>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}
