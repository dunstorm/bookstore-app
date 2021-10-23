import React from 'react'

export default function EditInputField(props) {
    return (
        <>
            <label className={`mt-${props.marginTop || '6'} text-4xl font-bold`} htmlFor={props.name.toLowerCase()}>{props.name}</label>
            <input onKeyDown={(evt) => {
                if (evt.key === "Enter") {
                    if (props.onEnter)
                        props.onEnter(evt)
                }
            }} onChange={props.onChange || null} className="mt-4 p-2 md:mr-32 outline-none transition duration-200 rounded-lg ring-yellow-300 focus:ring" type={props.type} name={props.name.toLowerCase()} placeholder={props.placeholder} value={props.value}/>
        </>
    )
}
