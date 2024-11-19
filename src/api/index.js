const express = require('express')
require('dotenv').config()
const mongodb = require("mongodb")

const app = express()
const mongoClient = new mongodb.MongoClient(process.env.MONGOURL)

app.get('/operators', async (req, res) => {
  try {
    await mongoClient.connect()
    const db = mongoClient.db(process.env.DB)
    let collection = db.collection(process.env.USERS_COLLECTION)
    await collection.find().toArray().then((val) => {
      res.send({ data: val || null })
      res.end()
    })
    mongoClient.close()
  } catch (err) {
    console.log(err)
  }
})

app.listen(process.env.DEV_PORT, () => console.log(`Example backend API listening on port ${process.env.DEV_PORT}!`))
