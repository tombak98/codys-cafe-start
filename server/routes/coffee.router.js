const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get('/', async(req,res,next) => {
    try {
    let coffees = await Coffee.findAll()
    res.send(coffees)
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req,res,next) => {
    try {
        let coffee = await Coffee.create({
            name: req.body.name
        })
        res.status(201).send(coffee)  
    } catch(error) {
        next(error)
    }
})

router.get('/ingredients/:ingredientName', async(req,res,next) => {
    try {
        let coffees = await Coffee.findByIngredient(req.params.ingredientName)
        res.send(coffees)
    } catch (error) {
        next(error)
    }
})

router.get('/:coffeeId', async(req,res,next) => {
    try {
        let coffee = await Coffee.findOne({
            where: {
                id: req.params.coffeeId
            }
        })
        if (coffee === null) {
            res.status(404).send("Not Found")
        } else {
            res.send(coffee)
        }
    } catch(error) {
        next(error)
    }
})




module.exports = router
