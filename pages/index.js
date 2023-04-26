import React, { useState } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'
import styles from '@/styles/Home.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initalState = {
  email: {
    value: '',
    label: 'Email'
  },
  password: {
    value: '',
    label: 'Password'
  }
}

export default function LoginPage() {
  const [stateFormData, setStateFormData] = useState(initalState)
  const [loading, setLoading] = useState(false)

  const errorNotify = (message) => {
    toast.error(String(message), {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  function onChangeHandler(e) {
    const { name, value } = e.currentTarget
    setStateFormData({
      ...stateFormData,
      [name]: {
        ...stateFormData[name],
        value
      }
    })
  }

  async function onSubmitHandler(e) {
    e.preventDefault()
    const data = {
      email: stateFormData.email.value || '',
      password: stateFormData.password.value || ''
    }
    setLoading(!loading)
    let result = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    result = await result.json()
    if (result.statusCode == 200) {
      Cookies.set('token', result.token)
      Router.push('/blogs')
    } else {
      errorNotify('Username/password incorrect')
    }
    setLoading(false)
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.overlay}>
              <h1>Hello,</h1>
              <h4 className={styles.overaly_h4}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </h4>
            </div>
          </div>
          <div className={styles.right}>
            <h4 className={styles.overlay_right_h4}>Login</h4>
            <p style={{ fontSize: '14px' }}>
              Don't have an account? <a href="#">Create Your Account</a> it
              takes less than a minute.
            </p>
            <form method="POST" onSubmit={onSubmitHandler}>
              <div>
                <input
                  required
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChangeHandler}
                  value={stateFormData.email.value}
                />
              </div>
              <div>
                <input
                  required
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChangeHandler}
                  value={stateFormData.email.password}
                />
              </div>
              <div>
                <button className={styles.button} type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  )
}
