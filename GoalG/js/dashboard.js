// Function to handle logout
function logout() {
    // Clear any authentication tokens or user data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    
    // Show confirmation message
    alert('You have been successfully logged out.');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Function to load and display active plan
function loadActivePlan() {
    const activePlanJson = localStorage.getItem('activePlan');
    const noPlanMessage = document.getElementById('no-plan-message');
    const planDetails = document.getElementById('plan-details');
    
    if (activePlanJson) {
        const plan = JSON.parse(activePlanJson);
        
        // Check if plan is expired
        const now = new Date();
        const expiryDate = new Date(plan.expiryDate);
        
        if (expiryDate > now) {
            // Plan is active, display details
            document.getElementById('plan-type').textContent = plan.type.replace('-', ' ').toUpperCase() + ' PLAN';
            document.getElementById('purchase-date').textContent = formatDate(plan.purchaseDate);
            document.getElementById('expiry-date').textContent = formatDate(plan.expiryDate);
            
            // Format payment method
            let methodDisplay = 'Credit Card';
            if (plan.method === 'mobile') {
                methodDisplay = 'Mobile Money';
            }
            document.getElementById('payment-method').textContent = methodDisplay;
            
            // Show plan details
            planDetails.style.display = 'block';
            noPlanMessage.style.display = 'none';
        } else {
            // Plan has expired
            noPlanMessage.style.display = 'block';
            planDetails.style.display = 'none';
            localStorage.removeItem('activePlan'); // Clean up expired plan
        }
    } else {
        // No active plan
        noPlanMessage.style.display = 'block';
        planDetails.style.display = 'none';
    }
}

// Sample function to load upcoming games (would fetch from API in real implementation)
function loadUpcomingGames() {
    // This would be replaced with actual API calls to get user's games
    const hasGames = false; // Set to true when user has purchased games
    
    if (hasGames) {
        document.querySelector('.empty-state').style.display = 'none';
        document.querySelector('.games-container').style.display = 'grid';
        
        // Sample code to add games (would be dynamic in real implementation)
        const gamesContainer = document.querySelector('.games-container');
        
        // Example game card
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-date">Sun, Oct 15, 15:00</div>
            <div class="game-teams">Manchester United vs Liverpool</div>
            <div class="game-prediction">Home Win (1)</div>
            <div class="game-status">
                <span class="status-icon pending"></span>
                Pending
            </div>
        `;
        
        gamesContainer.appendChild(gameCard);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Load user information
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('user-email').textContent = userEmail;
    } else {
        // If no email is found, redirect to login
        window.location.href = 'signin.html?redirect=dashboard';
    }
    
    loadActivePlan();
    loadUpcomingGames();
}); 