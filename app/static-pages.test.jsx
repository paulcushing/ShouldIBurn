import { render, screen } from '@testing-library/react'
import AboutPage from './about/page'
import ContactPage from './contact/page'
import NotFound from './not-found'
import Loading from './loading'

describe('static pages', () => {
  it('renders about page content', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
  })

  it('renders contact page content', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })

  it('renders not found page', () => {
    render(<NotFound />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go back home' })).toBeInTheDocument()
  })

  it('renders loading fallback', () => {
    render(<Loading />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
