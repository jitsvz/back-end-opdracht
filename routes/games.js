const express = require('express')

const router = express.Router()
// const jsonServer = require('json-server')
// const jsonDB = jsonServer.router('db.json')

const db = require('./../db.json')

router.get('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    let game = db.games.find(g => g.id == id)
    let responseCode = 404
    if(games){
        responseCode = 200
    } else {
        game = {}
    }
    res.status(responseCode).json(game)
});

router.delete('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const index = db.games.findIndex( g => g.id == id)
    let deleteGame = {}
    let responseCode = 404
    if(index > -1){
        deleteGame = db.games.splice(index, 1)[0]
        responseCode = 200
    }
    res.status(responseCode).json(games)
});

router.put('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const game = req.body
    let responseCode = 200
    const index = db.games.findIndex( g => g.id == id)
    if(index > -1){
        db.games.splice(index,1)
    }
    game.id = id
    db.games.push(game)
    res.status(responseCode).json(games)
});

router.patch('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const game = req.body
    const index = db.games.findIndex( G => G.id == id)
    let foundGame ={}
    let responsecode = 404
    if(index > -1) {
        foundGame = db.games.splice(index, 1)[0]
        foundGame = {...foundGame,...game}
        db.games.push(foundGame)
        responseCode = 200
    }
    res.status(responseCode).json(foundGame)
});

router.get('/games', (req, res, next) => {
    let games = []
    let responseCode = 200

    if(req.query.price){
        const filterFor = parseFloat(req.query.price)
        let responseCode = 200
        games = db.games.filter( g => g.price <= filterFor ) || {}
    } else {
        let responseCode = 404
        games = db.games
    }   
    res.status(responseCode).json(games)
});

router.post('/games', (req, res, next) => {
    const game = req.body
    const games = db.games
    db.games.push(game)
    let responseCode = 200

    res.status(responseCode).json(games)
})

module.exports = router