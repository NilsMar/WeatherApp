/* Global Variables */

const kelvin = 272.15
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let temperature = document.getElementById('temp')
let content = document.getElementById('content')
let date = document.getElementById('date')

let zipCode = document.getElementById('zip')
let feelingsIn = document.getElementById('feelings')
// Personal API Key for OpenWeatherMap API
const apiKey = 'b6f5e1f2acfbe8e8bf0fefddb856c917'
const name = 'Default'

// add event listener to Button to call API function

generate.addEventListener('click',getAPI)


// Function to get API data and update HTML elements

function getAPI() {
	const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='+zipCode.value+',us&appid='+apiKey
fetch(baseURL)
	.then (response => response.json())
	.then (data => {
	let temperatureValue = (data['main']['temp'] - kelvin).toFixed(1)
	let temperatureValueFeel = (data['main']['feels_like'] - kelvin).toFixed(1)
	let sky = data['weather'][0]['description']
	let city = data['name']
	temperature.innerHTML = `The temperature today in ${city} is ${temperatureValue}° celsius.
	<br>A It feels more like ${temperatureValueFeel}.
	<br> If you look up, you see ${sky}. `
	date.innerHTML = newDate
	feelings = feelingsIn.value
	content.innerHTML = feelings
	console.log(data)
	// call Post Data function
	 postData('/add', {
                temperatureValue,
                newDate,
                feelings,
                temperatureValueFeel,
                sky

})
.catch(err =>  alert('something is off'))
})
}

/* Post data Function  */
async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}