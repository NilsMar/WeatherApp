/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let temperature = document.getElementById('temp')
let description = document.getElementById('content')

let date = document.getElementById('date')

let zipCode = document.getElementById('zip')
let feelingsIn = document.getElementById('feelings')
// Personal API Key for OpenWeatherMap API
const apiKey = 'b6f5e1f2acfbe8e8bf0fefddb856c917'
const name = 'Default'

generate.addEventListener('click',getAPI)

function getAPI() {
	const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='+zipCode.value+',us&appid='+apiKey
fetch(baseURL)
	.then (response => response.json())
	.then (data => {
	let temperatureValue = data['main']['temp']
	temperature.innerHTML = temperatureValue

})
.catch(err => alert(error))
}