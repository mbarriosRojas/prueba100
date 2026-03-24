'use client'

import { useState, useEffect, useCallback } from 'react'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const scrollToSection = useCallback((href: string) => {
    setIsMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      // Offset por el navbar fijo
      const yOffset = -72
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(250,250,250,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <a
            href="#"
            aria-label="Ir al inicio"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0f0f0f',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            {'<'}
            <span style={{ color: '#4f46e5' }}>dev</span>
            {' />'}
          </a>

          {/* Desktop navigation — WCAG: nav landmark */}
          <nav
            aria-label="Navegación principal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            className="navbar-desktop"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                aria-label={`Ir a ${link.label}`}
                style={{
                  padding: '0.5rem 0.875rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#374151',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s ease, color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                  e.currentTarget.style.color = '#0f0f0f'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                {link.label}
              </button>
            ))}

            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contacto')
              }}
              style={{
                marginLeft: '0.5rem',
                padding: '0.5625rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: '#4f46e5',
                borderRadius: '8px',
                transition: 'background-color 0.15s ease, transform 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4338ca'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4f46e5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Hablemos →
            </a>
          </nav>

          {/* Mobile hamburger — WCAG: aria-expanded + aria-controls */}
          <button
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="navbar-mobile-btn"
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: isMenuOpen ? '#f3f4f6' : 'transparent',
              transition: 'background-color 0.15s ease'
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="4" x2="4" y2="18" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="#0f0f0f" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu — fuera del header para z-index correcto */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menú de navegación"
        aria-modal="true"
        className="mobile-menu-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 190,
          backgroundColor: 'rgba(250,250,250,0.98)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          paddingTop: '72px',
          transition: 'opacity 0.25s ease, visibility 0.25s ease',
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => scrollToSection(link.href)}
            tabIndex={isMenuOpen ? 0 : -1}
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#0f0f0f',
              padding: '0.75rem 2rem',
              borderRadius: '12px',
              transition: 'background-color 0.15s ease',
              animationDelay: `${i * 60}ms`
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            {link.label}
          </button>
        ))}
        <a
          href="#contacto"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('#contacto')
          }}
          style={{
            marginTop: '1rem',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#ffffff',
            backgroundColor: '#4f46e5',
            borderRadius: '12px',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4338ca' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#4f46e5' }}
        >
          Hablemos →
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .navbar-desktop { display: none !important; }
          .navbar-mobile-btn { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-menu-overlay { display: none !important; }
        }
      `}</style>
    </>
  )
}
