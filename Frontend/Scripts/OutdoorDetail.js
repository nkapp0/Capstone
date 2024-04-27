document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('id');
    fetch(`https://nodejs.mizzou101.com/api/data/Outdoors/${placeId}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('placeName').textContent = data.Name;
        document.getElementById('placeLink').href = data.Website;
        document.getElementById('placeLink').textContent = 'Visit Website';
        document.getElementById('placeTags').textContent = `Tags: ${data.Tag}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});