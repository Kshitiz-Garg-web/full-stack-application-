import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <Authenticat Authenticat={false}>
            <Login />
          </Authenticat>
        )
      },
      {
        path: '/signup',
        element: (
          <Authenticat Authenticat={false}>
            <Signup />
          </Authenticat>
        )
      },
      {
        path: '/all-posts',
        element: (
          <Authenticat Authenticat={true}>
            <AllPosts />
          </Authenticat>
        )
      },
      {
        path: '/add-post',
        element: (
          <Authenticat Authenticat={true}>
            <AddPost />
          </Authenticat>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Authenticat Authenticat={true}>
            <EditPost />
          </Authenticat>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
)
