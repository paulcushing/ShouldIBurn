"use client";

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'

export const GetCoordinatesByGeo = (props) => {
    const [done, setDone] = useState(false)

    // Only run the geolocation code on the client side
    const isBrowser = typeof window !== 'undefined'

    const options = {
        enableHighAccuracy: false,
        timeout: 1000 * 60 * .5, // 1/2 a minute
        maximumAge: 1000 * 3600 * 12, // 12 hour
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
        // Only execute this effect on the client side
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

// Add this to ensure the component is only imported on the client side
export default dynamic(() => Promise.resolve(GetCoordinatesByGeo), {
    ssr: false
})
