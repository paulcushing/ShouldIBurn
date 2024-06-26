import React from 'react'

export const Begin = (props) => {
    const saveuserCityZip = () => {
        props.sethaveUserCityZip(true)
    }
    return (
        <div className="container max-w-lg px-4 py-8 mx-auto md:max-w-none text-center">
            <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none md:text-6xl lg:text-7xl">
                <span className="inline md:block">Should I Burn?</span>
            </h1>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                <p>Check the conditions to see if you should burn weeds or have a fire on your property.</p>
            </div>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                <button
                    onClick={() => props.setPermissionGranted(true)}
                    className="text-3xl font-extrabold leading-10 tracking-tight text-white rounded-full bg-gradient-to-b from-fire-400 to-fire-500 px-6 py-2 text-center hover:from-fire-500 hover:to-fire-600"
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
                    className="p-6 border-solid border-2 rounded-md border-fire-600 focus-visible:border-fire-500 hover:border-fire-500"
                    type="text"
                    value={props.userCityZip}
                    onChange={(e) => props.setUserCityZip(e.target.value)}
                    placeholder="City or Zip Code"
                />
                <button
                    onClick={() => saveuserCityZip()}
                    className="text-xl leading-10 tracking-tight text-white rounded-full bg-gradient-to-b from-fire-400 to-fire-500 hover:from-fire-500 hover:to-fire-600 px-4 m-2 text-center"
                >
                    Go
                </button>
            </div>
        </div>
    )
}

export default Begin
