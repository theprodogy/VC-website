// Modern JavaScript for Vortexzz Community Website

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const applyForm = document.getElementById('apply-form');
const successMessage = document.getElementById('success-message');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation and Submission
applyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (validateForm(data)) {
        // Simulate form submission
        submitForm(data);
    }
});

function validateForm(data) {
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.remove();
    });
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showError('name', 'Name muss mindestens 2 Zeichen lang sein');
        isValid = false;
    }
    
    // Validate age
    const age = parseInt(data.age);
    if (!data.age || age < 16 || age > 99) {
        showError('age', 'Alter muss zwischen 16 und 99 Jahren liegen');
        isValid = false;
    }
    
    // Validate Discord username
    if (!data.discord || data.discord.trim().length < 3) {
        showError('discord', 'Discord-Benutzername muss mindestens 3 Zeichen lang sein');
        isValid = false;
    }
    
    // Validate experience
    if (!data.experience) {
        showError('experience', 'Bitte wähle eine Option aus');
        isValid = false;
    }
    
    // Validate motivation
    if (!data.motivation || data.motivation.trim().length < 20) {
        showError('motivation', 'Motivation muss mindestens 20 Zeichen lang sein');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--error)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    
    // Add error styling to field
    field.style.borderColor = 'var(--error)';
    
    // Remove error styling after user starts typing
    field.addEventListener('input', function() {
        this.style.borderColor = '';
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

function submitForm(data) {
    // Show loading state
    const submitBtn = applyForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
    submitBtn.disabled = true;
    
    // Create formatted application text
    const applicationText = `MODERATOR-BEWERBUNG

Name: ${data.name}
Alter: ${data.age}
Discord: ${data.discord}
Mod-Erfahrung: ${data.experience === 'yes' ? 'Ja' : 'Nein'}

Motivation:
${data.motivation}

Bewerbung eingereicht: ${new Date().toLocaleString('de-DE')}`;
    
    // Simulate successful submission
    setTimeout(() => {
        // Hide form and show application result
        applyForm.style.display = 'none';
        showApplicationResult(applicationText);
        
        // Reset form
        applyForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 1500);
}

function showApplicationResult(applicationText) {
    // Create result container
    const resultContainer = document.createElement('div');
    resultContainer.className = 'application-result';
    resultContainer.innerHTML = `
        <div class="result-content">
            <div class="result-header">
                <i class="fas fa-check-circle"></i>
                <h3>Bewerbung erfolgreich erstellt!</h3>
            </div>
            
            <div class="copy-section">
                <h4>📋 Deine Bewerbung zum Kopieren:</h4>
                <div class="text-container">
                    <textarea readonly class="application-text">${applicationText}</textarea>
                    <button class="copy-btn" onclick="copyToClipboard()">
                        <i class="fas fa-copy"></i>
                        Kopieren
                    </button>
                </div>
            </div>
            
            <div class="instructions">
                <h4>📋 Nächste Schritte - Discord Ticket erstellen:</h4>
                <div class="steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h5>Discord öffnen</h5>
                            <p>Gehe zu unserem Discord-Server: <a href="https://discord.gg/g2SnbQk2Ds" target="_blank">discord.gg/g2SnbQk2Ds</a></p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h5>Ticket erstellen</h5>
                            <p>Suche nach dem Channel "#ticket-erstellen" oder verwende den Ticket-Bot</p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h5>Bewerbung einfügen</h5>
                            <p>Füge deine kopierte Bewerbung in das Ticket ein und sende es ab</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="result-actions">
                <button class="btn btn-primary" onclick="resetForm()">
                    <i class="fas fa-redo"></i>
                    Neue Bewerbung
                </button>
                <a href="https://discord.gg/g2SnbQk2Ds" target="_blank" class="btn btn-secondary">
                    <i class="fab fa-discord"></i>
                    Zum Discord
                </a>
            </div>
        </div>
    `;
    
    // Insert after apply container
    const applyContainer = document.querySelector('.apply-container');
    applyContainer.appendChild(resultContainer);
    
    // Scroll to result
    resultContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Copy to clipboard function
function copyToClipboard() {
    const textArea = document.querySelector('.application-text');
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        
        // Show success feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
        copyBtn.style.background = 'var(--success)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
        
    } catch (err) {
        console.error('Fehler beim Kopieren:', err);
        alert('Fehler beim Kopieren. Bitte manuell kopieren.');
    }
}

// Reset form function
function resetForm() {
    const resultContainer = document.querySelector('.application-result');
    if (resultContainer) {
        resultContainer.remove();
    }
    
    const applyForm = document.getElementById('apply-form');
    applyForm.style.display = 'block';
    
    // Scroll to form
    applyForm.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
🎮 Willkommen bei der Vortexzz Community! 🎮

Website erfolgreich geladen!
Entwickelt mit modernen Web-Technologien.

Folge uns auf:
- Twitch: https://www.twitch.tv/vortexzzfnr
- Discord: https://discord.gg/g2SnbQk2Ds

Viel Spaß beim Erkunden! 🚀
`);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Ein Fehler ist aufgetreten:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Seite geladen in ${Math.round(loadTime)}ms`);
});