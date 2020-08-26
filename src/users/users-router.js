/* eslint-disable indent */
const express = require('express')
const path = require('path')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {

        const { password, user_name, full_name, nickname } = req.body

        for (const field of ['user_name', 'password', 'full_name'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })

        const passwordError = UsersService.validatePassword(password)
        if (passwordError)
            return res.status(400).json({ error: passwordError })

        UsersService.hasUserWithUserName(
            req.app.get('db'),
            user_name
        )
            .then(hasUserWithUserName => {
                if(hasUserWithUserName)
                    return res.status(400).json({ error: `Username already taken`})

                // cheeky pass... without actually querying the db
                res .status(201)
                    .location(path.posix.join(req.originalUrl, `/whatever`))
                    .json({
                        id: 'whatever',
                        user_name,
                        full_name,
                        nickname: nickname || '',
                        date_created: Date.now(),
                    })

            })
            .catch(next)
    })

module.exports = usersRouter