const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const restaurantAll = require('./models/restaurant')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const MY_ENV = process.env.MY_ENV
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(MY_ENV, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  restaurantAll.find().lean()
    .then(restaurants =>
      res.render('index', { restaurants: restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurant/New', (req, res) => {
  res.render('new')
})

app.post('/restaurant', (req, res) => {
  const reqbody = req.body
  return restaurantAll.create({
    name: `${req.body.name}`,
    name_en: `${req.body.name_en}`,
    category: `${req.body.category}`,
    image: `${req.body.image}`,
    location: `${req.body.location}`,
    phone: `${req.body.phone}`,
    google_map: `${req.body.google_map}`,
    rating: `${req.body.rating}`,
    description: `${req.body.description}`
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})


//餐廳介紹
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params)

  restaurantOne = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurantOne })
})
//搜尋
app.get('/search', (req, res) => {
  console.log(req.query)
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    if (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurant
    } else if (restaurant.category.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurant
    }
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(3000, () =>
  console.log('http://localhost:3000')
)