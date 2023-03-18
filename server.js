const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')

const db = require('./db.json')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//ROUTES
//RESTFul API

app.get('/games', (req, res, next) => {
    const games = db.games
    res.type('json')
    res.send(JSON.stringify(games));
    // res.json(games)
});

app.post('/games', (req, res, next) => {
    const game = req.body
    db.games.push(game)
    res.send(JSON.stringify(game))
})

app.use('/home', (req, res, next) => {
    res.send('<form action="/games" method="POST"><input type="input" name="name"><input type="input" name="category"><input type="input" name="price"><button type="submit">voeg spel toe!</button></form>');
});

const server = http.createServer(app);

server.listen(3003);