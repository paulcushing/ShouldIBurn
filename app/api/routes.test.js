import * as Sentry from '@sentry/nextjs'
import { POST as conditionsPost } from './conditions/route'
import { POST as getCoordinatesPost } from './getcoordinates/route'
import { POST as airQualityPost } from './airquality/route'
import { POST as weatherPost } from './weather/route'
import { POST as weatherOnlyPost } from './_weather/route'

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}))

function jsonRequest(body) {
  return new Request('http://localhost', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('API routes', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('/api/conditions', () => {
    it('returns 400 when coordinates are missing', async () => {
      const response = await conditionsPost(jsonRequest({}))
      expect(response.status).toBe(400)
    })

    it('returns merged weather and air data when both services succeed', async () => {
      const fetchMock = vi.spyOn(global, 'fetch')
      fetchMock
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue({ wind: { speed: 5 }, name: 'Boise' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue([{ AQI: 42 }]),
        })

      const response = await conditionsPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.weather).toEqual({ wind: { speed: 5 }, name: 'Boise' })
      expect(data.air).toEqual([{ AQI: 42 }])
      expect(data.degraded).toBe(false)
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })

    it('returns degraded mode when air service fails but weather succeeds', async () => {
      const fetchMock = vi.spyOn(global, 'fetch')
      fetchMock
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue({ wind: { speed: 5 }, name: 'Boise' }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: vi.fn().mockResolvedValue({}),
        })

      const response = await conditionsPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.degraded).toBe(true)
      expect(data.warning).toMatch(/Air quality data is currently unavailable/i)
      expect(Sentry.captureException).toHaveBeenCalled()
    })

    it('returns 502 when weather service fails', async () => {
      const fetchMock = vi.spyOn(global, 'fetch')
      fetchMock
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          json: vi.fn().mockResolvedValue({}),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue([{ AQI: 10 }]),
        })

      const response = await conditionsPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      expect(response.status).toBe(502)
    })
  })

  describe('/api/getcoordinates', () => {
    it('returns 400 with missing params', async () => {
      const response = await getCoordinatesPost(jsonRequest({}))
      expect(response.status).toBe(400)
    })

    it('calls zip endpoint and returns payload', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ lat: 43.5, lon: -116.5 }),
      })

      const response = await getCoordinatesPost(jsonRequest({ zipcode: '83709' }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({ lat: 43.5, lon: -116.5 })
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/geo/1.0/zip?zip=83709'))
    })

    it('returns 502 on upstream error', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({}),
      })

      const response = await getCoordinatesPost(jsonRequest({ city: 'Boise,ID' }))
      expect(response.status).toBe(502)
    })
  })

  describe('/api/airquality', () => {
    it('returns 400 when coordinates are missing', async () => {
      const response = await airQualityPost(jsonRequest({}))
      expect(response.status).toBe(400)
    })

    it('returns first AQI record on success', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([{ AQI: 55 }, { AQI: 56 }]),
      })

      const response = await airQualityPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({ AQI: 55 })
    })

    it('returns 502 when upstream payload is unexpected', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      })

      const response = await airQualityPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      expect(response.status).toBe(502)
    })
  })

  describe('/api/weather', () => {
    it('returns 400 when coordinates are missing', async () => {
      const response = await weatherPost(jsonRequest({}))
      expect(response.status).toBe(400)
    })

    it('returns weather and air data on success', async () => {
      const fetchMock = vi.spyOn(global, 'fetch')
      fetchMock
        .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue({ wind: { speed: 4 } }) })
        .mockResolvedValueOnce({ json: vi.fn().mockResolvedValue({ list: [{ main: { aqi: 2 } }] }) })

      const response = await weatherPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.weather).toEqual({ wind: { speed: 4 } })
      expect(data.air).toEqual({ list: [{ main: { aqi: 2 } }] })
    })
  })

  describe('/api/_weather', () => {
    it('returns 400 when coordinates are missing', async () => {
      const response = await weatherOnlyPost(jsonRequest({}))
      expect(response.status).toBe(400)
    })

    it('returns weather payload on success', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ name: 'Boise' }),
      })

      const response = await weatherOnlyPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({ name: 'Boise' })
    })

    it('returns 502 on upstream error', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({}),
      })

      const response = await weatherOnlyPost(jsonRequest({ latitude: 43.5, longitude: -116.5 }))
      expect(response.status).toBe(502)
    })
  })
})
