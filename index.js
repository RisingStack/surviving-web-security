const express = require('express')
const session = require('express-session')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const csrf = require('csurf')
const helmet = require('helmet')
const bcrypt = require('bcrypt')

const app = express()

const user = {
  name: 'test',
  password: '$2a$10$zN76Rq7SfIcGq0lAvTAww.cSBXF2y4dxbJHMmubs7VWKhA48301wW'
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

// security headers
app.use(helmet())

// render engine: handlebars
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  // fixed time comparison
  bcrypt.compare(password, user.password, (err, res) => {
    if (err) {
      return next (err)
    }

    // the passwords don't match
    if (!res) {
      return res.sendStatus(401)
    }

    // set cookies..., etc...
    res.send('match!')
  })
})

app.listen(3000)
