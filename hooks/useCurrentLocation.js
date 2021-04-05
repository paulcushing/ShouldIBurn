import { useState, useEffect } from 'react'

const useCurrentLocation = (options = {}) => {
    const [done, setDone] = useState()
    const [error, setError] = useState()
    const [coordinates, setCoordinates] = useState()

    // Success handler for geolocation's `getCurrentPosition` method
    const handleSuccess = (position) => {
        const { latitude, longitude } = position.coords

        setCoordinates({
            latitude: latitude,
            longitude: longitude,
        })
    }

    // Error handler for geolocation's `getCurrentPosition` method
    const handleError = (error) => {
        setError(error.message)
    }

    useEffect(() => {
        if (!done) {
            if (!navigator.geolocation) {
                setError('Geolocation is not supported.')
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

    return coordinates
}

export default useCurrentLocation
