const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');


async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        // console.table(data.prophets);
        displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
    } catch (error) {
        console.error(error);
    }
}
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        const card = document.createElement('section');
        const fullName = document.createElement('h2'); // fill in the blank
        const portrait = document.createElement('img');
        const birthday = document.createElement("p");
        const birthPlace = document.createElement("p");

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        birthday.textContent = `Birthday: ${prophet.birthdate}`;
        birthPlace.textContent = `Birth Place: ${prophet.birthplace}`


        // Append the section(card) with the created elements
        card.appendChild(fullName); // fill in the blank
        card.appendChild(portrait);

        card.appendChild(birthday);
        card.appendChild(birthPlace);

        cards.appendChild(card);
    }); // end of arrow function and forEach loop
}



getProphetData();