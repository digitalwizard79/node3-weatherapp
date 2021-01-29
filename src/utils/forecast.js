const request = require('request')

const forecast = (latitude, longitude, callback) => {
    let url = "http://api.weatherstack.com/current?access_key=46e93de0857ba7b01934019150b577c7&query=" + latitude + ", " + longitude + "&units=f";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weatherstack API!")
        } else {
            if (body.error) {
                callback("Error: " + body.error.info)
            } else {
                callback(undefined, body)
            }
        }        
    })
}

module.exports = forecast