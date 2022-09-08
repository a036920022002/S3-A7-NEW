const express = require('express')
require('./config/mongoose')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const router = require('./router/index')
const methodOverride = require('method-override')

app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(router)


app.listen(3000, () =>
  console.log('http://localhost:3000')
)