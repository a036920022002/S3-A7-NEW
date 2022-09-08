const express = require('express')
const router = express.Router()

const restaurantAll = require('../../models/restaurant.js')

router.get('/', (req, res) => {
  restaurantAll.find().lean().sort({_id:"asc"})
    .then(restaurants =>
      res.render('index', { restaurants: restaurants }))
    .catch(error => console.error(error))
})

module.exports = router
