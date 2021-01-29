const request = require('request')

const geocode = (search, callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(search) + ".json?access_token=pk.eyJ1IjoiZGlnaXRhbHdpemFyZCIsImEiOiJja2Y3YXA2cGowMGtqMnJwY20yeGthZmd5In0.YFRqJZIQSTW9Dw6gcwgEVQ&limit=1"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect the mapbox API")            
        } else if (body.features.length === 0) {
            callback("Error: Unable to find location: " + search + ". Please try another.")            
        } else {        
            const features  = body.features[0]
            const coords    = features.geometry.coordinates
            const latitude  = coords[1]
            const longitude = coords[0]
            let location  = ''
            if (features.context.length === 3) {
                location  = features.context[0].text + ", " + features.context[1].text + " (" + features.context[2].text + ") "
            } else {
                location  = features.context[0].text + " (" + features.context[1].text + ") "
            }
        
            const data = {
                location, latitude, longitude
            }

            callback(undefined, data)
        }
    })    
}

module.exports = geocode