import Cookies from 'js-cookie'
import React, { useState } from 'react'
import useSWR from 'swr'

import useCurrentLocation from '../hooks/useCurrentLocation'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const Main = () => {
    const [coord, setCoord] = useState({
        latitude: 0,
        longitude: 0,
    })
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingCoord, setLoadingCoord] = useState(true)
    const [data, setData] = useState({})
    const now = new Date()
    const year = now.getFullYear()
    const month = ('0' + (now.getMonth() + 1)).slice(-2)
    const date = ('0' + now.getDate()).slice(-2)
    const todayDate = year + '-' + month + '-' + date

    const geolocationOptions = {
        enableHighAccuracy: false,
        timeout: 1000 * 60 * 1, // 1 minute
        maximumAge: 1000 * 3600 * 12, // 12 hour
    }

    const { coordinates, error } = useCurrentLocation(geolocationOptions)

    if (Cookies.get('lat') && Cookies.get('lon') && loadingCoord) {
        setCoord({
            latitude: Cookies.get('lat'),
            longitude: Cookies.get('lon'),
        })
        setLoadingCoord(false)
    } else if (
        loadingCoord &&
        coordinates != undefined &&
        coordinates !== coord
    ) {
        setCoord(coordinates)
        Cookies.set('lat', coordinates.latitude, { expires: 1 })
        Cookies.set('lon', coordinates.longitude, { expires: 1 })
        setLoadingCoord(false)
    }

    const owkey = process.env.NEXT_PUBLIC_OW_API_KEY
    const ankey = process.env.NEXT_PUBLIC_AN_API_KEY

    // If there's a location name - get the coord
    // const openWeatherGeo = `http://api.openweathermap.org/geo/1.0/zip?zip=${location}&appid=${key}`
    // const { data: geoData, error: geoError } = useSWR(location !== '' && loading ? openWeatherGeo : null, fetcher)
    //console.log(geoData)

    // If there's a coord - get the data

    const openWeatherApi = coord?.latitude
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitude}&lon=${coord.longitude}&appid=${owkey}`
        : null
    const { data: conditionsData, error: conditionsError } = useSWR(
        coord?.latitude && loading ? openWeatherApi : null,
        fetcher
    )

    const airNowApi = coord?.latitude
        ? `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${coord.latitude}&longitude=${coord.longitude}&date=${todayDate}&distance=25&API_KEY=${ankey}`
        : null
    const { data: aqiData, error: aqiError } = useSWR(
        coord?.latitude && loading ? airNowApi : null,
        fetcher
    )

    if (conditionsError || aqiError) console.log('API Error')
    if (conditionsData && aqiData && loading) {
        console.log(aqiData)
        setLoading(false)
        setData({ ...conditionsData, ...aqiData[0] })
        setLocation(conditionsData.name)
    }

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
                                {data.wind.speed}
                            </span>
                        </p>
                        <p className="text-3xl font-extrabold text-gray-500">
                            Today's Air Quality:{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                                {data.AQI}
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
