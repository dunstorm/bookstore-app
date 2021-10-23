import React from 'react'

export default function EditTextArea(props) {
    return (
        <>
            <label className="mt-6 text-4xl font-bold" htmlFor={props.name.toLowerCase()}>{props.name}</label>
            <textarea onKeyDown={(evt) => {
                if (evt.key === "Enter") {
                    if (props.onEnter)
                        props.onEnter(evt)
                }
            }} onChange={props.onChange || null} className="mt-4 p-2 md:mr-32 outline-none transition duration-200 h-32 rounded-lg ring-yellow-300 focus:ring" name={props.name.toLowerCase()} placeholder={props.placeholder} value={props.value}
            ></textarea>
        </>
    )
}
