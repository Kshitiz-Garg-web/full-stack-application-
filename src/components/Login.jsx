import React, { useState } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Logo, Button, Input } from './index'

function Login() {
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }



  return (
    <div>
      <div>
        <Logo />
      </div>
      <div>
        <h2>Sign in to your account</h2>
        <p>D'not have any account?&nbsp;
          <a href="/signup">Sign up</a>
        </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              label="Email"
              placeholder="Enter your email : "
              type='email'
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([._-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter address must be a valid address"
                }
              })}
            />
            <Input
              label="Password : "
              placeholder="Enter your Password"
              type='password'
              {...register('password', {
                required: true
              })}
            />
            <Button
              type='subit'
              className=''
            >Log in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login