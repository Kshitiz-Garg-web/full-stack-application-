import React from 'react'
import { Container, LogoutBtn, Logo } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import authAervice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.reducer.status)
  // const naviagte = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    }, {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    }, {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    }, {
      name: 'All Posts',
      slug: '/all-post',
      active: authStatus
    }, {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]
  return (
    <header>
      <Container>
        <nav>
          <div>
            <a href='/'><Logo width="70px" /></a>
          </div>
          <ul>
            {navItems.map((item, i) =>
              item.active ? (
                // <li key={item.name}>
                //   <button
                //     onClick={() => naviagte(item.slug)}>{iten.name}</button>
                // </li>
                <li key={item.name}>
                  <a href={item.slug}>{item.name}</a>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header >
  )
}

export default Header