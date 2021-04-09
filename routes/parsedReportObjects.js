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
    let acctName = req.body
    try{
        const parsedReportObjects = await ParsedReportObject.find(acctName)
        console.log("the returning object", settingsObjects)
        res.json(settingsObjects)
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW PARSED REPORT OBJECT
router.post('/', async (req, res) => {
    console.log(req.body)
    
    const collectionName = req.body._acctName
    const dynamicParsedReportObjectSchema = mongoose.model('ParsedReportObject', schema, 'ParsedReportObject' + collectionName) 

    const parsedReportObject = new dynamicParsedReportObjectSchema({
        acctName: req.body._acctName,
        reportType: req.body._reportType,
        runDate: req.body._runDate,
        runDateReadable: req.body._runDateReadable,
        runPeriod: req.body._runPeriod,
        reportData: req.body._reportData
    })
    try{
    const savedSettingsObject = await settingsObject.save()
    res.json(savedSettingsObject)
    }catch{
        err => res.json({message: err})
    }
})

// SPECIFIC SETTINGSOBJECT
router.get('/:postId')


export { router as parsedReportsObjectsRoute }