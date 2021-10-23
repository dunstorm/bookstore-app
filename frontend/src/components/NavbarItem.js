import React from 'react'

export default function NavbarItem(props) {
    return (
        <span className={`ml-4 ${props.isActive ? 'border-gray-600': 'border-transparent'} border-b-2 cursor-pointer ease-in-out duration-200 whitespace-nowrap hover:border-gray-600`}>{props.title}</span>
    )
}
