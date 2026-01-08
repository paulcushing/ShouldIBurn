"use client";

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const GetCoordinatesByGeo = (props) => {
    const [done, setDone] = useState(false)

    const isBrowser = typeof window !== 'undefined'

    const options = {
        enableHighAccuracy: false,
        timeout: 1000 * 60 * .5,
        maximumAge: 1000 * 3600 * 12,
    }

    const handleSuccess = (position) => {
        const { latitude, longitude } = position.coords

        Cookies.set('lat', latitude)
        Cookies.set('lon', longitude)

        props.setCoordinates({
            latitude: latitude,
            longitude: longitude,
        })
    }

    const handleError = (error) => {
        props.setError("Geolocation: " + error.message)
    }

    useEffect(() => {
        if (!done && isBrowser) {
            if (!navigator.geolocation) {
                props.setError('Geolocation is not supported.')
                return
            }
            navigator.geolocation.getCurrentPosition(
                handleSuccess,
                handleError,
                options
            )
            setDone(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [done, isBrowser])

    return null
}

export default GetCoordinatesByGeo
