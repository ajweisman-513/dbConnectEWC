import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
// dotenv file
import dotenv from 'dotenv';
dotenv.config()

// start express
const app = express()
const port = process.env.PORT
const mongoDb = process.env.DB_CONNECTION_DEV

app.use(cors())
//body-parser will parse incoming to json for DB post
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb'}))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb' }));
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

import { settingsObjectsRoute } from './routes/settingsObjects.js';
import { microBundlesRoute } from './routes/microBundles.js';
//import { parsedReportsObjectsRoute } from './routes/parsedReportObjects.js';
import { smarterObjectsRoute } from './routes/smarterObjects.js'

//MIDDLEWARE
app.use('/settingsObjects', settingsObjectsRoute)
app.use('/microBundles', microBundlesRoute)
//app.use('/parsedReportsObjects', parsedReportsObjectsRoute)
app.use('/smarterObjects', smarterObjectsRoute)

//ROUTES
app.get('/', (req,res) => {
    res.send('ET fone home')
}) 

// Connect to DB
mongoose.connect(
    mongoDb, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db!") 
)

app.listen(port, () => console.log(`Server running on ${port}`))