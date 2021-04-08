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
        const locationTextArray = userLocation.split(',')
       
        const queryUserLocation = locationTextArray[1] ? locationTextArray[0] + ',' + locationTextArray[1].replace(/\s/g, '') : userLocation 
        loc = {
            city: queryUserLocation,
        }
    }

    const coordResponse = await fetch(apiUrl + '/getcoordinates', {
        method: 'post',
        body: JSON.stringify(loc),
        headers: { 'Content-type': 'application/json' },
    })

    const coordinates = await coordResponse.json()

    return Array.isArray(coordinates) ? coordinates[0] : coordinates
}

export default getCoordinatesByCityZip
