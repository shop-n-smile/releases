// Release data management
let releasesData = null;

// Load releases data
async function loadReleases() {
    try {
        const response = await fetch('releases.json');
        if (!response.ok) {
            throw new Error('Failed to load releases');
        }
        releasesData = await response.json();
        
        // Initialize page based on current location
        const path = window.location.pathname;
        if (path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('releases/')) {
            initHomePage();
        } else if (path.includes('android')) {
            initAndroidPage();
        } else if (path.includes('windows')) {
            initWindowsPage();
        }
    } catch (error) {
        console.error('Error loading releases:', error);
        // Fallback to mock data for demonstration
        releasesData = getMockReleases();
        initializePage();
    }
}

// Initialize home page
function initHomePage() {
    if (!releasesData) return;
    
    const latestAndroid = releasesData.android[0];
    const latestWindows = releasesData.windows[0];
    
    const latestVersion = document.getElementById('latest-version');
    if (latestVersion && latestAndroid) {
        latestVersion.textContent = latestAndroid.version;
    }
    
    // Update download links with latest versions
    const androidBtn = document.querySelector('.btn-android');
    const windowsBtn = document.querySelector('.btn-windows');
    
    if (androidBtn && latestAndroid) {
        androidBtn.href = latestAndroid.downloadUrl;
    }
    
    if (windowsBtn && latestWindows) {
        windowsBtn.href = latestWindows.downloadUrl;
    }
}

// Initialize Android page
function initAndroidPage() {
    if (!releasesData || !releasesData.android) return;
    
    const releases = releasesData.android;
    const latestRelease = releases[0];
    
    // Update latest release card
    const latestCard = document.getElementById('android-latest');
    if (latestCard && latestRelease) {
        updateReleaseCard(latestCard, latestRelease, true);
    }
    
    // Populate previous releases
    const previousContainer = document.getElementById('android-releases');
    if (previousContainer && releases.length > 1) {
        releases.slice(1).forEach(release => {
            const card = createReleaseCard(release, false, 'android');
            previousContainer.appendChild(card);
        });
    }
}

// Initialize Windows page
function initWindowsPage() {
    if (!releasesData || !releasesData.windows) return;
    
    const releases = releasesData.windows;
    const latestRelease = releases[0];
    
    // Update latest release card
    const latestCard = document.getElementById('windows-latest');
    if (latestCard && latestRelease) {
        updateReleaseCard(latestCard, latestRelease, true);
    }
    
    // Populate previous releases
    const previousContainer = document.getElementById('windows-releases');
    if (previousContainer && releases.length > 1) {
        releases.slice(1).forEach(release => {
            const card = createReleaseCard(release, false, 'windows');
            previousContainer.appendChild(card);
        });
    }
}

// Update release card content
function updateReleaseCard(card, release, isLatest) {
    const platform = release.platform.toLowerCase();
    
    card.querySelector('h3').textContent = `Version ${release.version}`;
    card.querySelector('.release-date').textContent = formatDate(release.releaseDate);
    card.querySelector('.release-description').textContent = release.description || `Shop & Smile POS ${release.version} for ${release.platform}`;
    
    const sizeElement = card.querySelector('.meta-item:last-child');
    if (sizeElement) {
        sizeElement.textContent = `Size: ${release.size || 'N/A'}`;
    }
    
    const downloadBtn = card.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.href = release.downloadUrl;
        if (isLatest && platform === 'android') {
            downloadBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
                Download APK
            `;
        } else if (isLatest && platform === 'windows') {
            downloadBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
                Download Installer
            `;
        }
    }
}

// Create release card element
function createReleaseCard(release, isLatest, platform) {
    const card = document.createElement('div');
    card.className = isLatest ? 'release-card featured' : 'release-card';
    
    const badgeHtml = release.prerelease ? 
        '<span class="badge badge-beta">BETA</span>' : 
        '<span class="badge badge-stable">STABLE</span>';
    
    card.innerHTML = `
        <div class="release-header">
            <div class="release-title">
                <h3>Version ${release.version}</h3>
                ${badgeHtml}
            </div>
            <p class="release-date">${formatDate(release.releaseDate)}</p>
        </div>
        <div class="release-details">
            <p class="release-description">${release.description || `Shop & Smile POS ${release.version} for ${release.platform}`}</p>
            <div class="release-meta">
                <span class="meta-item">Platform: ${release.platform}</span>
                <span class="meta-item">Size: ${release.size || 'N/A'}</span>
            </div>
        </div>
        <div class="release-actions">
            <a href="${release.downloadUrl}" class="btn btn-${platform} btn-download" download>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
                Download Archive (ZIP)
            </a>
        </div>
    `;
    
    return card;
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Mock data for demonstration
function getMockReleases() {
    return {
        android: [
            {
                version: "1.0.0+10",
                releaseDate: "2024-10-03",
                platform: "Android",
                downloadUrl: "releases/android/latest/ShopAndSmilePOS.apk",
                size: "32MB",
                description: "Latest stable release with improved performance and bug fixes",
                prerelease: false
            }
        ],
        windows: [
            {
                version: "1.0.0+10",
                releaseDate: "2024-10-03",
                platform: "Windows",
                downloadUrl: "releases/windows/latest/ShopAndSmilePOS-Setup.exe",
                size: "45MB",
                description: "Latest stable release with improved performance and bug fixes",
                prerelease: false
            }
        ]
    };
}

// Initialize page helper
function initializePage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
        initHomePage();
    } else if (path.includes('android')) {
        initAndroidPage();
    } else if (path.includes('windows')) {
        initWindowsPage();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadReleases);