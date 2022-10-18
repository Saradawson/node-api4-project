require('dotenv').config()

const express = require('express')
const cors = require('cors')

const server = express()

const PORT = process.env.PORT || 9000


server.use(express.json())
server.use(cors())

const users = [
    {
       id: 1,
       username: 'Johnathan' 
    },
    {
        id: 2,
        username: 'Samantha'
    }
]

server.get('/api/users', (req, res) => {
    res.json(users);
})

server.post('/api/register', (req, res) => {
    const newUser = {
        id: users.length+1,
        username: req.body.username
    }
    if(req.body.username && req.body.password){
        users.push(newUser)
        res.status(201).json(newUser)
    }else{
        res.status(400).json({
            message: 'username and password required'
        })
    }
})

server.post('/api/login', (req, res) => {
    if(req.body.username && req.body.password){
        res.json({
            message: 'Welcome to node app'
        })
    }else{
        res.status(400).json({
            message: 'username and password required'
        })
    }
})

server.use((error, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})