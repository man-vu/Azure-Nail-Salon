import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import BookingPage from '@/pages/BookingPage/BookingPage'
import ServicesPage from '@/pages/ServicesPage/ServicesPage'
import TeamPage from '@/pages/TeamPage/TeamPage'
import ContactUsPage from '@/pages/ContactUsPage/ContactUsPage'
import GiftCardPage from '@/pages/GiftCardPage/GiftCardPage'
import AuthPage from '@/pages/Auth/AuthPage'

describe('Page renders', () => {
  it('BookingPage', () => {
    render(
      <BrowserRouter>
        <BookingPage />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /book an appointment/i })).toBeInTheDocument()
  })

  it('ServicesPage', () => {
    render(
      <BrowserRouter>
        <ServicesPage />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /services/i })).toBeInTheDocument()
  })

  it('TeamPage', () => {
    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /our team/i })).toBeInTheDocument()
  })

  it('ContactUsPage', () => {
    render(
      <BrowserRouter>
        <ContactUsPage />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument()
  })

  it('GiftCardPage', () => {
    render(
      <BrowserRouter>
        <GiftCardPage />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /gift card/i })).toBeInTheDocument()
  })

  it('AuthPage', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      </AuthProvider>
    )
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })
})
