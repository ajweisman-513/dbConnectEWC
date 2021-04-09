import express from 'express'
import mongoose from "mongoose"

const router = express.Router()

const SettingsObjectSchema = mongoose.Schema({
    acctName: String,
    settingsDate: Number,
    settingsDateReadable: String,
    keyDriverSettings: Array,
    kpiSettings: Array
})


// GET LATEST SETTINGS OBJECT
router.get('/', async (req,res) => {
    console.log(req.body)
    let acctName = req.body.data.acctName
    const collectionName = acctName + '-SettingsObject'
    const dynamicSetObjCollectionName = mongoose.model(
        'SettingsObject',
        SettingsObjectSchema,
        collectionName
    )
    try{        
        const settingsObjects = await dynamicSetObjCollectionName.find()
        console.log("the returning settingsObjects", settingsObjects)
        res.json(settingsObjects)
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

// SPECIFIC SETTINGSOBJECT
router.get('/:postId')


export { router as settingsObjectsRoute }