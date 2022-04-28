// Gets weather and air quality data by coordinates
async function getConditions(coordinates) {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? 'https://shouldiburn.com/api'
            : 'http://localhost:3000/api'

    const [weatherResponse] = await Promise.all([
        fetch(apiUrl + '/conditions', {
            method: 'post',
            body: JSON.stringify(coordinates),
            headers: {
                'Content-type': 'application/json',
                'Cache-Control': 'no-store, max-age=0',
            },
        })
            .then((data) => {
                return data.json()
            })
            .catch((error) => {
                return error
            }),
    ])

    const weather = await weatherResponse

    return weather
}

export default getConditions
