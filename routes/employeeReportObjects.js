import express from 'express'
import mongoose from "mongoose"

const router = express.Router()

import EmployeeReportSchema from '../schemas/EmployeeReportSchema.js'

// GET LATEST Report OBJECT
router.get('/', async (req,res) => {
    console.log("req.body", req.body)
    let acctName = req.body.data.acctName
    const collectionName = acctName + '-EmployeeReportObject'
    const dynamicParsedReportObjCollectionName = mongoose.model(
        'EmployeeReportObjects',
        EmployeeReportSchema,
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
    const collectionName = acctName + '-EmployeeReportObjects'
    const dynamicParsedReportObjCollectionName = mongoose.model(
        'EmployeeReportObject', 
        EmployeeReportSchema, 
        collectionName
    ) 
    const employeeReportObject = new dynamicParsedReportObjCollectionName({
        reportType: req.body._reportType,
        acctName: req.body._acctName,
        originatingReportName: req.body._originatingReportName,
        mongoDocumentName: req.body._mongoDocumentName,
        reportDate: req.body._reportDate,
        pRepresentation: req.body._pRepresentation,
        reportData: req.body._data
    })
    try{
    const savedEmployeeReportObject = await employeeReportObject.save()
    res.json(savedEmployeeReportObject)
    }catch{
        err => res.json({message: err})
    }
})

export { router as employeeReportsObjectsRoute }