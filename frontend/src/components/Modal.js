import React from 'react'

export default function Modal({ isModalOpen, onAgree, handleClose }) {
    if (isModalOpen !== null) {
        return (
            <div className={`fixed ${isModalOpen ? 'animate-fade-in opacity-100' : 'animate-fade-out opacity-0'} top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 p-4 rounded-lg bg-yellow-800`}>
                <div className="flex flex-col">
                    <button onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-auto mb-2 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <span className="text-yellow-100 font-semibold text-4xl p-4">Are you sure?</span>
                    <div className="flex p-4">
                        <button onClick={onAgree} className="mr-2 bg-green-200 px-4 py-2 rounded">Yes</button>
                        <button onClick={handleClose} className="bg-red-200 px-4 py-2 rounded">No</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }

}
