import React from 'react'

export default function HoverIcon(props) {
    return (
        <div className={`ml-2 cursor-pointer hover:bg-yellow-200 rounded-full p-2 ${props.className || ''}`} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
