import React from 'react'

export default function Button({ name, onClick }) {
    return (
        <button onClick={onClick} className="mt-6 px-4 py-3 w-32 bg-yellow-200 rounded-lg ease-in-out duration-200 hover:bg-yellow-300">{name}</button>
    )
}
