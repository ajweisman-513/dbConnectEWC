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
router.patch('/:id', async (req, res, next) => {
    console.log("req.body", req.body)
    const id = req.params.id
    console.log("id for this is", req.params)
    const acctName = req.body.acctName
    const collectionName = acctName + '-SmarterObject'
    const DynamicSmarterObjCollectionName = mongoose.model(
        'SmarterObject',
        SmarterObjectSchema,
        collectionName
    )
    const locationObj = req.body.locationObj
    const macroArray = req.body.type
    const tom = function macroType() {
        if(req.body.type === 'neg') return "_keyDrvMacrosVarNegative"
        if(req.body.type === 'pos') return "_keyDrvMacrosVarPositive" 

    }
    console.log(tom())
    await DynamicSmarterObjCollectionName
        .findById(id, function (err, foundObject) {
            if (err) return res.status(500).send(err)
            if (!foundObject) res.status(404).send("Not Found")
            if (foundObject) {

                let location = foundObject.locationObjs.id(locationObj)["_keyDrvMacrosVarNegative"][9]
                //let macroObj = location.macroType().id()
                //foundObject.acctName2 = req.body.acctName2
                //foundObject.save()
                res.status(200).send(location)
            }
        })

})

export { router as smarterObjectsRoute }