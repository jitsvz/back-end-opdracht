const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db.json')
const path = require('path')
const rootDir = require('./utils/rootDir')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

//ROUTES
const router = express.Router();

//RESTFul API
router.get('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const games = db.games.find( g => g.id == id) || {}
    res.json(games)
});

router.delete('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const index = db.games.findIndex( g => g.id == id)
    let deleteGame = {}
    if(index > -1){
        deleteGame = db.games.splice(index, 1)
    }
    res.json(deleteGame)
});

//not safe yet, work on it
router.put('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const game = req.body

    const index = db.games.findIndex( g => g.id == id)
    if(index > -1){
        db.games.splice(index,1)
    }
    game.id = id
    db.games.push(game)
    res.json(games)
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
    res.status(responsecode).json(foundGame)
});

router.get('/games', (req, res, next) => {
    let games = []
    if(req.query.price){
        const filterFor = parseFloat(req.query.price)
        games = db.games.filter( g => g.price <= filterFor ) || {}
    } else {
        games = db.games
    }   
    res.json(games)
});

router.post('/games', (req, res, next) => {
    const game = req.body
    db.games.push(game)
    res.send(JSON.stringify(game))
})

router.put('/games', (req, res, next) => {
    const game = req.body
    db.games.push(game)
    res.send(JSON.stringify(game))
})

app.use(router)

app.use('/home', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-game.html'))
        });

// const server = http.createServer(app);

app.listen(3003);