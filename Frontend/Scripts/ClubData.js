window.addEventListener('DOMContentLoaded', (event) => {
    fetchClubData();
});

function fetchClubData() {
    fetch('https://nodejs.mizzou101.com/api/data/ClubSport')
        .then(response => response.json())
        .then(data => {
            populateTopSpots(data);
            populateAllClubs(data);
        })
        .catch(error => {
            console.error('Error fetching Clubs and Sports data:', error);
        });
}

function populateTopSpots(data) {
    const sortedData = [...data].sort((a, b) => a.Rank - b.Rank); // Sort by rank
    const topSpots = sortedData.slice(0, 3); // Get top 3 spots
    const listingContainer = document.getElementById('top-spots-listing');
    listingContainer.innerHTML = '';
    
    topSpots.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <a href="ClubDetailPage.html?id=${item._id}">
                
                <p>${item.Name}</p>
            </a>
        `;
        listingContainer.appendChild(itemDiv);
    });
}

function populateAllClubs(data) {
    const listingContainer = document.getElementById('all-clubs-listing');
    listingContainer.innerHTML = '';
    
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <a href="ClubDetailPage.html?id=${item._id}">
                
                <p>${item.Name}</p>
            </a>
        `;
        listingContainer.appendChild(itemDiv);
    });
}
