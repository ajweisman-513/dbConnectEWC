import express from 'express'
import mongoose from "mongoose"

const router = express.Router()

const MicroBundleSchema = mongoose.Schema({
    acctName: String,
    settingsInformation: Object,
    keyDrvSettingsArray: Array,
    kpiSettingsArray: Array,
    microObjectsArray: Array
})

// GET LATEST Report OBJECT
router.get('/', async (req,res) => {
    console.log(req.body)
    let acctName = req.body.data.acctName
    const collectionName = acctName + '-MicroBundle'
    const dynamicMicroBundleCollectionName = mongoose.model(
        'MicroBundle',
        MicroBundleSchema,
        collectionName
    )
    try{
        const microBundleObjects = await dynamicMicroBundleCollectionName.find()
        console.log("the returning microBundle", microBundleObjects)
        res.json(microBundleObjects)
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW MICRO BUNDLE OBJECT
router.post('/', async (req, res) => {
    console.log(req.body)    
    const acctName = req.body._acctName
    const collectionName = acctName + '-MicroBundle'
    const dynamicMicroBundleCollectionName = mongoose.model(
        'MicroBundle', 
        MicroBundleSchema, 
        collectionName
    ) 
    const microBundleObject = new dynamicMicroBundleCollectionName({
        acctName: req.body._acctName,
        settingsInformation: req.body._settingsInformation,
        keyDrvSettingsArray: req.body._keyDrvSettingsArray,
        kpiSettingsArray: req.body._kpiSettingsArray,
        microObjectsArray: req.body_microObjectsArray
    })
    try{
    const savedmicroBundleObject = await microBundleObject.save()
    res.json(savedmicroBundleObject)
    }catch{
        err => res.json({message: err})
    }
})

// SPECIFIC BUNDLE
router.get('/:postId')


export { router as microBundlesRoute }