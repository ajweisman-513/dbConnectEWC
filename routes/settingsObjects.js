import express from 'express'
import SettingsObject from '../models/SettingsObjects.js'

const router = express.Router()

// GET LATEST SETTINGS OBJECT
router.get('/', async (req,res) => {
    console.log('get settings', req.params)
    try{
        const settingsObjects = await SettingsObject.find()
        res.json(settingsObjects.slice(-1)[0] )
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW SETTINGSOBJECT
router.post('/', async (req, res) => {
    console.log(req.body)
    const settingsObject = new SettingsObject({
        acctName: req.body._acctName,
        settingsDate: req.body._settingsDate,
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