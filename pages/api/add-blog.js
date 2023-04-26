import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'

const KEY = 'GLOBAL'
export default async function handler(req, res) {
  const data = req.body
  if (req.method == 'POST') {
    const bearer = req.headers['authorization'].replace(/^Bearer\s/, '')
    const decode = jwt.verify(bearer, KEY)
    const client = await MongoClient.connect('')
    const db = client.db()
    const blogCollection = db.collection('blogs')
    await blogCollection.insertOne({ ...data, user_id: decode.id })
    client.close()
    res.status(200).json({ statusCode: 200, message: 'Success' })
  }
}
