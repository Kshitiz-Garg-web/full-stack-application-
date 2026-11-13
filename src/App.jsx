import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import authAervice from '../src/appwrite/auth.js'
import { Footer, Header } from './components/index.js'
import { login, logout } from './store/authSlice.js'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const fetchInfo = useCallback(async () => {
    try {
      const userData = await authAervice.getCurrentUser()
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout())
      }
    } catch (error) {
      console.log('app.js :: error :: ', error)
      dispatch(logout())
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  if (loading) {
    return (
      <div className="page-shell">
        <div className="container page-loading">
          <div className="skeleton" style={{ height: '4rem', width: '12rem', marginBottom: '1rem' }} />
          <div className="skeleton" style={{ height: '22rem', borderRadius: '1.25rem' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
