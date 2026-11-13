import { useDispatch } from 'react-redux'

import authAervice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authAervice.logout()
      .then(() => {
        dispatch(logout())
      })
      .catch((error) => {
        console.log('LogoutBtn.jsx :: error :: ', error)
      })
  }

  return (
    <button type="button" className="btn btn-secondary btn-small" onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutBtn