import React from 'react'

export default function SubHeader(props) {
    return (
        <div className="mt-6 flex flex-col">
            <span className="font-bold text-3xl">{props.title}</span>
            <div className="mt-2 text-xl">
                {props.content}
            </div>
        </div>
    )
}
