const express = require('express')
const bodyParser = require('body-parser')

const gameRoutes = require('./routes/games')

const jsonServer = require('json-server')
const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


// app.use(middlewares)
const path = require('path')
const rootDir = require('./utils/rootDir')

app.use(middlewares)


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

//ROUTES
app.use('/api/', gameRoutes)




app.use('/home', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-game.html'))
        });

app.use(router) // json-server

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3003);