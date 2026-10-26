import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authAervice from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Logo, Button, Input } from './index'

const [error, setError] = useState("")
const dispatch = useDispatch()
const { register, handleSubmit } = useForm()
const navigate = useNavigate()
const create = async (data) => {
  setError("")
  try {
    const seassion = await authAervice.createAccount(data)
    if (seassion) {
      const userData = await authAervice.getCurrentUser()
      if (userData) {
        dispatch(authLogin(userData))
        navigate('/')
      }
    }
  } catch (error) {
    console.log('Signup :: error :: ', error)
    setError(error.message)
  }
}

function Signup() {
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
        <form onSubmit={handleSubmit(create)}>
          <div>
            <Input
              label='Name : '
              type="name"
              className=""
              placeholder='Enter Your Full Name'
              {...register("name", {
                required: true
              })}
            />
            <Input
              label='Email : '
              type="email"
              className=""
              placeholder='Enter Your Email'
              {...register("email", {
                required: true
              })}
            />
            <Input
              label='Password : '
              type="password"
              className=""
              placeholder='Enter Your Password'
              {...register("password", {
                required: true
              })}
            />
            <Button
              type='submit'
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Signup