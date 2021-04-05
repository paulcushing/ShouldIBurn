import Head from 'next/head'
import { useState, Fragment, useEffect } from 'react'
import Cookies from 'js-cookie'

import Begin from '../components/begin'
import Footer from '../components/footer'
import GetGeoLocation from '../components/getGeoLocation'
import Header from '../components/header'
import Main from '../components/main'

// Gets Coordinates based on zipcode or city from our API
async function fetchCoords(userLocation) {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://shouldiburn.com/api'
            : 'http://localhost:3000/api'

    let isZip = /^\d+$/.test(userLocation)
    let loc

    if (isZip) {
        loc = {
            zipcode: userLocation,
        }
    } else {
        loc = {
            city: userLocation,
        }
    }

    const coordResponse = await fetch(apiUrl + '/getcoordinates', {
        method: 'post',
        body: JSON.stringify(loc),
        headers: { 'Content-type': 'application/json' },
    })

    const coordinates = await coordResponse.json()

    return coordinates
}

export default function IndexPage() {
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [haveUserLoc, setHaveUserLoc] = useState(false)
    const [userLocation, setUserLocation] = useState('')
    const [coord, setCoord] = useState()
    const [loading, setLoading] = useState(true)

    if (Cookies.get('lat') && Cookies.get('lon') && !coord) {
        setCoord({
            latitude: Cookies.get('lat'),
            longitude: Cookies.get('lon'),
        })
    }

    if (haveUserLoc && !coord) {
        console.log('Fetching Coordinates')
        fetchCoords(userLocation).then((data) => {
            const coords = {
                latitude: data.lat,
                longitude: data.lon,
            }
            setCoord(coords)
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
            <section className="w-full px-6 pb-12 antialiased bg-white">
                <div className="mx-auto max-w-7xl">
                    <Header />

                    {permissionGranted && !coord ? (
                        <GetGeoLocation setCoord={setCoord} />
                    ) : null}

                    {coord ? (
                        <Main
                            coord={coord}
                            setCoord={setCoord}
                            setPermissionGranted={setPermissionGranted}
                        />
                    ) : (
                        <Begin
                            setPermissionGranted={setPermissionGranted}
                            setHaveUserLoc={setHaveUserLoc}
                            userLocation={userLocation}
                            setUserLocation={setUserLocation}
                        />
                    )}

                    {/* {loading ? (
                        <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
                            <h2 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center">
                                Loading...
                            </h2>
                        </div>
                    ) : null} */}
                </div>
            </section>

            <Footer />
        </Fragment>
    )
}
