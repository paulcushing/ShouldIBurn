import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Main from './main'

const baseConditions = {
  weather: {
    name: 'Boise',
    wind: {
      speed: 5,
      gust: 8,
    },
  },
  air: [{ AQI: 40 }],
  degraded: false,
  warning: null,
}

describe('Main', () => {
  it('shows Yes when wind and AQI are acceptable', () => {
    render(<Main conditions={baseConditions} resetLocation={vi.fn()} />)
    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('Boise')).toBeInTheDocument()
  })

  it('shows No when wind is too high', () => {
    const conditions = {
      ...baseConditions,
      weather: { ...baseConditions.weather, wind: { speed: 12, gust: 12 } },
    }
    render(<Main conditions={conditions} resetLocation={vi.fn()} />)
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('shows gust warning when gusts are high and AQI acceptable', () => {
    const conditions = {
      ...baseConditions,
      weather: { ...baseConditions.weather, wind: { speed: 5, gust: 20 } },
    }
    render(<Main conditions={conditions} resetLocation={vi.fn()} />)
    expect(screen.getByText(/Wind gusts may still exceed 10 MPH/i)).toBeInTheDocument()
  })

  it('shows degraded AQI warning with fallback when air data unavailable', () => {
    const conditions = {
      ...baseConditions,
      air: null,
      degraded: true,
      warning: null,
    }
    render(<Main conditions={conditions} resetLocation={vi.fn()} />)
    expect(screen.getByText(/Air quality data is currently unavailable/i)).toBeInTheDocument()
    expect(screen.getByText('?*')).toBeInTheDocument()
  })

  it('calls resetLocation when reset is clicked', async () => {
    const user = userEvent.setup()
    const resetLocation = vi.fn()
    render(<Main conditions={baseConditions} resetLocation={resetLocation} />)
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(resetLocation).toHaveBeenCalledTimes(1)
  })
})
