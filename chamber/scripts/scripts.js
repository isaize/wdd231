// scripts.js
async function fetchMembers() {
    const response = await fetch('scripts/data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const memberCardsContainer = document.getElementById('member-cards');
    memberCardsContainer.innerHTML = '';
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" />
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        memberCardsContainer.appendChild(card);
    });
}

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

fetchMembers();