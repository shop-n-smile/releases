// This script can be used to dynamically load releases from a JSON file
// or to add interactive functionality to the releases page

document.addEventListener('DOMContentLoaded', function() {
    // You can extend this to fetch releases from a releases.json file
    // Example:
    // fetch('releases.json')
    //     .then(response => response.json())
    //     .then(data => renderReleases(data))
    //     .catch(error => console.error('Error loading releases:', error));
    
    console.log('Shop-n-Smile Releases page loaded');
});

function renderReleases(releases) {
    const releasesList = document.getElementById('releases-list');
    releasesList.innerHTML = '';
    
    if (releases.length === 0) {
        releasesList.innerHTML = '<p class="info-text">No releases available yet.</p>';
        return;
    }
    
    releases.forEach(release => {
        const card = document.createElement('div');
        card.className = 'app-card';
        
        card.innerHTML = `
            <h3>${release.name}</h3>
            <p>Latest version: ${release.version}</p>
            <p>${release.description}</p>
            <a href="${release.downloadUrl}" class="btn" download>Download</a>
        `;
        
        releasesList.appendChild(card);
    });
}
