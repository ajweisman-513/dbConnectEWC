import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
// dotenv file
import dotenv from 'dotenv';
dotenv.config()

// start express
const app = express()
const port = process.env.PORT
const mongoDb = process.env.DB_CONNECTION

//body-parser will parse incoming to json for DB post
app.use(bodyParser.json())


import { postsRoute } from './routes/posts.js'

//MIDDLEWARE
app.use('/posts', postsRoute)

 

//ROUTES
app.get('/', (req,res) => {
    res.send('ET fone home')
}) 

// Connect to DB
mongoose.connect(
    mongoDb, 
    { useNewUrlParser: true },
    () => console.log("connected to db!") 
)

app.listen(5001)