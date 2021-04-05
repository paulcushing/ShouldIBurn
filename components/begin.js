import React from 'react'

export const Begin = (props) => {
    const saveUserLocation = () => {
        props.setHaveUserLoc(true)
    }
    return (
        <div className="container max-w-lg px-4 py-24 mx-auto text-left md:max-w-none text-center">
            <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center sm:leading-none md:text-6xl lg:text-7xl">
                <span className="inline md:block">Should I Burn?</span>
            </h1>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                <button
                    onClick={() => props.setPermissionGranted(true)}
                    className="text-3xl font-extrabold leading-10 tracking-tight text-white rounded-full bg-indigo-600 p-6 text-center"
                >
                    Locate Me
                </button>
            </div>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                <p>Or choose your location by city name or zip code.</p>
            </div>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                <input
                    id="location"
                    className="p-6 border-solid border-2 border-indigo-600"
                    type="text"
                    value={props.userLocation}
                    onChange={(e) => props.setUserLocation(e.target.value)}
                    placeholder="City or Zip Code"
                />
                <button
                    onClick={() => saveUserLocation()}
                    className="text-2xl leading-10 tracking-tight text-white rounded-full bg-indigo-600 px-3 m-2 text-center"
                >
                    Go
                </button>
            </div>
        </div>
    )
}

export default Begin
