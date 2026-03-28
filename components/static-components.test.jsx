import { render, screen } from '@testing-library/react'
import Footer from './footer'
import Loader from './loader'
import CallToAction from './calltoaction'

describe('static components', () => {
  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('renders loader', () => {
    const { container } = render(<Loader />)
    expect(container.querySelector('.loader')).toBeInTheDocument()
  })

  it('renders call to action content', () => {
    render(<CallToAction />)
    expect(screen.getByText('Potential Sponsor Space')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Visit Our Sponsor/i })).toBeInTheDocument()
  })
})
