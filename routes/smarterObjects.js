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
    res.status(200).send(savedSmarterObject)
    }catch{
        err => res.json({message: err})
    }
})

// UPDATE TO SMARTEROBJECT
router.patch('/update/:id', async (req, res) => {
    const acctName = req.body.acctName
    const dataPackage = req.body.data
    console.log("id for this is @ dbConn", req.params)
    console.log("req.body @ dbConn", dataPackage)
    const sO_id = req.params.id
    const location_id = dataPackage.location_id
    const macroObject_id = dataPackage.macroObject_id
    const macroObjectType = dataPackage.macroObjectType
    const newIsCompleteStatus = dataPackage.newIsCompleteStatus
    
    const collectionName = acctName + '-SmarterObject'
    const DynamicSmarterObjCollectionName = mongoose.model(
        'SmarterObject',
        SmarterObjectSchema,
        collectionName
    )    
    await DynamicSmarterObjCollectionName
        .findById(sO_id, function (err, foundObject) {
            if (err) return res.status(500).send(err)
            if (!foundObject) return res.status(404).send("SmarterObject not Found")
            if (foundObject) {
                const location = foundObject.locationObjs.id(location_id)
                if (!location) return res.status(404).send("Location not Found")
                console.log(location_id, location.updatedAt)
                const macroObjToUpdate = location[macroObjectType].id(macroObject_id)
                if (!macroObjToUpdate) return res.status(404).send("MacroObject not Found")
                if (!newIsCompleteStatus) {
                    console.log("Macro is false")
                    macroObjToUpdate._isComplete = newIsCompleteStatus
                    macroObjToUpdate._isCompletedAs = null
                    foundObject.markModified('locationObjs')
                    foundObject.save()
                    return res.status(200).send(
                        {
                            status: "item reset to default status",
                            location,                            
                            macroObjToUpdate
                        })
                }
                console.log("Macro is true")
                macroObjToUpdate._isComplete = dataPackage.newIsCompleteStatus
                macroObjToUpdate._isCompletedAs = dataPackage.newIsCompletedAs
                foundObject.markModified('locationObjs')
                foundObject.save()
                return res.status(200).send({
                    status: "item set to complete in DB",
                    macroObjToUpdate
                })
            }
        })  
})

export { router as smarterObjectsRoute }