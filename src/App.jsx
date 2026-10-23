import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import conf from './conf/conf.js'
import authAervice from "../src/appwrite/auth.js"
import { login, logout } from './store/authSlice.js'
import { Footer, Header } from './components/index.js'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch((state) => state)

  const fetchInfo = async () => {
    try {
      const userData = await authAervice.getCurrentUser()
      if (userData) {
        // console.log('1--------')
        dispatch(login({ userData }))
        setLoading(false)
      } else {
        // console.log('2--------')
        dispatch(logout())
      }
    } catch (error) {
      // console.log('3--------')
      console.log('app.js :: error :: ', error)
    }
    setLoading(false)
  }


  useEffect(() => { fetchInfo() }, [])
  return !loading ? (
    <div>
      <div>
        <Header />
        <main>
          {/* <Outlet/> */}
          <h1>yes user we have</h1>
        </main>
        <Footer />
      </div>
    </div>
  ) : <h1>"Loading"</h1>
}

export default App
