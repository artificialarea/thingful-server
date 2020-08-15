/* eslint-disable indent */

// TODO: INVESTIGATE WHY MY VERSION DOESN'T WORK.
// SULTANA VERSION BELOW DOES
// it's a spelling error somewhere...

const express = require('express')
const path = require('path')
const ReviewsService = require('./reviews-service')
const { requireAuth } = require('../middleware/basic-auth')

const reviewsRouter = express.Router()
const jsonBodyParser = express.json()

reviewsRouter
    .route('/')
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { thing_id, rating, text } = req.body
        const newReview = { thing_id, rating, text }

        for (const [key, value] of Object.entries(newReview))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        // console.log(req.user_id);
        newReview.user_id = req.user_id

        ReviewsService.insertReview(
            req.app.get('db'),
            newReview
        )
            .then(review => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${review.id}`))
                    .json(ReviewsService.serializeReview(review))
            })
            .catch(next)
    })

module.exports = reviewsRouter


// SULTANA VERSION WORKS /////////////////////////////////////////
const express = require('express')
const path = require('path')
const ReviewsService = require('./reviews-service')
const reviewsRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/basic-auth')

reviewsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { thing_id, rating, text } = req.body
    //const { thing_id, rating, text, user_id } = req.body
    //const newReview = { thing_id, rating, text, user_id }
    const newReview = { thing_id, rating, text }

    for (const [key, value] of Object.entries(newReview))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
    newReview.user_id = req.user.id
      
    ReviewsService.insertReview(
      req.app.get('db'),
      newReview
    )
      .then(review => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(ReviewsService.serializeReview(review))
      })
      .catch(next)
  })

module.exports = reviewsRouter
