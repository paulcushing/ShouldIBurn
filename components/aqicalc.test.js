import AQI from './aqicalc'

const concentrations = {
  co: 2,
  no2: 40,
  o3: 80,
  pm10: 45,
  pm2_5: 10,
  so2: 20,
}

describe('AQI calculator', () => {
  it('converts fahrenheit to centigrade', () => {
    const aqi = new AQI(concentrations, 68)
    expect(aqi.tempInCentigrade()).toBeCloseTo(20, 5)
  })

  it('returns AQI category boundaries', () => {
    const aqi = new AQI(concentrations, 68)
    expect(aqi.getAQICategory(50)).toBe('Good')
    expect(aqi.getAQICategory(100)).toBe('Moderate')
    expect(aqi.getAQICategory(150)).toBe('Unhealthy for Sensitive Groups')
    expect(aqi.getAQICategory(200)).toBe('Unhealthy')
    expect(aqi.getAQICategory(300)).toBe('Very Unhealthy')
    expect(aqi.getAQICategory(350)).toBe('Hazardous')
    expect(aqi.getAQICategory(501)).toBe('Out of Range')
  })

  it('calculates per-pollutant AQI values', () => {
    const aqi = new AQI(concentrations, 68)
    expect(aqi.getPM25()).toBeTypeOf('number')
    expect(aqi.getPM10()).toBeTypeOf('number')
    expect(aqi.getSO2()).toBeTypeOf('number')
    expect(aqi.getNO2()).toBeTypeOf('number')
    expect(aqi.getCO()).toBeTypeOf('number')
  })

  it('returns out of range for invalid pollutant concentrations', () => {
    const aqi = new AQI(concentrations, 68)
    expect(aqi.AQIPM25(9000)).toBe('Out of Range')
    expect(aqi.AQIPM10(9000)).toBe('Out of Range')
    expect(aqi.AQICO(9000)).toBe('Out of Range')
    expect(aqi.AQINO2(9000)).toBe('Out of Range')
  })

  it('returns max AQI from all pollutant AQI values', () => {
    const aqi = new AQI(
      {
        co: 3,
        no2: 25,
        o3: 80,
        pm10: 200,
        pm2_5: 40,
        so2: 10,
      },
      68
    )

    const expectedMax = Math.max(aqi.getCO(), aqi.getNO2(), aqi.getO3(), aqi.getPM10(), aqi.getPM25(), aqi.getSO2())
    expect(aqi.getAQI()).toBe(expectedMax)
  })
})
