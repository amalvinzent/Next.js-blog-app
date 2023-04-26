import React from 'react'
import Navigation from '@/components/layout/Navigation'
import { getAppCookies, verifyToken } from '../../middleware/utils'
import LoginPage from '..'
import Blogs from '@/components/blogs/Blogs'
import Router from 'next/router'

export default function BlogsPage(props) {
  const { credential, result, token } = props

  const handleDelete = async (_id) => {
    await fetch('http://localhost:3000/api/blogs', {
      method: 'DELETE',
      body: JSON.stringify(_id),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    Router.push('/blogs')
  }

  return (
    <div>
      {!credential ? (
        <LoginPage />
      ) : (
        <div>
          <Navigation />
          <Blogs
            props={result}
            onHandleDelete={handleDelete}
            role={credential.role}
          />
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const { token } = getAppCookies(req)
  let credential = null
  let result = []
  if (token) {
    credential = verifyToken(token?.split(' ')[1])
    const response = await fetch('http://localhost:3000/api/blogs', {
      headers: {
        method: 'GET',
        Authorization: `${token}`
      }
    })
    result = await response.json()
  }
  return {
    props: {
      result,
      credential,
      token
    }
  }
}
