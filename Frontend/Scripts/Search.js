


function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;

    if (searchTerm.length < 3) { // Optional: Trigger search only when at least 3 characters are typed
        return; // Optionally clear the search results or display a message
    }

    fetch(`https://nodejs.mizzou101.com/api/search?query=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            updateSearchResults(data);
        })
        .catch(error => console.error('Error searching:', error));
}

function updateSearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-result-item';
        resultDiv.innerHTML = `
            <img src="${item.Photo}" alt="${item.Name}" class="search-result-img">
            <div>
                <h4>${item.Name}</h4>
                <p>${item.Description}</p>
                <a href="${item.Link}">Learn more</a>
            </div>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

