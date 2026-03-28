import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Sentry from '@sentry/nextjs'
import ErrorPage from './error'
import GlobalErrorPage from './global-error'

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}))

describe('error pages', () => {
  it('renders route error and allows retry', async () => {
    const user = userEvent.setup()
    const reset = vi.fn()
    const error = new Error('Route blew up')
    render(<ErrorPage error={error} reset={reset} />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Route blew up')).toBeInTheDocument()
    expect(Sentry.captureException).toHaveBeenCalledWith(error)

    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(reset).toHaveBeenCalledTimes(1)
  })

  it('renders global error and allows retry', async () => {
    const user = userEvent.setup()
    const reset = vi.fn()
    const error = new Error('Global blew up')
    render(<GlobalErrorPage error={error} reset={reset} />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Global blew up')).toBeInTheDocument()
    expect(Sentry.captureException).toHaveBeenCalledWith(error)

    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(reset).toHaveBeenCalledTimes(1)
  })
})
