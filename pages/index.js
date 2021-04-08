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
    const [haveUserLocation, setHaveUserLocation] = useState()
    const [userLocation, setUserLocation] = useState('')
    const [coordinates, setCoordinates] = useState()
    const [conditions, setConditions] = useState()
    const [error, setError] = useState()

    const resetLocation = () => {
        Cookies.remove('lat')
        Cookies.remove('lon')
        setCoordinates(null)
        setPermissionGranted(false)
        setHaveUserLocation(false)
        setUserLocation('')
        setConditions('')
    }

    // If cookies are set, skip "Begin"
    if (Cookies.get('lat') && Cookies.get('lon') && !coordinates) {
        setCoordinates({
            latitude: Cookies.get('lat'),
            longitude: Cookies.get('lon'),
        })
        setHaveUserLocation(true)
    }

    if (haveUserLocation && !coordinates) {
        getCoordinatesByCityZip(userLocation).then((data) => {
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
            if(!data.wind || !data.AQI) {
                setError("Failed to get conditions for that location.")
                resetLocation()
                return null
            }
            setConditions(data)
        })
    }

    return (
        <Fragment>
            <Head>
                <title>Should I Burn?</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5045e4"
                />
                <meta name="msapplication-TileColor" content="#5045e4" />
                <meta name="theme-color" content="#ffffff"></meta>
            </Head>
            {error ? (<ErrorBanner errorText={error} setError={setError} />) : null}
            <section className="w-full px-6 pb-12 antialiased bg-white">
                <div className="mx-auto max-w-7xl">
                    <Header />

                    {!haveUserLocation && !conditions && !permissionGranted ? (
                        <Begin
                        setPermissionGranted={setPermissionGranted}
                        userLocation={userLocation}
                        setHaveUserLocation={setHaveUserLocation}
                        setUserLocation={setUserLocation}
                    />
                    ) : null}

                    {(haveUserLocation && !conditions) || (permissionGranted && !conditions) ? (
                        <Loader />
                    ) : null}

                    {permissionGranted && !coordinates ? (
                        <GetCoordinatesByGeo setCoordinates={setCoordinates} />
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
