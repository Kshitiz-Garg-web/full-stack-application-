import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { Container, LogoutBtn, Logo } from '../index'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus }
  ]

  return (
    <header className="site-header">
      <Container>
        <div className="site-header__inner">
          <Link to="/" className="brand-link" aria-label="Go to home page">
            <Logo width="140px" />
          </Link>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'menu-toggle--open' : ''}`}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="primary-navigation"
            className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
            aria-label="Main navigation"
          >
            <ul className="nav-list">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className={`nav-link ${location.pathname === item.slug ? 'nav-link--active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : null
              )}

              {authStatus && (
                <li onClick={() => setMenuOpen(false)}>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header