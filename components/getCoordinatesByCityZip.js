// Gets Coordinates based on zipcode or city from our API
async function getCoordinatesByCityZip(userCityZip) {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://shouldiburn.com/api'
            : 'http://localhost:3000/api'

    let isZip = /^\d+$/.test(userCityZip)
    let loc

    if (isZip) {
        loc = {
            zipcode: userCityZip,
        }
    } else {
        const locationTextArray = userCityZip.split(',')
       
        const queryuserCityZip = locationTextArray[1] ? locationTextArray[0] + ',' + locationTextArray[1].replace(/\s/g, '') : userCityZip 
        loc = {
            city: queryuserCityZip,
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
