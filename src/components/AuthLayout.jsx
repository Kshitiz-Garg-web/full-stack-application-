import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({
  children,
  authentication = true
}) {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const isAuthorized = authentication ? authStatus === true : authStatus === false

  useEffect(() => {
    if (!isAuthorized) {
      navigate(authentication ? '/login' : '/')
    }
  }, [authStatus, isAuthorized, navigate, authentication])

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}

export default AuthLayout