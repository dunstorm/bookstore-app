import React from 'react'

export default function Page(props) {
    return (
        <div className={`p-4 ml-1 mt-4 ${props.className || ''}`}>
            {props.title && <span className="font-bold text-5xl">{props.title}</span>}
            {props.children}
        </div>
    )
}
