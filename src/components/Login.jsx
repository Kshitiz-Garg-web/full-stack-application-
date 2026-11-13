import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { Logo, Button, Input } from './index'

function Login() {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
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
            <h2 className="page-heading page-heading--center">Welcome back</h2>
            <p className="auth-copy">
              Don&apos;t have an account? <Link to="/signup" className="auth-link">Sign up</Link>
            </p>
          </div>

          {error && <p className="form-error">{error}</p>}

          <form onSubmit={handleSubmit(login)} className="field-stack">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([._-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Enter a valid email address'
                }
              })}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register('password', {
                required: true
              })}
            />

            <Button type="submit" className="btn-primary">Log in</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login