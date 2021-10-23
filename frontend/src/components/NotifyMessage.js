import React from 'react'

export default function NotifyMessage({ currentMessage, onAnimationEnd }) {
    const messageData = currentMessage;
    const Color = messageData['severity'] === 'error' ? 'red' : messageData['severity'] === 'success' ? 'green' : 'yellow';

    return (
        <div className={`flex items-center border-4 text-center border-${Color}-400 bg-${Color}-200 p-2 flex-col sm:flex-row animate-fade-in-out`} onAnimationEnd={onAnimationEnd}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 mb-1 text-${Color}-800 sm:mb-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {messageData['severity'] === 'error' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                {messageData['severity'] === 'warning' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                {messageData['severity'] === 'success' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />}
            </svg>
            <span className="mx-auto md:-ml-1">{messageData['message']}</span>
        </div>
    )
}
