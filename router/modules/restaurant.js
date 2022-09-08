const express = require('express')
const router = express.Router()

const restaurantAll = require('../../models/restaurant.js')


router.get('/New', (req, res) => {
  res.render('new')
})

//新增資料
router.post('/', (req, res) => {
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
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantAll.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//修改
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantAll.findById(id)
    .lean()
    .then(restaurants => {
      res.render('edit', { restaurants })
    })
    .catch(error => console.log(error))
})

router.post('/:restaurant_id', (req, res) => {
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
router.post('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  console.log(id)
  return restaurantAll.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

//搜尋
router.get('/search', (req, res) => {
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

module.exports = router