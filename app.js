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
let mongoDb = null
//MongoDb Connection
if (process.env.NODE_ENV === "production") {
    mongoDb = process.env.DB_CONNECTION;
} else {
    mongoDb = process.env.DB_CONNECTION_ME;
}

app.use(cors())
//body-parser will parse incoming to json for DB post
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb'}))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb' }));
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

import { employeeReportsObjectsRoute } from './routes/employeeReportObjects.js';
import { settingsObjectsRoute } from './routes/settingsObjects.js';
import { microBundlesRoute } from './routes/microBundles.js';
import { smarterObjectsRoute } from './routes/smarterObjects.js'

//MIDDLEWARE
app.use('/employeeReportsObjects', employeeReportsObjectsRoute)
app.use('/settingsObjects', settingsObjectsRoute)
app.use('/microBundles', microBundlesRoute)
app.use('/smarterObjects', smarterObjectsRoute)


//ROUTES
app.get('/', (req,res) => {
    res.send('dbConnectPage BLANK')
}) 


// Connect to DB
mongoose.connect(
    mongoDb, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db at...", mongoDb) 
)

app.listen(port, () => console.log(`Server running on ${port}`))