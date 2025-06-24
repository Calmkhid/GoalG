document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and update header
    const checkAuthStatus = () => {
        const userToken = localStorage.getItem('userToken');
        
        // Look for auth container with various possible IDs/classes
        const authButtonContainer = 
            document.getElementById('auth-button-container') || 
            document.querySelector('.auth-button') ||
            document.querySelector('.sign-in-btn').parentNode;
        
        if (authButtonContainer) {
            if (userToken) {
                // User is logged in, show dashboard button
                authButtonContainer.innerHTML = '<a href="dashboard.html" class="sign-in-btn">DASHBOARD</a>';
                console.log('User is logged in, showing dashboard button');
            } else {
                // User is not logged in, show sign in button
                authButtonContainer.innerHTML = '<a href="signin.html" class="sign-in-btn">SIGN IN</a>';
                console.log('User is not logged in, showing sign in button');
            }
        } else {
            console.log('Auth button container not found');
        }
    };
    
    // Run auth check on page load
    checkAuthStatus();

    // Mobile menu toggle
    const setupMobileMenu = () => {
        const header = document.querySelector('header');
        if (!header) return;

        // Add mobile menu elements dynamically
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        header.querySelector('.container').appendChild(mobileMenuBtn);

        // Add class to header for styling purposes
        header.classList.add('has-mobile-menu');

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-open');
        });
    };

    // Initialize mobile menu for smaller screens
    if (window.innerWidth < 768) {
        setupMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            setupMobileMenu();
        }
    });

    // Prediction page filters
    const setupFilters = () => {
        const leagueFilter = document.getElementById('league-filter');
        const betTypeFilter = document.getElementById('bet-type-filter');
        const predictionItems = document.querySelectorAll('.prediction-item');

        if (!leagueFilter || !betTypeFilter || predictionItems.length === 0) return;

        const filterPredictions = () => {
            const selectedLeague = leagueFilter.value;
            const selectedBetType = betTypeFilter.value;

            predictionItems.forEach(item => {
                const league = item.getAttribute('data-league') || 'default';
                const betType = item.getAttribute('data-bet-type') || 'default';

                const leagueMatch = selectedLeague === 'all' || league === selectedLeague;
                const betTypeMatch = selectedBetType === 'all' || betType === selectedBetType;

                if (leagueMatch && betTypeMatch) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        };

        leagueFilter.addEventListener('change', filterPredictions);
        betTypeFilter.addEventListener('change', filterPredictions);
    };

    setupFilters();

    // Day tabs navigation
    const setupDayTabs = () => {
        const dayTabs = document.querySelectorAll('.day-tab');
        if (dayTabs.length === 0) return;

        // Get the 'day' parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const day = urlParams.get('day') || 'today';

        // Set active tab based on URL parameter
        dayTabs.forEach(tab => {
            const tabDay = tab.getAttribute('href').split('=')[1];
            if (tabDay === day) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    };

    setupDayTabs();

    // Calendar date picker
    const setupCalendarPicker = () => {
        const calendarTab = document.querySelector('.calendar-tab');
        if (!calendarTab) return;

        calendarTab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Here we would typically initialize a date picker
            // For simplicity, let's just show an alert
            alert('Calendar date picker would appear here');
            
            // In a real implementation, you would:
            // 1. Show a date picker UI
            // 2. When a date is selected, navigate to predictions.html?day=custom&date=YYYY-MM-DD
        });
    };

    setupCalendarPicker();

    // Authentication forms validation
    const setupFormValidation = () => {
        // Sign In Form Validation
        const signinForm = document.getElementById('signin-form');
        if (signinForm) {
            signinForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                let isValid = true;
                let errorMessage = '';
                
                // Simple validation
                if (!email) {
                    isValid = false;
                    errorMessage += 'Email is required.\n';
                } else if (!/\S+@\S+\.\S+/.test(email)) {
                    isValid = false;
                    errorMessage += 'Email is invalid.\n';
                }
                
                if (!password) {
                    isValid = false;
                    errorMessage += 'Password is required.\n';
                }
                
                if (isValid) {
                    // For demo purposes, simulate successful login
                    alert('Login successful! Redirecting to dashboard...');
                    window.location.href = 'index.html';
                } else {
                    alert(errorMessage);
                }
            });
        }

        // Sign Up Form Validation
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const terms = document.getElementById('terms').checked;
                
                let isValid = true;
                let errorMessage = '';
                
                // Name validation
                if (!name) {
                    isValid = false;
                    errorMessage += 'Full name is required.\n';
                }
                
                // Email validation
                if (!email) {
                    isValid = false;
                    errorMessage += 'Email is required.\n';
                } else if (!/\S+@\S+\.\S+/.test(email)) {
                    isValid = false;
                    errorMessage += 'Email is invalid.\n';
                }
                
                // Password validation
                if (!password) {
                    isValid = false;
                    errorMessage += 'Password is required.\n';
                } else if (password.length < 8) {
                    isValid = false;
                    errorMessage += 'Password must be at least 8 characters long.\n';
                }
                
                // Confirm password validation
                if (password !== confirmPassword) {
                    isValid = false;
                    errorMessage += 'Passwords do not match.\n';
                }
                
                // Terms agreement validation
                if (!terms) {
                    isValid = false;
                    errorMessage += 'You must agree to the Terms & Conditions.\n';
                }
                
                if (isValid) {
                    // For demo purposes, simulate successful registration
                    alert('Account created successfully! Redirecting to dashboard...');
                    window.location.href = 'index.html';
                } else {
                    alert(errorMessage);
                }
            });
        }
    };

    setupFormValidation();

    // Social sign-in buttons
    const setupSocialButtons = () => {
        const socialButtons = document.querySelectorAll('.social-btn');
        if (socialButtons.length === 0) return;

        socialButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
                
                // In a real implementation, you would initialize the OAuth flow here
                // For demo purposes, we'll use mock implementations
                
                if (provider === 'Google') {
                    // Simulate Google OAuth popup window
                    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
                    const clientId = 'your-google-client-id'; // This would be your actual Google client ID
                    const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
                    const scope = encodeURIComponent('profile email');
                    
                    const googleAuthPopupUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
                    
                    // In a real implementation, you would open this URL in a popup
                    // window.open(googleAuthPopupUrl, 'googleAuthPopup', 'width=500,height=600');
                    
                    // For demo, we'll just show an alert
                    alert(`Sign in with ${provider} would be initiated here`);
                } else if (provider === 'Facebook') {
                    // Simulate Facebook OAuth popup window
                    const fbAuthUrl = 'https://www.facebook.com/v14.0/dialog/oauth';
                    const appId = 'your-facebook-app-id'; // This would be your actual Facebook app ID
                    const redirectUri = encodeURIComponent(window.location.origin + '/auth/facebook/callback');
                    
                    const fbAuthPopupUrl = `${fbAuthUrl}?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=email,public_profile`;
                    
                    // In a real implementation, you would open this URL in a popup
                    // window.open(fbAuthPopupUrl, 'facebookAuthPopup', 'width=500,height=600');
                    
                    // For demo, we'll just show an alert
                    alert(`Sign in with ${provider} would be initiated here`);
                }
            });
        });
    };

    setupSocialButtons();

    // Testimonial slider
    const setupTestimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length <= 1) return;

        let currentIndex = 0;
        const sliderContainer = document.querySelector('.testimonial-slider');
        
        // Add navigation arrows
        const prevArrow = document.createElement('button');
        prevArrow.classList.add('testimonial-arrow', 'prev');
        prevArrow.innerHTML = '&larr;';
        
        const nextArrow = document.createElement('button');
        nextArrow.classList.add('testimonial-arrow', 'next');
        nextArrow.innerHTML = '&rarr;';
        
        sliderContainer.parentNode.insertBefore(prevArrow, sliderContainer);
        sliderContainer.parentNode.insertBefore(nextArrow, sliderContainer.nextSibling);
        
        // Initially hide all except the first
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Navigation functions
        const showTestimonial = (index) => {
            testimonials.forEach(t => t.style.display = 'none');
            testimonials[index].style.display = 'block';
        };
        
        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    };

    setupTestimonialSlider();

    // Newsletter form
    const setupNewsletterForm = () => {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        if (newsletterForms.length === 0) return;

        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                
                if (!emailInput.value || !/\S+@\S+\.\S+/.test(emailInput.value)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // Simulate API call
                alert(`Thank you! Your email ${emailInput.value} has been subscribed to our newsletter.`);
                emailInput.value = '';
            });
        });
    };

    setupNewsletterForm();

    // URL parameter handling
    const handleUrlParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check if we're on the predictions page
        if (window.location.pathname.includes('predictions.html')) {
            const day = urlParams.get('day') || 'today';
            
            // Update page title based on day
            const headerTitle = document.querySelector('.predictions-header h2');
            const headerDescription = document.querySelector('.predictions-header p');
            
            if (headerTitle && headerDescription) {
                const today = new Date();
                let targetDate = new Date();
                let dateString = '';
                
                switch (day) {
                    case 'yesterday':
                        targetDate.setDate(today.getDate() - 1);
                        break;
                    case 'tomorrow':
                        targetDate.setDate(today.getDate() + 1);
                        break;
                    default:
                        targetDate = today;
                }
                
                // Format date as: Sunday, May 4, 2025
                dateString = targetDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                headerTitle.textContent = `${day.charAt(0).toUpperCase() + day.slice(1)}'s Football Matches Predictions For ${dateString}`;
                headerDescription.textContent = `Here are all of our football betting predictions for ${dateString}.`;
            }
        }
    };

    handleUrlParams();
}); 