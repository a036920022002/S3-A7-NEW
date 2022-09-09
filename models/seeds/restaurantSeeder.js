require('../../config/mongoose')

const restaurantList = require('./restaurant.json')
const restaurant = require('../restaurant')
const db = require('../../config/mongoose')

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