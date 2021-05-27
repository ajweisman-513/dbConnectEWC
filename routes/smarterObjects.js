import express from 'express'
import mongoose from 'mongoose'

import SmarterObjectSchema from '../schemas/SmarterObjectSchema.js'

const router = express.Router()

// GET LATEST SMARTEROBJECT
router.get('/', async (req,res) => {
    console.log("req.body", req.body)
    const acctName = req.body.acctName
    const collectionName = acctName + '-SmarterObject'
    const dynamicSmarterObjCollectionName = mongoose.model(
        'SmarterObject',
        SmarterObjectSchema,
        collectionName
    ) 
    try{
        const smarterObjects = await dynamicSmarterObjCollectionName.find()
        console.log(smarterObjects)
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

// UPDATE TO SMARTEROBJECT
router.patch('/update/:id', async (req, res) => {
    console.log("id for this is", req.params)
    console.log("req.body", req.body)
    console.log("req.body.location_id", req.body.location_id)
    console.log("req.body.macroObject_id", req.body.macroObject_id)
    const sO_id = req.params.id
    const location_id = req.body.location_id
    const macroObject_id = req.body.macroObject_id
    const macroObjectType = req.body.macroObjectType
    const newIsCompleteStatus = req.body.newIsCompleteStatus
    const acctName = req.body.acctName
    const collectionName = acctName + '-SmarterObject'
    const DynamicSmarterObjCollectionName = mongoose.model(
        'SmarterObject',
        SmarterObjectSchema,
        collectionName
    )    
    await DynamicSmarterObjCollectionName
        .findById(sO_id, function (err, foundObject) {
            if (err) return res.status(500).send(err)
            if (!foundObject) res.status(404).send("Not Found")
            if (foundObject) {
                let location = foundObject.locationObjs.id(location_id)
                console.log(location)
                let macroObjToUpdate = location[macroObjectType].id(macroObject_id)
                if (newIsCompleteStatus === false) {
                    macroObjToUpdate._isComplete = false
                    macroObjToUpdate._isCompletedAs = null
                    return res.status(200).send(
                        {
                            status: "item reset to default status",
                            macroObjToUpdate
                        })
                }
                macroObjToUpdate._isComplete = req.body.newIsCompleteStatus
                macroObjToUpdate._isCompletedAs = req.body.newIsCompletedAs
                foundObject.markModified('locationObjs')
                foundObject.save()
                res.status(200).send(macroObjToUpdate)
            }
        })  
})

export { router as smarterObjectsRoute }