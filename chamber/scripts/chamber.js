// Hamburger menu toggle
const navButton = document.getElementById('nav-button');
const primaryNavigation = document.getElementById('primary-navigation');
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    primaryNavigation.classList.toggle('open');
});

// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// last modified date
document.getElementById('last-modified').textContent = 'Last Modified: ' + document.lastModified;

// DOM elements
const businessContainer = document.getElementById('business-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

// Fetch business data from JSON file
async function fetchBusinessData() {
    try {
        const response = await fetch('data/businesses.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching business data:', error);
    }
}

// Render businesses in grid
function renderBusinessesGrid(data) {
    businessContainer.innerHTML = '';
    businessContainer.className = 'business-grid';
    data.forEach(biz => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.innerHTML = `
      <div class="business-card-header">
        <h3>${biz.name}</h3>
        <p class="tagline">${biz.tagline}</p>
      </div>
      <div class="business-card-content">
        <div class="business-card-image">
          <img src="${biz.image}" alt="Logo">
        </div>
        <div class="business-card-info">
          <p>Email: ${biz.email}</p>
          <p>Phone: ${biz.phone}</p>
          <p>URL: <a href="#">${biz.url}</a></p>
        </div>
      </div>
    `;
        businessContainer.appendChild(card);
    });
}

// Render businesses in list
function renderBusinessesList(data) {
    businessContainer.innerHTML = '';
    businessContainer.className = 'business-list';
    data.forEach(biz => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.innerHTML = `
      <div class="business-card-header">
        <h3>${biz.name}</h3>
        <p class="tagline">${biz.tagline}</p>
      </div>
      <div class="business-card-content">
        <div class="business-card-image">
          <img src="${biz.image}" alt="Logo">
        </div>
        <div class="business-card-info">
          <p>Email: ${biz.email}</p>
          <p>Phone: ${biz.phone}</p>
          <p>URL: <a href="#">${biz.url}</a></p>
        </div>
      </div>
    `;
        businessContainer.appendChild(card);
    });
}

// Main function
async function main() {
    const data = await fetchBusinessData();
    if (data) {
        // Event listeners for toggle
        gridBtn.addEventListener('click', () => renderBusinessesGrid(data));
        listBtn.addEventListener('click', () => renderBusinessesList(data));

        // Initial render
        renderBusinessesGrid(data);
    }
}

main();
