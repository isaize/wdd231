const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
}
// The displayProphets function handles the array of prophets
const displayProphets = (prophets) => {
    // Loop through each prophet in the array
    prophets.forEach((prophet) => {
        // Build a card for each prophet
        const card = document.createElement('div');
        card.className = 'prophet-card';
        card.innerHTML = `
        <h2>${prophet.name}</h2>
        <p>${prophet.title}</p>
        <p>${prophet.yearsActive}</p>
      `;
        document.body.appendChild(card); // Append the card to the body or a specific container
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.firstname} ${prophet.lastname}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the section(card) with the created elements
        card.appendChild(fullName); // fill in the blank
        card.appendChild(portrait);

        cards.appendChild(card);
    
    });
  };

getProphetData();