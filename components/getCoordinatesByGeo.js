import Cookies from 'js-cookie'
import useCurrentLocation from '../hooks/useCurrentLocation'

export const GetCoordinatesByGeo = (props) => {
    const geolocationOptions = {
        enableHighAccuracy: false,
        timeout: 1000 * 60 * 1, // 1 minute
        maximumAge: 1000 * 3600 * 12, // 12 hour
    }

    const coordinates = useCurrentLocation(geolocationOptions)

    if (coordinates != undefined) {
        Cookies.set('lat', coordinates.latitude)
        Cookies.set('lon', coordinates.longitude)
        props.setCoordinates(coordinates)
    }

    return null
}

export default GetCoordinatesByGeo
