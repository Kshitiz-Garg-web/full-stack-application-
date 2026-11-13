import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import authAervice from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { Logo, Button, Input } from './index'

function Signup() {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const create = async (data) => {
    setError('')
    try {
      const seassion = await authAervice.createAccount(data)
      if (seassion) {
        const userData = await authAervice.getCurrentUser()
        if (userData) {
          dispatch(authLogin({ userData }))
          navigate('/')
        }
      }
    } catch (error) {
      console.log('Signup :: error :: ', error)
      setError(error.message || 'get error during signup')
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-card__header">
          <Logo width="160px" />
        </div>

        <div className="auth-card__body">
          <div>
            <h2 className="page-heading page-heading--center">Create account</h2>
            <p className="auth-copy">
              Already have an account? <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </div>

          {error && <p className="form-error">{error}</p>}

          <form onSubmit={handleSubmit(create)} className="field-stack">
            <Input
              label="Name"
              type="text"
              placeholder="Enter your full name"
              {...register('name', { required: true })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: true })}
            />
            <Button type="submit">Sign up</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup