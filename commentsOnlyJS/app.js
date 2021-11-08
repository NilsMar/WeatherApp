// Personal API Key for OpenWeatherMap API
const apiKey = 'b6f5e1f2acfbe8e8bf0fefddb856c917'
const name = 'Default'
const baseURL = `api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`

function performAction(e){
  getCity(baseURL)
}

const getCity = async (baseURL,animal,key)=>{
  const res = await fetch(baseURL+animal+key)
  try{
    const data = await res.json
    console.log(data)
  }
  catch(error){
    console.log(error,'error')
  }
}
console.log(performAction())
console.('hi')

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */
