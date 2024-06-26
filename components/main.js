import React from 'react'

export const Main = (props) => {
    const { conditions } = props

    const weather = conditions.weather
    const locationName = weather.name

    const air = conditions.air[0]

    const windSpeed = weather.wind.speed
    const windGusts = weather.wind.gust
    const airQualityScore = air.AQI
    const aqiAcceptable = airQualityScore < 60
    const windAcceptable = windSpeed < 10
    const gustWarning = windGusts > 12

    return (
        <div className="container max-w-lg px-4 py-8 mx-auto md:max-w-none text-center">
            <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none md:text-5xl lg:text-6xl">
                <span className="inline">In</span>{' '}
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-amber-600 to-fire-500">
                    {locationName}
                </span>
                <span className="inline">?</span>
            </h1>

            <div>
                <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                    <h2 className="text-5xl font-extrabold leading-10 tracking-tight text-gray-900 text-center mt-36 mb-36">
                        {windAcceptable && aqiAcceptable ? (
                            <span className="text-4xl font-extrabold text-white rounded-full bg-gradient-to-b from-amber-300 to-fire-600 p-20">
                                Yes
                            </span>
                        ) : (
                            <span className="text-4xl font-extrabold text-white rounded-full bg-gradient-to-b from-gray-400 to-gray-600 p-20">
                                No
                            </span>
                        )}
                    </h2>
                    <div className="mt-8">
                        <p className="text-xl font-bold text-gray-500">
                            Current Wind Speed:{' '}
                            <span
                                className={
                                    windAcceptable
                                        ? 'text-amber-600'
                                        : 'text-fire-500'
                                }
                            >
                                {windSpeed}{' '}
                                <span className="text-sm text-gray-300">
                                    MPH
                                </span>
                            </span>
                        </p>
                        <p className="text-xl font-bold text-gray-500">
                            Current Air Quality:{' '}
                            <span
                                className={
                                    aqiAcceptable
                                        ? 'text-amber-600'
                                        : 'text-fire-500'
                                }
                            >
                                {airQualityScore}{' '}
                                <span className="text-sm text-gray-300">
                                    AQI
                                </span>
                            </span>
                        </p>
                    </div>
                    {gustWarning && aqiAcceptable ? (
                        <div className="mt-8 border-dashed border-2 border-red-400 rounded-md p-4 bg-fire-100">
                            <p className="text-md text-gray-800">
                                <span className="text-3xl">*</span> Wind gusts
                                may still exceed 10 MPH. You are responsible to
                                monitor the wind speeds when you burn and
                                exercise due caution.
                            </p>
                        </div>
                    ) : null}
                </div>
                <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                    <button
                        onClick={() => props.resetLocation()}
                        className="text-xl font-extrabold leading-10 tracking-tight text-white rounded-full bg-gradient-to-b from-fire-400 to-fire-500 hover:from-fire-500 hover:to-fire-600 px-8 text-center"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Main
