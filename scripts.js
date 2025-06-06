// Add interactive elements
document.querySelectorAll('.feature-card').forEach(card => {
card.addEventListener('mouseenter', () => {
card.style.transform = 'translateY(-10px) scale(1.02)';
});

card.addEventListener('mouseleave', () => {
card.style.transform = 'translateY(0) scale(1)';
});
});

// Screenshot carousel functionality
let currentSlide = 0;
const totalSlides = 5;

function updateCarousel() {
// Update screenshot placeholders
const screenshots = document.querySelectorAll('.screenshot-placeholder');
const features = document.querySelectorAll('.feature-content');
const indicators = document.querySelectorAll('.indicator');

screenshots.forEach((screenshot, index) => {
screenshot.style.display = index === currentSlide ? 'flex' : 'none';
});

features.forEach((feature, index) => {
if (index === currentSlide) {
feature.classList.add('active');
} else {
feature.classList.remove('active');
}
});

indicators.forEach((indicator, index) => {
if (index === currentSlide) {
indicator.classList.add('active');
} else {
indicator.classList.remove('active');
}
});

// Update screenshot content based on current slide
const currentScreenshot = screenshots[currentSlide];
const icons = ['⚙️', '📚', '✍️', '🌍', '🧠'];
const titles = ['Setup Screen', 'Dictionary View', 'Rewriter Tool', 'Translation Mode', 'Flashcard Quiz'];

currentScreenshot.querySelector('.placeholder-icon').textContent = icons[currentSlide];
currentScreenshot.querySelector('p').textContent = titles[currentSlide];

// Add gradient variation for each screen
const gradients = [
'linear-gradient(135deg, #667eea, #764ba2)',
'linear-gradient(135deg, #f093fb, #f5576c)',
'linear-gradient(135deg, #4facfe, #00f2fe)',
'linear-gradient(135deg, #43e97b, #38f9d7)',
'linear-gradient(135deg, #fa709a, #fee140)'
];
currentScreenshot.style.background = gradients[currentSlide];
}

function changeSlide(direction) {
currentSlide += direction;
if (currentSlide >= totalSlides) currentSlide = 0;
if (currentSlide < 0) currentSlide = totalSlides - 1;
updateCarousel();
}

function goToSlide(slideIndex) {
currentSlide = slideIndex;
updateCarousel();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowLeft') {
changeSlide(-1);
} else if (e.key === 'ArrowRight') {
changeSlide(1);
}
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.screenshot-carousel').addEventListener('touchstart', (e) => {
touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.screenshot-carousel').addEventListener('touchend', (e) => {
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
});

function handleSwipe() {
const swipeThreshold = 50;
const diff = touchStartX - touchEndX;

if (Math.abs(diff) > swipeThreshold) {
if (diff > 0) {
changeSlide(1); // Swipe left, go to next
} else {
changeSlide(-1); // Swipe right, go to previous
}
}
}

// Auto-advance carousel (optional)
let autoAdvanceInterval;

function startAutoAdvance() {
autoAdvanceInterval = setInterval(() => {
changeSlide(1);
}, 5000); // Change slide every 5 seconds
}

function stopAutoAdvance() {
clearInterval(autoAdvanceInterval);
}

// Start auto-advance when page loads
startAutoAdvance();

// Pause auto-advance when user interacts
document.querySelector('.screenshot-carousel').addEventListener('mouseenter', stopAutoAdvance);
document.querySelector('.screenshot-carousel').addEventListener('mouseleave', startAutoAdvance);

// Initialize carousel
updateCarousel();

// Add click effects to buttons
document.querySelectorAll('.cta-button').forEach(button => {
button.addEventListener('click', (e) => {
// Don't prevent default for mailchimp form submission
if (button.id === 'mc-embedded-subscribe') {
return;
}

e.preventDefault();
button.classList.add('shake');
setTimeout(() => {
button.classList.remove('shake');
}, 500);

// Scroll to waitlist section
const waitlist = document.getElementById('waitlist');
if (waitlist) {
waitlist.scrollIntoView({
behavior: 'smooth',
block: 'center'
});
}
});
});

// Mailchimp form handling
document.getElementById('mc-embedded-subscribe-form').addEventListener('submit', function(e) {

const email = document.getElementById('mce-EMAIL').value;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
e.preventDefault();
document.getElementById('mce-error-response').innerHTML = 'Please enter a valid email address';
document.getElementById('mce-error-response').style.display = 'block';
document.getElementById('mce-success-response').style.display = 'none';
return;
}

// Hide error messages
document.getElementById('mce-error-response').style.display = 'none';

// Send POST request to Google Apps Script
fetch('https://script.google.com/macros/s/AKfycbyWcSZtEVAh7Yndm8UAT11QhVrUIOusVOEjKnK-Esmk0KrMC4-yttBQ-obcRtaTaKyQZw/exec', {
method: 'POST',
mode: 'no-cors',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
body: `email=${encodeURIComponent(email)}`
}).then(() => {
document.getElementById('mce-success-response').innerHTML = '🎉 Awesome! You\'re on the waitlist. We\'ll notify you when chillish launches!';
document.getElementById('mce-success-response').style.display = 'block';
document.getElementById('mce-EMAIL').value = '';

// const button = document.getElementById('mc-embedded-subscribe');
// button.value = 'Welcome Aboard! 🎉';
// button.style.background = '#667eea';

// setTimeout(() => {
//     button.value = 'Join Waitlist';
//     button.style.background = '';
// }, 3000);
}).catch((e) => {
document.getElementById('mce-error-response').innerHTML = 'Something went wrong. Please try again later.';
document.getElementById('mce-error-response').style.display = 'block';
});

});

// Parallax effect for floating elements
document.addEventListener('mousemove', (e) => {
const floatingElements = document.querySelectorAll('.floating-emoji');
const x = e.clientX / window.innerWidth;
const y = e.clientY / window.innerHeight;

floatingElements.forEach((element, index) => {
const speed = (index + 1) * 0.5;
const xMove = (x - 0.5) * speed * 50;
const yMove = (y - 0.5) * speed * 50;

element.style.transform = `translate(${xMove}px, ${yMove}px)`;
});
});

// Smooth scroll for anchor links
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

// Add scroll animations
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

// Observe feature cards for scroll animations
document.querySelectorAll('.feature-card, .roadmap-item').forEach(card => {
card.style.opacity = '0';
card.style.transform = 'translateY(30px)';
card.style.transition = 'all 0.6s ease';
observer.observe(card);
});
