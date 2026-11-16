const myCity = document.querySelector('#city');
const weatherIcon = document.querySelector('#weather-icon');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description')

//CREATE REQUIRED VARIABLES FOR THE URL
const myKey = "2e3f2a6b28ea0fbe38e326f07e8fdf07"
const myLat = "49.77245363600543"
const myLong = "6.639831653306763"

// construct a full path using template literals

const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

// TRY TO GRAB THE CURRENT WEATHER DATA
async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);

        }
        else {
            throw Error(await response.text());
        }


    } catch (error) {
        console.log(error);
    }
}
//DISPLAY THE JASON DATA ON TO THE WEB PAGE 
function displayResults(data) {
    console.log('Hello');
    myCity.innerHTML = data.name
    description.innerHTML = data.weather[0].description
    temperature.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
}

// start the process
apiFetch();