import { render, waitFor } from '@testing-library/react'
import Cookies from 'js-cookie'
import GetCoordinatesByGeo from './getCoordinatesByGeo'

vi.mock('js-cookie', () => ({
  default: {
    set: vi.fn(),
  },
}))

describe('GetCoordinatesByGeo', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('sets coordinates and cookies on geolocation success', async () => {
    const setCoordinates = vi.fn()
    const setError = vi.fn()

    const getCurrentPosition = vi.fn((success) => {
      success({ coords: { latitude: 43.5, longitude: -116.5 } })
    })

    Object.defineProperty(global, 'navigator', {
      value: { geolocation: { getCurrentPosition } },
      configurable: true,
    })

    render(<GetCoordinatesByGeo setCoordinates={setCoordinates} setError={setError} />)

    await waitFor(() => {
      expect(setCoordinates).toHaveBeenCalledWith({ latitude: 43.5, longitude: -116.5 })
    })
    expect(Cookies.set).toHaveBeenCalledWith('lat', 43.5)
    expect(Cookies.set).toHaveBeenCalledWith('lon', -116.5)
    expect(setError).not.toHaveBeenCalled()
  })

  it('calls setError on geolocation failure', async () => {
    const setCoordinates = vi.fn()
    const setError = vi.fn()

    const getCurrentPosition = vi.fn((_, error) => {
      error({ message: 'Permission denied' })
    })

    Object.defineProperty(global, 'navigator', {
      value: { geolocation: { getCurrentPosition } },
      configurable: true,
    })

    render(<GetCoordinatesByGeo setCoordinates={setCoordinates} setError={setError} />)

    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith('Geolocation: Permission denied')
    })
  })

  it('handles browser without geolocation support', async () => {
    const setCoordinates = vi.fn()
    const setError = vi.fn()

    Object.defineProperty(global, 'navigator', {
      value: {},
      configurable: true,
    })

    render(<GetCoordinatesByGeo setCoordinates={setCoordinates} setError={setError} />)

    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith('Geolocation is not supported.')
    })
  })
})
