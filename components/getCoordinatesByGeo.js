import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const GetCoordinatesByGeo = (props) => {
    const [done, setDone] = useState()

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
        console.log(error.message)
        props.setError("Geolocation: " + error.message)
    }

    useEffect(() => {
        if (!done) {
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
    }, [options])

    return null
}

export default GetCoordinatesByGeo
