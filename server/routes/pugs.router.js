const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async(req,res,next) => {
    try {
    let pugs = await Pug.findAll()
    res.send(pugs)
    } catch(err) {
        next(err)
    }
})

router.post('/', async(req,res,next) => {
    try {
    let pug = await Pug.create(req.body)
    res.status(201).send(pug)
    } catch(err) {
        next(err)
    }
})

router.get('/favoriteCoffee/:favoriteCoffeeName', async(req,res,next)=>{
    try {
        let pugs = await Pug.findByCoffee(req.params.favoriteCoffeeName)
        res.send(pugs)
    } catch(err) {
        next(err)
    }
})

router.get('/:pugId', async(req,res,next)=>{
    try {
        let pug = await Pug.findOne({
            where: {
                id: req.params.pugId
            }
        })
        if (pug === null) {
            res.status(404).send("Not Found")
        } else {
            res.send(pug)
        }
    } catch(err) {
        next(err)
    }
})

router.put('/:pugId', async(req,res,next)=>{
    try {
        let pug = await Pug.findOne({
            where: {
                id: req.params.pugId
            }
        })
        let [updatedRowCount, updatedPugs] = await Pug.update(req.body,{
            where: {id: req.params.pugId},
            returning: true
        })
        if (pug === null) {
            res.status(404).send("Not Found")
        } else {
            res.send(updatedPugs[0])
        }
    } catch(err) {
        next(err)
    }
})

router.delete('/:pugId', async(req,res,next)=>{
    try {
        let pug = await Pug.findOne({
            where: {
                id: req.params.pugId
            }
        })
        await Pug.destroy({
            where: {
                id: req.params.pugId
            }
        })
        if (pug === null) {
            res.status(404).send("Not Found")
        } else {
            res.status(204).send()
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router
