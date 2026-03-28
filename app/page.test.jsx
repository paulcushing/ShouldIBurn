import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from './page'
import Cookies from 'js-cookie'
import getConditions from '../components/getConditions'
import getCoordinatesByCityZip from '../components/getCoordinatesByCityZip'

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}))

vi.mock('../components/getConditions', () => ({
  default: vi.fn(),
}))

vi.mock('../components/getCoordinatesByCityZip', () => ({
  default: vi.fn(),
}))

vi.mock('../components/useInterval', () => ({
  useInterval: vi.fn(),
}))

vi.mock('next/dynamic', () => ({
  default: () => {
    return function MockGeo(props) {
      return (
        <button
          onClick={() =>
            props.setCoordinates({ latitude: 43.5, longitude: -116.5 })
          }
        >
          Geo Success
        </button>
      )
    }
  },
}))

vi.mock('../components/header', () => ({
  default: () => <div>Header</div>,
}))

vi.mock('../components/footer', () => ({
  default: () => <div>Footer</div>,
}))

vi.mock('../components/loader', () => ({
  default: () => <div>Loading</div>,
}))

vi.mock('../components/begin', () => ({
  default: ({ setPermissionGranted, sethaveUserCityZip, setUserCityZip }) => (
    <div>
      <button onClick={() => setPermissionGranted(true)}>Locate Me</button>
      <button
        onClick={() => {
          setUserCityZip('Boise, ID')
          sethaveUserCityZip(true)
        }}
      >
        Use Manual Location
      </button>
    </div>
  ),
}))

vi.mock('../components/main', () => ({
  default: ({ resetLocation }) => (
    <div>
      <div>Main Ready</div>
      <button onClick={resetLocation}>Reset</button>
    </div>
  ),
}))

vi.mock('../components/errorBanner', () => ({
  default: ({ errorText, clearError }) => (
    <div>
      <span>{errorText}</span>
      <button onClick={clearError}>Clear Error</button>
    </div>
  ),
}))

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Cookies.get.mockReturnValue(undefined)
    getConditions.mockResolvedValue({
      weather: { name: 'Boise', wind: { speed: 5, gust: 8 } },
      air: [{ AQI: 45 }],
      degraded: false,
      warning: null,
    })
  })

  it('renders begin state when no saved cookies', () => {
    render(<HomePage />)
    expect(screen.getByRole('button', { name: 'Locate Me' })).toBeInTheDocument()
  })

  it('supports manual location flow to conditions', async () => {
    const user = userEvent.setup()
    getCoordinatesByCityZip.mockResolvedValue({ lat: 43.61, lon: -116.2 })

    render(<HomePage />)
    await user.click(screen.getByRole('button', { name: 'Use Manual Location' }))

    await waitFor(() => {
      expect(getCoordinatesByCityZip).toHaveBeenCalledWith('Boise, ID')
      expect(getConditions).toHaveBeenCalledWith({
        latitude: 43.61,
        longitude: -116.2,
      })
    })
    expect(screen.getByText('Main Ready')).toBeInTheDocument()
  })

  it('shows error when manual location lookup fails', async () => {
    const user = userEvent.setup()
    getCoordinatesByCityZip.mockResolvedValue({})

    render(<HomePage />)
    await user.click(screen.getByRole('button', { name: 'Use Manual Location' }))

    await waitFor(() => {
      expect(screen.getByText('Location not found.')).toBeInTheDocument()
    })
  })

  it('supports geolocation permission flow', async () => {
    const user = userEvent.setup()

    render(<HomePage />)
    await user.click(screen.getByRole('button', { name: 'Locate Me' }))
    await user.click(screen.getByRole('button', { name: 'Geo Success' }))

    await waitFor(() => {
      expect(getConditions).toHaveBeenCalledWith({
        latitude: 43.5,
        longitude: -116.5,
      })
    })
    expect(screen.getByText('Main Ready')).toBeInTheDocument()
  })

  it('clears cookies and state when reset is clicked', async () => {
    const user = userEvent.setup()
    getCoordinatesByCityZip.mockResolvedValue({ lat: 43.61, lon: -116.2 })

    render(<HomePage />)
    await user.click(screen.getByRole('button', { name: 'Use Manual Location' }))

    await waitFor(() => {
      expect(screen.getByText('Main Ready')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(Cookies.remove).toHaveBeenCalledWith('lat')
    expect(Cookies.remove).toHaveBeenCalledWith('lon')
  })
})
