import React from 'react'
import NotifyMessage from './NotifyMessage'

export default function NotifyContainer({ messageData, setMessageData }) {
    const onAnimationEnd = (data) => {
        setMessageData(messageData => messageData.filter((item) => {
            return item.id !== data.id
        }));
    }

    return (
        <>
            <ul className="fixed z-10 grid grid-cols-1 gap-2 justify-center items-center transition duration-700 bottom-10 right-1/2 transform translate-x-1/2 md:bottom-auto md:top-2">
                {messageData.map(d => {
                    return <NotifyMessage key={d.id} currentMessage={d} onAnimationEnd={() => onAnimationEnd(d)}/> 
                })}
            </ul>
        </>
    )
}
