import express from 'express'
import mongoose from "mongoose"

const router = express.Router()

const SmarterObjectSchema = mongoose.Schema({
    name: String,
    uploadDate: Number,
    sO_reportsInfo: Object,
    keyDriverObjs: Array,
    locationObjs: Array
})


// GET LATEST SMARTEROBJECT
router.get('/', async (req,res) => {
    console.log('get sO', req.params)
    try{
        const smarterObjects = await SmarterObject.find()
        res.json(smarterObjects.slice(-1)[0] )
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW SMARTEROBJECT
router.post('/', async (req, res) => {
    console.log(req.body)
    const collectionName = req.body._acctName
    const dynamicSmarterObjectSchema = mongoose.model(
        'smarterObject',
        SmarterObjectSchema,
        collectionName + '-SmarterObject'
    )
    const smarterObject = new dynamicSmarterObjectSchema({
        acctName: req.body._acctName,
        date: req.body.date,
        sO_reportsInfo: req.body.sO_reportsInfo,
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