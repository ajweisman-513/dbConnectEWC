import express from 'express'
import mongoose from "mongoose"

const router = express.Router()

const ParsedReportObjectSchema = mongoose.Schema({
    acctName: String,
    reportType: String,
    runDate: Number,
    runDateReadable: String,
    runPeriod: String,
    reportData: Array
})

// GET LATEST Report OBJECT
router.get('/', async (req,res) => {
    console.log("req.body", req.body)
    let acctName = req.body.data.acctName
    const collectionName = acctName + '-ParsedReportObject'
    const dynamicParsedReportObjCollectionName = mongoose.model(
        'SettingsObject',
        ParsedReportObjectSchema,
        collectionName
    )
    try{
        const parsedReportObjects = await dynamicParsedReportObjCollectionName.find()
        console.log("the returning parsedReportObjects", parsedReportObjects)
        res.json(parsedReportObjects.slice(-1)[0] )
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW PARSED REPORT OBJECT
router.post('/', async (req, res) => {
    console.log(req.body)    
    const acctName = req.body._acctName
    const collectionName = acctName + '-ParsedReportObject'
    const dynamicParsedReportObjCollectionName = mongoose.model(
        'ParsedReportObject', 
        ParsedReportObjectSchema, 
        collectionName
    ) 
    const parsedReportObject = new dynamicParsedReportObjCollectionName({
        acctName: req.body._acctName,
        reportType: req.body._reportType,
        runDate: req.body._runDate,
        runDateReadable: req.body._runDateReadable,
        runPeriod: req.body._runPeriod,
        reportData: req.body._reportData
    })
    try{
    const savedparsedReportObject = await parsedReportObject.save()
    res.json(savedparsedReportObject)
    }catch{
        err => res.json({message: err})
    }
})

// SPECIFIC SETTINGSOBJECT
router.get('/:postId')


export { router as parsedReportsObjectsRoute }