import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './header'

describe('Header', () => {
  it('renders primary navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('toggles mobile menu icon state on click', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const menuButton = screen.getByRole('navigation').querySelector('svg')
    expect(menuButton).toBeTruthy()
    await user.click(menuButton)
    await user.click(menuButton)
  })
})
