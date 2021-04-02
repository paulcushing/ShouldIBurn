import Cookies from 'js-cookie'
import React, { useState } from 'react'

import useCurrentLocation from '../hooks/useCurrentLocation'

async function fetchWeatherAndAirQuality(coord) {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://shouldiburn.com/api'
            : 'http://localhost:3000/api'

    const [weatherResponse, airQualityResponse] = await Promise.all([
        fetch(apiUrl + '/weather', {
            method: 'post',
            body: JSON.stringify(coord),
            headers: { 'Content-type': 'application/json' },
        }),
        fetch(apiUrl + '/airquality', {
            method: 'post',
            body: JSON.stringify(coord),
            headers: { 'Content-type': 'application/json' },
        }),
    ])

    const weather = await weatherResponse.json()
    const airQuality = await airQualityResponse.json()

    return { ...weather, ...airQuality }
}

export const Main = () => {
    const [coord, setCoord] = useState({
        latitude: Cookies.get('lat') || 0,
        longitude: Cookies.get('lon') || 0,
    })
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingCoord, setLoadingCoord] = useState(true)
    const [data, setData] = useState({})

    const geolocationOptions = {
        enableHighAccuracy: false,
        timeout: 1000 * 60 * 1, // 1 minute
        maximumAge: 1000 * 3600 * 12, // 12 hour
    }

    const { coordinates, error } = useCurrentLocation(geolocationOptions)

    if (loadingCoord && coordinates != undefined && coordinates !== coord) {
        setCoord(coordinates)
        Cookies.set('lat', coordinates.latitude, { expires: 1 })
        Cookies.set('lon', coordinates.longitude, { expires: 1 })
        setLoadingCoord(false)
    }

    if (coord?.latitude && loading) {
        fetchWeatherAndAirQuality(coord)
            .then((data) => {
                setData(data)
                setLocation(data.name)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // If there's a location name - get the coord
    // const openWeatherGeo = `http://api.openweathermap.org/geo/1.0/zip?zip=${location}&appid=${key}`
    // const { data: geoData, error: geoError } = useSWR(location !== '' && loading ? openWeatherGeo : null, fetcher)
    //console.log(geoData)

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
    const aqiAcceptable = data && data.AQI ? data.AQI < 61 : false
    const windAcceptable = data && data.wind ? data.wind.speed < 11 : false

    return (
        <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none text-center">
            <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center sm:leading-none md:text-6xl lg:text-7xl">
                <span className="inline md:block">Should I Burn In</span>{' '}
                <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
                    {data.name ? data.name : location}
                </span>
            </h1>
            {location === '' && !loading ? (
                <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                    <h2 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center">
                        Enter your location
                    </h2>
                </div>
            ) : null}
            {location !== '' && !loading ? (
                <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                    <h2 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center mt-36 mb-36">
                        {windAcceptable && aqiAcceptable ? (
                            <span className="text-4xl font-extrabold text-white rounded-full bg-green-500 p-24">
                                Yes
                            </span>
                        ) : (
                            <span className="text-4xl font-extrabold text-white rounded-full bg-red-500 p-24">
                                No
                            </span>
                        )}
                    </h2>
                    <div className="mt-14">
                        <p className="text-3xl font-extrabold text-gray-500">
                            Today's Wind Speed:{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                                {data?.wind?.speed}
                            </span>
                        </p>
                        <p className="text-3xl font-extrabold text-gray-500">
                            Today's Air Quality:{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                                {data?.AQI}
                            </span>
                        </p>
                    </div>
                </div>
            ) : null}
            {loading ? (
                <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
                    <h2 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center">
                        Loading...
                    </h2>
                </div>
            ) : null}
        </div>
    )
}

export default Main
