const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const basePath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(basePath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Thomas Powers'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'My About Page',
        author: 'Thomas Powers'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'My Help Page',
        author: 'Thomas Powers',
        helpText: "This is a helpful text"
    })
})

// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address: req.query.address,
                location,
                latitude,
                longitude,
                forecastData
            })            
        })
    })    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        content: 'The requested help page could not be located.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        content: 'The page could not be located.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})