import React from 'react'

export const Begin = (props) => {
    return (
        <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none text-center">
            <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center sm:leading-none md:text-6xl lg:text-7xl">
                <span className="inline md:block">Should I Burn?</span>
            </h1>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                <button
                    onClick={() => props.setPermissionGranted(true)}
                    className="text-5xl font-extrabold leading-10 tracking-tight text-white rounded-full bg-indigo-600 p-12 text-center"
                >
                    Enable location
                </button>
            </div>
        </div>
    )
}

export default Begin
