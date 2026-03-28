import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorBanner from './errorBanner'

describe('ErrorBanner', () => {
  it('renders error message and clears it on dismiss', async () => {
    const user = userEvent.setup()
    const clearError = vi.fn()

    render(<ErrorBanner errorText="Boom" clearError={clearError} />)

    expect(screen.getByText('Error: Boom')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(clearError).toHaveBeenCalledTimes(1)
  })
})
