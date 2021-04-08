// Gets Coordinates based on zipcode or city from our API
async function getCoordinatesByCityZip(userLocation) {
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

export default getCoordinatesByCityZip
