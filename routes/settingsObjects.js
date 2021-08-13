import express from 'express'
import mongoose from "mongoose"

const router = express.Router()

const SettingsObjectSchema = mongoose.Schema({
    acctName: { type: String, required: true },
    settingsDate: Number,
    settingsDateReadable: String,
    keyDriverSettings: Array,
    kpiSettings: Array
}, {
    timestamps: true
})


// GET LATEST SETTINGS OBJECT
router.get('/', async (req,res) => {
    console.log("req.body", req.body)
    let acctName = req.body.data.acctName
    const collectionName = acctName + '-SettingsObject'
    console.log(collectionName)
    const dynamicSetObjCollectionName = mongoose.model(
        'SettingsObject',
        SettingsObjectSchema,
        collectionName
    )
    try{        
        const settingsObjects = await dynamicSetObjCollectionName.find()
        console.log("the returning settingsObjects", settingsObjects)
        res.json(settingsObjects.slice(-1)[0] )
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW SETTINGSOBJECT
router.post('/', async (req, res) => {
    console.log(req.body)
    const acctName = req.body._acctName
    const collectionName = acctName + '-SettingsObject'
    const dynamicSetObjCollectionName = mongoose.model(
        'SettingsObject',
        SettingsObjectSchema,
        collectionName
    )
    const settingsObject = new dynamicSetObjCollectionName({
        acctName: req.body._acctName,
        settingsDate: req.body._settingsDate,
        settingsDateReadable: req.body._settingsDateReadable,
        keyDriverSettings: req.body._keyDriverSettings,
        kpiSettings: req.body._kpiSettings
    })
    try{
    const savedSettingsObject = await settingsObject.save()
    res.json(savedSettingsObject)
    }catch{
        err => res.json({message: err})
    }
})

export { router as settingsObjectsRoute }