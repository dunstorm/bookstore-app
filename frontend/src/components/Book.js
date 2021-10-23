import React from 'react'
import { Link } from 'react-router-dom';
import EditIcon from './EditIcon';

export default function Book(props) {
    return (
        <div className="mt-6 relative bg-yellow-200 p-3">
            <Link to={`/book/${props.id}`}>
                <img className="h-48 filter sepia rounded mx-auto" src={props.img} alt={props.title} />
                <div className="text-gray-900 flex flex-col mt-2">
                    <span className="truncate overflow-ellipsis">{props.title}</span>
                    <span className="text-gray-500 text-sm truncate overflow-ellipsis">by {props.author}</span>
                </div>
            </Link>
            {props.isAdmin ? (
                <>
                    <div className="flex justify-end items-end bottom-2 right-2 mt-2">
                        <Link to={`/book/${props.id}/edit`}>
                            <EditIcon></EditIcon>
                        </Link>
                        <button onClick={props.onBookDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </>
            ) : ''}
        </div>
    )
}
