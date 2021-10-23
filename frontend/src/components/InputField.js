import React from 'react'

export default function InputField(props) {
    return (
        <>
            <label className="mt-6 text-lg font-medium" htmlFor={props.name.toLowerCase()}>{props.name}</label>
            <input onKeyDown={(evt) => {
                if (evt.key === "Enter") {
                    if (props.onEnter)
                        props.onEnter(evt)
                }
            }} onChange={props.onChange || null} className="mt-4 p-2 md:mr-32 text-sm outline-none transition duration-200 rounded-lg ring-yellow-300 focus:ring" type={props.type} name={props.name.toLowerCase()} placeholder={props.placeholder}/>
        </>
    )
}
