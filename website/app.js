/* Global Variables */

const kelvin = 272.15
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
let zipIn = document.getElementById('zip')
const feelingsIn = document.getElementById('feelings')
const dateHTML = document.getElementById('date')
const feelHTML = document.getElementById('content')

// Personal API Key for OpenWeatherMap API
const apiKey = 'b6f5e1f2acfbe8e8bf0fefddb856c917'
const name = 'Default'


// add event listener to Button to call API function

generate.addEventListener('click',clickEvent)

function clickEvent(){
	let feels = feelingsIn.value;
	let zipCode = zipIn.value;
	getAPI(feels,zipCode).then(() =>{
		retrieveData();
	})
}

// Function to get API data and update HTML elements

function getAPI(feelings,zip) {
	if (zip.length == 0){
		alert('enter zip code')
		return
	}
	const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&appid='+apiKey
	console.log(feelings,zip)
	return fetch(baseURL)
	.then (response => response.json())
	.then (data => {
	let temperatureValue = (data['main']['temp'] - kelvin).toFixed(1)
	let temperatureValueFeel = (data['main']['feels_like'] - kelvin).toFixed(1)
	let sky = data['weather'][0]['description']
	let city = data['name']
	let feelsNew = feelings
	console.log(data)
	 postData('/add', {
                temperatureValue,
                newDate,
                feelsNew,
                temperatureValueFeel,
                sky,
                city,


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


/* Function to GET Project Data */
async function retrieveData() {
 const request = await fetch('/return');
 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData)
 // Write updated data to DOM elements

let temp = document.getElementById('temp')
updateDOM(allData)

 }
 catch(error) {
   console.log("error", error);
 }
}

// update the DOM using the new input

function updateDOM(weatherInput){
	console.log(weatherInput)
	dateHTML.innerHTML = weatherInput.newDate
	temp.innerHTML = `The temperature today in ${weatherInput.city} is ${weatherInput.temperatureValue}° celsius.
	<br>It feels more like ${weatherInput.temperatureValueFeel}°.
	<br> If you look up, you see ${weatherInput.sky}. `
	feelHTML.innerHTML = weatherInput.feelsNew

}
