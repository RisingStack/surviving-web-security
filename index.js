const express = require('express')
const session = require('express-session')
const exphbs  = require('express-handlebars')
const csrf = require('csurf')
const helmet = require('helmet')

const app = express()

// security headers
app.use(helmet())
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/', function (req, res) {
  res.render('home')
})

app.listen(3000)
