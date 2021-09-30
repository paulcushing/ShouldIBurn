import React from 'react'

function getCategoryForComponent(value, ranges) {
  for (const [key, range] of Object.entries(ranges)) {
    if (value >= range.min && value <= range.max) {
      return key
    }
  }
  return -1;
}

export const Main = (props) => {
    const data = props.conditions

    const weather = data.weather
    const locationName = weather.name
    
    const air = data.air.list[0]
    const components = air.components

    console.log(components)
    
    const contaminantRanges = {
        index: {
            1: {
                min: 0,
                max: 50,
            },
            2: {
                min: 51,
                max: 100,
            },
            3: {
                min: 101,
                max: 150,
            },
            4: {
                min: 151,
                max: 200,
            },
            5: {
                min: 201,
                max: 300,
            },
            6: {
                min: 301,
                max: 500,
            }
        },
        o3: {
            1: {
                min: 0,
                max: .054,
            },
            2: {
                min: .055,
                max: .070,
            },
            3: {
                min: .071,
                max: .085,
            },
            4: {
                min: .085,
                max: .105,
            },
            5: {
                min: .106,
                max: .200,
            },
            6: {
                min: .200,
                max: .500,
            }
        },
        pm2_5: {
            1: {
                min: 0,
                max: 12,
            },
            2: {
                min: 12.1,
                max: 35.4,
            },
            3: {
                min: 35.5,
                max: 55.4,
            },
            4: {
                min: 55.5,
                max: 150.4,
            },
            5: {
                min: 150.5,
                max: 250.4,
            },
            6: {
                min: 250.5,
                max: 500.4,
            }
        },
        pm10: {
            1: {
                min: 0,
                max: 54,
            },
            2: {
                min: 55,
                max: 154,
            },
            3: {
                min: 155,
                max: 254,
            },
            4: {
                min: 255,
                max: 354,
            },
            5: {
                min: 355,
                max: 424,
            },
            6: {
                min: 425,
                max: 604,
            }
        },
        co: {
            1: {
                min: 0,
                max: 4.4,
            },
            2: {
                min: 4.5,
                max: 9.4,
            },
            3: {
                min: 9.5,
                max: 12.4,
            },
            4: {
                min: 12.5,
                max: 15.4,
            },
            5: {
                min: 15.5,
                max: 30.4,
            },
            6: {
                min: 30.5,
                max: 50.4,
            }
        },
        so2: {
            1: {
                min: 0,
                max: 35,
            },
            2: {
                min: 36,
                max: 75,
            },
            3: {
                min: 76,
                max: 185,
            },
            4: {
                min: 186,
                max: 304,
            },
            5: {
                min: 305,
                max: 604,
            },
            6: {
                min: 605,
                max: 1004,
            }
        },
        no2: {
            1: {
                min: 0,
                max: 53,
            },
            2: {
                min: 54,
                max: 100,
            },
            3: {
                min: 101,
                max: 360,
            },
            4: {
                min: 361,
                max: 649,
            },
            5: {
                min: 650,
                max: 1249,
            },
            6: {
                min: 1250,
                max: 2049,
            }
        }
    }

    const airComponents = {
        pm10: {
            value: components.pm10.toFixed(),
            category: getCategoryForComponent(components.pm10.toFixed(), contaminantRanges.pm10),
            b_hi: '',
            b_lo: '',
            i_hi: '',
            i_lo: '',
        },
        pm2_5: {
            value: components.pm2_5.toFixed(1),
            category: getCategoryForComponent(components.pm2_5.toFixed(1), contaminantRanges.pm2_5),
            b_hi: '',
            b_lo: '',
            i_hi: '',
            i_lo: '',
        },
        o3: {
            value: components.o3.toFixed(3),
            category: getCategoryForComponent(components.o3.toFixed(3), contaminantRanges.o3),
            b_hi: '',
            b_lo: '',
            i_hi: '',
            i_lo: '',
        },
        co: {
            value: components.co.toFixed(1),
            category: getCategoryForComponent(components.co.toFixed(1), contaminantRanges.co),
            b_hi: '',
            b_lo: '',
            i_hi: '',
            i_lo: '',
        },
        no2: {
            value: components.no2.toFixed(),
            category: getCategoryForComponent(components.no2.toFixed(), contaminantRanges.no2),
            b_hi: '',
            b_lo: '',
            i_hi: '',
            i_lo: '',
        },
        so2: {
            value: components.so2.toFixed(),
            category: getCategoryForComponent(components.so2.toFixed(), contaminantRanges.so2),
            b_hi: '',
            b_lo: '',
            i_hi: '',
            i_lo: '',
        }
    }

    // for (let key in airComponents) {
    //     const comp_Index = ( i_hi - i_lo ) / ( bp_hi - bp_lo ) * ( component - bp_lo ) + aqi_lo;
    // }

    const aqiText = {
        1: {
            Low: 0,
            High: 50,
            Desc: 'Good',
            Color: 'green',
        },
        2: {
            Low: 51,
            High: 100,
            Desc: 'Fair',
            Color: 'yellow',
        },
        3: {
            Low: 101,
            High: 150,
            Desc: 'Unhealthy For Sensetive Groups',
            Color: 'orange',
        },
        4: {
            Low: 151,
            High: 200,
            Desc: 'Unhealthy',
            Color: 'red',
        },
        5: {
            Low: 201,
            High: 300,
            Desc: 'Very Unhealthy',
            Color: 'purple',
        },
        6: {
            Low: 301,
            High: 500,
            Desc: 'Hazardous',
            Color: 'maroon',
        },
    }

    console.log(airComponents);

    const windSpeed = weather.wind.speed
    const windGusts = weather.wind.gust
    const airQualityScore = air.main.aqi

    const aqiAcceptable = airQualityScore < 3
    const windAcceptable = windSpeed < 10
    const gustWarning = windGusts > 12
    
    return (
        <div className="container max-w-lg px-4 py-8 mx-auto text-left md:max-w-none text-center">
            
            <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none md:text-5xl lg:text-6xl">
                <span className="inline">In</span>{' '}
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500">
                    {locationName}
                </span>
                <span className="inline">?</span>
            </h1>
          
                <div>
                    <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                        <h2 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center mt-36 mb-36">
                            {windAcceptable && aqiAcceptable ? (
                                <span className="text-4xl font-extrabold text-white rounded-full bg-green-500 p-20">
                                    Yes
                                </span>
                            ) : (
                                <span className="text-4xl font-extrabold text-white rounded-full bg-red-500 p-20">
                                    No
                                </span>
                            )}
                        </h2>
                        <div className="mt-8">
                            <p className="text-xl font-bold text-gray-500">
                                Current Wind Speed:{' '}
                                <span className={windAcceptable ? "text-indigo-600" : "text-red-500"}>
                                    {windSpeed} <span className="text-sm text-gray-300">MPH</span>
                                </span>
                            </p>
                            <p className="text-xl font-bold text-gray-500">
                                Current Air Quality:{' '}
                                <span className={aqiAcceptable ? "text-indigo-600" : "text-red-500"}>
                                    {airQualityScore} <span className="text-sm text-gray-300">AQI</span>
                                </span>
                            </p>
                        </div>
                        {gustWarning && aqiAcceptable ? (
                            <div className="mt-8 border-dashed border-2 border-red-400 rounded-md p-4 bg-red-100">
                            <p className="text-md text-gray-800">
                                <span className="text-3xl">*</span> Wind gusts may still exceed 10 MPH. You are responsible to monitor the wind speeds when you burn and exercise due caution.
                            </p>
                        </div>
                        ) : null}
                        
                    </div>
                    <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg text-center lg:text-lg">
                        <button
                            onClick={() => props.resetLocation()}
                            className="text-xl font-extrabold leading-10 tracking-tight text-white rounded-full bg-indigo-600 px-8 text-center"
                        >
                            Reset
                        </button>
                    </div>
                </div>

        </div>
    )
}

export default Main
