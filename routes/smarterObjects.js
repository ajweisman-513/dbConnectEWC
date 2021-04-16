import express from 'express'
import mongoose from "mongoose"

const router = express.Router()

const SmarterObjectSchema = mongoose.Schema({
    acctName: String,
    dbPushDate: String,
    sO_reportsInfo: Object,
    kpiSettings: Array,
    keyDriverObjs: Array,
    locationObjs: Array
})


// GET LATEST SMARTEROBJECT
router.get('/', async (req,res) => {
    console.log("req.body", req.body)
    const acctName = req.body._acctName
    const collectionName = acctName + '-SmarterObject'
    const dynamicSmarterObjCollectionName = mongoose.model(
        'SmarterObject',
        SmarterObjectSchema,
        collectionName
    )
    try{
        const smarterObjects = await dynamicSmarterObjCollectionName.find()
        res.json(smarterObjects.slice(-1)[0] )
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW SMARTEROBJECT
router.post('/', async (req, res) => {
    console.log(req.body)
    const acctName = req.body._acctName
    const collectionName = acctName + '-SmarterObject'
    const dynamicSmarterObjCollectionName = mongoose.model(
        'SmarterObject',
        SmarterObjectSchema,
        collectionName
    )
    const smarterObject = new dynamicSmarterObjCollectionName({
        acctName: req.body._acctName,
        dbPushDate: req.body._dbPushDate,
        sO_reportsInfo: req.body.sO_reportsInfo,
        kpiSettings: req.body.kpiSettings,
        keyDriverObjs: req.body.keyDriverObjs,
        locationObjs: req.body.locationObjs
    })
    try{
    const savedSmarterObject = await smarterObject.save()
    res.json(savedSmarterObject)
    }catch{
        err => res.json({message: err})
    }
})

// SPECIFIC SMARTEROBJECT
router.get('/:postId')


export { router as smarterObjectsRoute }