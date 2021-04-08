import React, { useState } from 'react'

export const Main = (props) => {
    const data = props.conditions

    const aqiText = {
        1: {
            Low: 0,
            High: 50,
            Desc: 'Good',
            Color: 'green',
        },
        2: {
            Low: 51,
            High: 100,
            Desc: 'Fair',
            Color: 'yellow',
        },
        3: {
            Low: 101,
            High: 150,
            Desc: 'Unhealthy For Sensetive Groups',
            Color: 'orange',
        },
        4: {
            Low: 151,
            High: 200,
            Desc: 'Unhealthy',
            Color: 'red',
        },
        5: {
            Low: 201,
            High: 300,
            Desc: 'Very Unhealthy',
            Color: 'purple',
        },
        6: {
            Low: 301,
            High: 500,
            Desc: 'Hazardous',
            Color: 'maroon',
        },
    }
    const aqiAcceptable = data && data.AQI ? data.AQI < 60 : false
    const windAcceptable = data && data.wind ? data.wind.speed < 11 : false

    return (
        <div className="container max-w-lg px-4 py-8 mx-auto text-left md:max-w-none text-center">
            
            <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none md:text-5xl lg:text-6xl">
                <span className="inline">In</span>{' '}
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                    {data.name ? data.name : location}
                </span>
                <span className="inline">?</span>
            </h1>
          
                <div>
                    <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                        <h2 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center mt-36 mb-36">
                            {windAcceptable && aqiAcceptable ? (
                                <span className="text-4xl font-extrabold text-white rounded-full bg-green-500 p-20">
                                    Yes
                                </span>
                            ) : (
                                <span className="text-4xl font-extrabold text-white rounded-full bg-red-500 p-20">
                                    No
                                </span>
                            )}
                        </h2>
                        <div className="mt-8">
                            <p className="text-xl font-bold text-gray-500">
                                Today's Wind Speed:{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                                    {data?.wind?.speed} <span className="text-sm text-gray-300">MPH</span>
                                </span>
                            </p>
                            <p className="text-xl font-bold text-gray-500">
                                Today's Air Quality:{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                                    {data?.AQI} <span className="text-sm text-gray-300">AQI</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                        <button
                            onClick={() => props.resetLocation()}
                            className="text-xl font-extrabold leading-10 tracking-tight text-white rounded-full bg-indigo-600 px-8 text-center"
                        >
                            Reset
                        </button>
                    </div>
                </div>

        </div>
    )
}

export default Main
