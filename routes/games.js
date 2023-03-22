const express = require('express')

const router = express.Router()
// const jsonServer = require('json-server')
// const jsonDB = jsonServer.router('db.json')

const db = require('./../db.json')

router.get('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    let game = db.games.find(g => g.id == id)
    let responseCode = 404
    if (games) {
        responseCode = 200
    } else {
        game = {}
    }
    res.status(responseCode).json(game)
});

router.delete('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const index = db.games.findIndex(g => g.id == id)
    let deleteGame = {}
    let responseCode = 404
    if (index > -1) {
        deleteGame = db.games.splice(index, 1)[0]
        responseCode = 200
    }
    res.status(responseCode).json(games)
});

router.put('/games/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const game = req.body
    let responseCode = 200
    const index = db.games.findIndex(g => g.id == id)
    if (index > -1) {
        db.games.splice(index, 1)
    }
    game.id = id
    db.games.push(game)
    res.status(responseCode).json(games)
});

router.get('/games', (req, res, next) => {
    games = db.games
    let responseCode = 200
    res.status(responseCode).json(games)
});

router.post('/games', (req, res, next) => {
    const game = req.body;

    // Find the highest existing ID
    let maxId = 0;
    db.games.forEach((g) => {
      if (g.id > maxId) {
        maxId = g.id;
      }
    });
  
    // Generate a new unique ID
    const newId = maxId + 1;
    while (db.games.find((g) => g.id === newId)) {
      newId++;
    }
  
    // Add the new game with the generated ID
    game.id = newId;
    db.games.push(game);
  
    let responseCode = 200;
    res.status(responseCode).json(db.games);
})

module.exports = router