import React from 'react'
import AddBlog from '@/components/blogs/AddBlog'
import Navigation from '@/components/layout/Navigation'
import { getAppCookies, verifyToken } from '../../middleware/utils'
import LoginPage from '..'
import Router from 'next/router'

export default function AddBlogPage(props) {
  const { credential, token } = props
  async function addBlogHandler(addBlogData) {
    const response = await fetch('http://localhost:3000/api/add-blog', {
      method: 'POST',
      body: JSON.stringify(addBlogData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    await response.json()
    Router.push('/blogs')
  }

  return (
    <div>
      {!credential ? (
        <LoginPage />
      ) : (
        <div>
          <Navigation />
          <AddBlog onAddBlog={addBlogHandler} />
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const { token } = getAppCookies(req)
  const credential = verifyToken(token?.split(' ')[1]) || null
  return {
    props: {
      token,
      credential
    }
  }
}
