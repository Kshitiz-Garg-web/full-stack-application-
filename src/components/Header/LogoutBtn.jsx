import React from 'react'
import authAervice from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    (authAervice.logout()).then(() => {
      dispatch(logout())
    }).catch((error) => {
      console.log('LogoutBtn.jsx :: error :: ', error)
    })
  }
  return (
    <button onClick={logoutHandler}>LogoutBtn</button>
  )
}

export default LogoutBtn