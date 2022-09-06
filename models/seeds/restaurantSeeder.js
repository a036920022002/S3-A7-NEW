const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
require('dotenv').config()
const MY_ENV = process.env.MY_ENV

mongoose.connect(MY_ENV, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  console.log(restaurantList.results[0].name)
  for (let i = 0; i < restaurantList.results.length; i++) {
    restaurant.create(
      {
        name: `${restaurantList.results[i].name}`,
        name_en: `${restaurantList.results[i].name_en}`,
        category: `${restaurantList.results[i].category}`,
        image: `${restaurantList.results[i].image}`,
        location: `${restaurantList.results[i].location}`,
        phone: `${restaurantList.results[i].phone}`,
        google_map: `${restaurantList.results[i].google_map}`,
        rating: `${restaurantList.results[i].rating}`,
        description: `${restaurantList.results[i].description}`
      }

    )
  }

})