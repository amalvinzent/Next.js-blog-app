import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()
const KEY = 'GLOBAL'
const USERS = [
  {
    id: 100,
    email: 'admin@email.com',
    password: '$2a$10$IJG.cCSPmDlyTDWmJ7bfgO2NaQcmxyDJ0b2CTa4Wf2HjwRTWFfEw2',
    role: 'ADMIN'
  },
  {
    id: 101,
    email: 'author@email.com',
    password: '$2a$10$IJG.cCSPmDlyTDWmJ7bfgO2NaQcmxyDJ0b2CTa4Wf2HjwRTWFfEw2',
    role: 'AUTHOR'
  },
  {
    id: 102,
    email: 'reader@email.com',
    password: '$2a$10$IJG.cCSPmDlyTDWmJ7bfgO2NaQcmxyDJ0b2CTa4Wf2HjwRTWFfEw2',
    role: 'READER'
  }
]

export default (req, res) => {
  return new Promise((resolve) => {
    const { method } = req
    try {
      switch (method) {
        case 'POST':
          const { email, password } = req.body
          const user = USERS.find((user) => {
            return user.email == email
          })
          if (!user) {
            res.status(400).json({ statusCode: 400, message: 'User not found' })
          } else {
            bcrypt.compare(password, user.password).then((isMatch) => {
              if (isMatch) {
                const payload = {
                  id: user.id,
                  email: user.email,
                  role: user.role
                }
                jwt.sign(
                  payload,
                  KEY,
                  {
                    expiresIn: 3000000
                  },
                  (err, token) => {
                    res.status(200).json({
                      statusCode: 200,
                      success: true,
                      token: `Bearer ${token}`
                    })
                  }
                )
              } else {
                res
                  .status(400)
                  .json({ statusCode: 400, message: 'Error signing in' })
              }
            })
          }

          break
        default:
          break
      }
    } catch (error) {
      throw error
    }
    return resolve()
  })
}
