const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const csrf = require('csurf')
const helmet = require('helmet')
const bcrypt = require('bcrypt')

const csrfProtection = csrf({
  cookie: true
})
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

// parse cookies
app.use(cookieParser())

// security headers
app.use(helmet())

// render engine: handlebars
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/', csrfProtection, (req, res) => {
  res.render('home', {
    csrfToken: req.csrfToken()
  })
})

app.post('/login', csrfProtection, (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  // fixed time comparison
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return next (err)
    }

    // the passwords don't match
    if (!result) {
      return res.sendStatus(401)
    }

    // set cookies..., etc...
    res.send('match!')
  })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.sendStatus(500)
})

app.listen(3000)
