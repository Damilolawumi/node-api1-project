// implement your API here
const express = require('express');

const server = express();
const db = require('./data/db')

server.use(express.json())

server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ success: false, error })

        })
})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body

    db.insert(req.body)
        .then(user => {
            res.status(201).json({ success: true, user })
        })

        .catch(error => {
            res.status(500).json({ success: false, error })
        })
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, user })

            }
            else {
                res.status(404).json({ success: false, message: 'User not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ success: false, error })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({ success: true, updated })
            }
            else {
                res.status(404).json({ success: false, message: 'Cannot find user' })
            }
        })
        .catch(error => {
            res.status(500).json({ success: false, error })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(400).end()
            }
            else {
                res.status(404).json({ success: false, message: 'User not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ success: false, error })
        })
})


server.listen(process.env.PORT || 3000, () => {
    console.log('Listening on ' + (process.env.PORT || 3000))
})

