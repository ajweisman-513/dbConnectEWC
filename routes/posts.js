import express from 'express'
import SmarterObject from '../models/SmarterObjects.js'

const router = express.Router()

// GET ALL SMARTEROBJECTS
router.get('/', async (req,res) => {
    console.log('get started', req.params)
    try{
        const smarterObjects = await SmarterObject.find()
        res.json(smarterObjects)
    }catch{
        err => res.json({message: err})
    }
})

// POST NEW SMARTEROBJECT
router.post('/', async (req, res) => {
    console.log(req.body)
    const smarterObject = new SmarterObject({
        name: req.body.name,
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


export { router as postsRoute }