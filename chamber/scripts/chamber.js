//navigation
const navButton = document.querySelector("#nav-button");
const navigation = document.querySelector("#primary-navigation");

if (navButton && navigation) {
  navButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    navButton.classList.toggle("show", isOpen);
    navButton.setAttribute("aria-expanded", String(isOpen));
    navButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });
}

// Display the current year
const currentYearElement = document.getElementById('current-year');
currentYearElement.textContent = new Date().getFullYear();

// Display the last modified date
const lastModifiedElement = document.getElementById('last-modified');
lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

// Fetch business data from json
async function getBusinessData() {
  try {
    const response = await fetch('data/members.json');
    const businessData = await response.json();
    return businessData;
  } catch (error) {
    console.error('Error fetching business data:', error);
  }
}

//Display businesses in grid view
function renderBusinessesGrid(data) {
  const businessContainer = document.getElementById('business-container');
  businessContainer.innerHTML = '';
  businessContainer.className = 'business-grid';

  data.forEach(business => {
    const card = document.createElement('div');
    card.className = 'business-card';
    card.innerHTML = `
      <div class="business-card-header">
        <h3>${business.name}</h3>
        <p class="tagline">${business.tagline}</p>
      </div>
      <div class="business-card-content">
        <img src="${business.image}" alt="Logo" class="business-card-image">
        <div class="business-card-info">
          <p>Email: ${business.email}</p>
          <p>Phone: ${business.phone}</p>
          <p>URL: <a href="#">${business.url}</a></p>
        </div>
      </div>
    `;
    businessContainer.appendChild(card);
  });
}

// Render businesses in list view
function renderBusinessesList(data) {
  const businessContainer = document.getElementById('business-container');
  businessContainer.innerHTML = '';
  businessContainer.className = 'business-list';

  data.forEach(business => {
    const card = document.createElement('div');
    card.className = 'business-card';
    card.innerHTML = `
      <div class="business-card-header">
        <h3>${business.name}</h3>
        <p class="tagline">${business.tagline}</p>
      </div>
      <div class="business-card-content">
        <img src="${business.image}" alt="Logo" class="business-card-image">
        <div class="business-card-info">
          <p>Email: ${business.email}</p>
          <p>Phone: ${business.phone}</p>
          <p>URL: <a href="#">${business.url}</a></p>
        </div>
      </div>
    `;
    businessContainer.appendChild(card);
  });
}


// my Main function to initialize directory and homepage
async function main() {
  const gridButton = document.getElementById('grid-btn');
  const listButton = document.getElementById('list-btn');
  const businessContainer = document.getElementById('business-container');
  const spotlightContainer = document.getElementById('spotlights');

  try {
    // Fetch business data
    const businessData = await getBusinessData();

    if (!businessData) {
      return;
    }

    // DIRECTORY PAGE
    if (gridButton && listButton && businessContainer) {
      gridButton.addEventListener('click', () => renderBusinessesGrid(businessData));
      listButton.addEventListener('click', () => renderBusinessesList(businessData));

      // Display grid
      renderBusinessesGrid(businessData);
    }

    // HOMEPAGE SPOTLIGHTS
    if (spotlightContainer) {
      displaySpotlights(businessData);
    }

  } catch (error) {
    console.error('Error initializing the page:', error);
  }
}

main();


// HOME PAGE JS


// SELECT HTML ELEMENTS
const myCity = document.querySelector('#city');
const weatherIconContainer = document.querySelector('#weather-icon-container');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const forecastElement = document.querySelector('#forecast');

// API DETAILS
const myKey = "2e3f2a6b28ea0fbe38e326f07e8fdf07";
const myLat = "-18.975170626022003";
const myLong = "32.66731210779005";

// CURRENT WEATHER URL
const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// FORECAST URL
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// FETCH CURRENT WEATHER
async function apiFetch() {
  try {
    const response = await fetch(myUrl);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log("Current weather error:", error);
  }
}

// DISPLAY CURRENT WEATHER
function displayResults(data) {
  myCity.textContent = data.name;
  description.textContent = data.weather[0].description;
  temperature.innerHTML = `${data.main.temp}&deg;F`;

  // Get weather icon URL
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Create weather image dynamically
  const weatherIcon = document.createElement('img');
  weatherIcon.src = iconsrc;
  weatherIcon.alt = data.weather[0].description;

  // Clear previous icon and display new icon
  weatherIconContainer.innerHTML = "";
  weatherIconContainer.appendChild(weatherIcon);
}

// FETCH FORECAST
async function forecastFetch() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const forecastData = await response.json();
      displayForecast(forecastData);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log("Forecast error:", error);
  }
}

// DISPLAY THREE-DAY FORECAST
function displayForecast(forecastData) {
  forecastElement.innerHTML = "";
  const forecastList = forecastData.list;

  // Get the next three dates, including today
  const dates = [...new Set(
    forecastList.map(item => item.dt_txt.split(" ")[0])
  )].slice(0, 3);

  dates.forEach(date => {
    // Find the forecast
    const dailyForecast = forecastList
      .filter(item => item.dt_txt.startsWith(date))
      .reduce((closest, item) => {
        const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
        if (!closest) return item;

        const closestHour = Number(
          closest.dt_txt.split(" ")[1].slice(0, 2)
        );

        return Math.abs(hour - 12) <
          Math.abs(closestHour - 12) ? item : closest;
      }, null);

    if (dailyForecast) {
      const card = document.createElement('div');
      card.classList.add('forecast-card');

      const day = document.createElement('h3');
      day.textContent = new Date(`${date}T12:00:00`).toLocaleDateString(
        'en-US',
        { weekday: 'long' }
      );

      const icon = document.createElement('img');
      icon.src = `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png`;
      icon.alt = dailyForecast.weather[0].description;

      const temp = document.createElement('p');
      temp.innerHTML = `${dailyForecast.main.temp}&deg;F`;

      const weather = document.createElement('p');
      weather.textContent = dailyForecast.weather[0].description;

      card.append(day, icon, temp, weather);
      forecastElement.appendChild(card);
    }
  });
}


// DISPLAY SPOTLIGHTS
function displaySpotlights(businessData) {
  const spotlightContainer = document.querySelector("#spotlights");

  // Stop if the container does not exist
  if (!spotlightContainer) {
    return;
  }

  // Filter Gold and Silver members
  const eligibleMembers = businessData.filter(member =>
    ["gold", "silver"].includes(
      member.membershipLevel.toLowerCase()
    )
  );

  // Shuffle members randomly
  const shuffledMembers = eligibleMembers.sort(
    () => Math.random() - 0.5
  );

  // Select two or three members
  const numberToShow = Math.min(
    shuffledMembers.length,
    Math.floor(Math.random() * 2) + 2
  );

  const selectedMembers = shuffledMembers.slice(0, numberToShow);

  // Clear the spotlight container
  spotlightContainer.innerHTML = "";

  // Create spotlight cards
  selectedMembers.forEach(member => {

    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p>Website: <a href="https://${member.url}" target="_blank">${member.url}</a></p>
            <p>Membership: ${member.membershipLevel}</p>
        `;

    spotlightContainer.appendChild(card);
  });
}


// Start the process
apiFetch();
forecastFetch();