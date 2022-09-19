const express = require('express')
const restaurant = require('../../models/restaurant.js')
const router = express.Router()

const restaurantAll = require('../../models/restaurant.js')

router.get('/', (req, res) => {
  restaurantAll.find()
    .lean()
    .sort({ _id: "asc" })
    .then(restaurants =>
      res.render('index', { restaurants: restaurants }))
    .catch(error => console.error(error))
})

//搜尋
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  restaurantAll.find()
    .lean()
    .then(restaurantList => {
      const searchrestaurant = restaurantList.filter(restaurants => {
        if (restaurants.name.toLowerCase().includes(keyword) || restaurants.category.toLowerCase().includes(keyword)) {
          return true;
        }
      })
      res.render('index', { restaurants: searchrestaurant, keyword: keyword })
    })
    .catch(error => console.error(error))

})

module.exports = router
