import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
require('dotenv').config()
const { ObjectId } = require('mongodb')
const KEY = 'GLOBAL'

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const client = await MongoClient.connect('')
    const bearer = req.headers['authorization'].replace(/^Bearer\s/, '')
    const decode = jwt.verify(bearer, KEY)
    if (!decode)
      return res.status(400).json({ statusCode: 400, message: 'Unauthorized' })
    const db = client.db()
    const blogCollection = db.collection('blogs')

    let result = []
    if (decode?.role == 'ADMIN') {
      result = await blogCollection.find().toArray()
    } else if (decode?.role == 'AUTHOR') {
      result = await blogCollection.find({ user_id: decode?.id }).toArray()
    } else if (decode?.role == 'READER') {
      result = await blogCollection.find().toArray()
    }
    client.close()
    res.status(200).json({ statusCode: 200, message: 'Success', result })
  }
  if (req.method == 'DELETE') {
    const data = req.body
    const client = await MongoClient.connect('')
    const bearer = req.headers['authorization'].replace(/^Bearer\s/, '')
    const decode = jwt.verify(bearer, KEY)
    if (!decode)
      return res.status(400).json({ statusCode: 400, message: 'Unauthorized' })
    const db = client.db()
    const blogCollection = db.collection('blogs')
    if (decode?.role == 'ADMIN') {
      const result = await blogCollection.findOneAndDelete({
        _id: new ObjectId(data)
      })
      client.close()
      if (result?.value) {
        res.status(200).json({ statusCode: 200, message: 'Success' })
      } else res.status(400).json({ statusCode: 400, message: 'Error' })
    }
  }
}
