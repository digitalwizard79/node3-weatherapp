
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p_loading = document.querySelector('#loading')
const p_location = document.querySelector('#location')

const img_weatherImg    = document.querySelector('#weatherImg')
const s_descr           = document.querySelector('#description')
const s_temperature     = document.querySelector('#temperature')
const tempLable         = document.querySelector('#tempLabel')
const s_windSpeed       = document.querySelector('#wind_speed')
const windLabel         = document.querySelector('#windLabel')
const s_precipitation   = document.querySelector('#precipitation')
const precipLabel       = document.querySelector('#precipLabel')
const p_error           = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#weatherData').style = "display: none"

    const location = search.value
    p_loading.textContent = "Loading..."
    fetch('/weather?address=' + location)
    .then((response) => {
        response.json().then((data) => {
            p_loading.textContent = "";
            if (data.error) {
                p_error.textContent = data.error
            } else {        
                document.querySelector('#weatherData').style = "display: block"
                img_weatherImg.setAttribute('src', data.forecastData.current.weather_icons[0])

                const { temperature, weather_descriptions, wind_speed, wind_dir, precip, feelslike } = data.forecastData.current

                s_descr.textContent = weather_descriptions[0]
                p_location.textContent = data.location
                tempLabel.textContent = "Temperature: "
                s_temperature.textContent =  temperature + " degrees";
                precipLabel.textContent = "Precipitation: "
                s_precipitation.textContent = precip + "%";
                windLabel.textContent = "Wind Speed: "
                s_windSpeed.textContent = wind_speed + " MPH from the " + wind_dir
                
            }
        })
    })    
})