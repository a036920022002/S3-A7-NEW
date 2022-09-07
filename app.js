const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const restaurantAll = require('./models/restaurant')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
app.use(express.static('public'))

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
//render 首頁
app.get('/restaurant/New', (req, res) => {
  res.render('new')
})

//新增資料
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
  const id = req.params.restaurant_id
  return restaurantAll.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//修改
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantAll.findById(id)
    .lean()
    .then(restaurants => {
      res.render('edit', { restaurants })
    })
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const name = req.body.name
  const name_en = req.body.name_en
  const location = req.body.location
  const category = req.body.category
  const image = req.body.image
  const phone = req.body.phone
  const google_map = req.body.google_map
  const description = req.body.description
  const rating = req.body.rating
  console.log('req.body.name', name)
  console.log('req.params.restaurant_id', id)
  console.log('reqBody', req.body)
  console.log('------------')
  return restaurantAll.findById(id)
    .then(restaurant => {
      console.log(restaurant)
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.location = location
      restaurant.category = category
      restaurant.image = image
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.description = description
      restaurant.rating = rating
      console.log(restaurant)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})

//刪除餐廳
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  console.log(id)
  return restaurantAll.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
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