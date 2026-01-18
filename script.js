
// Theme Toggling
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'light') {
        icon.classList.remove('ph-sun');
        icon.classList.add('ph-moon');
    } else {
        icon.classList.remove('ph-moon');
        icon.classList.add('ph-sun');
    }
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Animation Logic
const typingText = document.querySelector('.typing-text');
const phrases = ["Building Digital\nExperiences", "Software Engineer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deletion
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing phrase
        isDeleting = true;
        typeSpeed = 2000; // Pause at end

        // If it's the last phrase ("Software Engineer"), maybe we want to stop?
        // User request: "then show Software engineer". 
        // Let's stop deletion if it's the last one to keep it visible?
        // Or loop? Usually loop. But phrasing "then show..." suggests finality.
        // Let's stop if it's the last phrase.
        if (phraseIndex === phrases.length - 1) {
            isDeleting = false; // Stop deleting
            return; // End animation
        }

    } else if (isDeleting && charIndex === 0) {
        // Finished deleting
        isDeleting = false;
        phraseIndex++;
        typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing on load
document.addEventListener('DOMContentLoaded', typeEffect);
