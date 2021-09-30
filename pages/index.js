import Head from 'next/head'
import { useState, Fragment } from 'react'
import Cookies from 'js-cookie'

import Begin from '../components/begin'
import ErrorBanner from '../components/errorBanner'
import Footer from '../components/footer'
import getConditions from '../components/getConditions'
import getCoordinatesByCityZip from '../components/getCoordinatesByCityZip'
import GetCoordinatesByGeo from '../components/getCoordinatesByGeo'
import Header from '../components/header'
import Loader from '../components/loader'
import Main from '../components/main'


export default function IndexPage() {
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [haveUserCityZip, sethaveUserCityZip] = useState()
    const [userCityZip, setUserCityZip] = useState('')
    const [coordinates, setCoordinates] = useState()
    const [conditions, setConditions] = useState()
    const [error, setError] = useState()

    const resetLocation = () => {
        Cookies.remove('lat')
        Cookies.remove('lon')
        setCoordinates(null)
        setPermissionGranted(false)
        sethaveUserCityZip(false)
        setUserCityZip('')
        setConditions('')
    }

    const clearError = () => {
        resetLocation()
        setError(null)
    }

    // If cookies are set, skip "Begin"
    if (Cookies.get('lat') && Cookies.get('lon') && !coordinates) {
        setCoordinates({
            latitude: Cookies.get('lat'),
            longitude: Cookies.get('lon'),
        })
        sethaveUserCityZip(true)
    }

    if (haveUserCityZip && !coordinates) {
        getCoordinatesByCityZip(userCityZip).then((data) => {
            if(!data || !data.lat || !data.lon) {
                setError("Location not found.")
                resetLocation()
                return null
            }
            const coords = {
                latitude: data.lat,
                longitude: data.lon,
            }
            setCoordinates(coords)
            Cookies.set('lat', data.lat, {
                secure: process.env.NODE_ENV === 'production' ? true : false,
            })
            Cookies.set('lon', data.lon, {
                secure: process.env.NODE_ENV === 'production' ? true : false,
            })
        })
    }

    if (coordinates && !conditions) {
        getConditions(coordinates).then((data) => {
            //console.log(data);
            if(!data.weather.wind || !data.air.list[0].main.aqi) {
                setError("Failed to get conditions for that location.")
                resetLocation()
                return null
            }
            setConditions(data)
        })
    }

    // console.log("permissionGranted: ", permissionGranted)
    // console.log("haveUserCityZip: ", haveUserCityZip)
    // console.log("userCityZip: ", userCityZip)
    // console.log("coordinates: ", coordinates)
    // console.log("conditions: ", conditions)
    // console.log("error: ", error)

    return (
        <Fragment>
            <Head>
                <title>Should I Burn? | ShouldIBurn.com</title>
                <meta name="description" content="Find out if the conditions are right to burn weeds or have a fire on your property." />
            </Head>
            {error ? (<ErrorBanner errorText={error} clearError={clearError} />) : null}
            <section className="w-full px-6 pb-12 antialiased bg-white">
                <div className="mx-auto max-w-7xl">
                    <Header />

                    {!haveUserCityZip && !conditions && !permissionGranted ? (
                        <Begin
                        setPermissionGranted={setPermissionGranted}
                        userCityZip={userCityZip}
                        sethaveUserCityZip={sethaveUserCityZip}
                        setUserCityZip={setUserCityZip}
                    />
                    ) : null}

                    {haveUserCityZip && !conditions || coordinates && !conditions ? (
                        <Loader />
                    ) : null}

                    {permissionGranted && !coordinates ? (
                        <Fragment>
                        <Loader />
                        <GetCoordinatesByGeo setCoordinates={setCoordinates} setError={setError} />
                        </Fragment>
                    ) : null}

                    {conditions ? (
                        <Main
                            conditions={conditions}
                            resetLocation={resetLocation}
                        />
                    ) : null}

                </div>
            </section>

            <Footer />
        </Fragment>
    )
}
