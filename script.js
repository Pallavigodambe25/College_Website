// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    themeToggle.innerHTML = newTheme === 'light' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
});

// Update icon on load
if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navList = document.querySelector('.nav-list');

mobileMenuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Search Functionality
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.style.display = 'none';
});

// Close search on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.style.display = 'none';
    }
});

// Search functionality
const searchableContent = [
    { title: 'About PVPIT', url: '#about', description: 'Learn about our institution and history' },
    { title: 'Vision & Mission', url: '#about', description: 'Our vision, mission and quality policy' },
    { title: 'Computer Engineering', url: '#programs', description: 'Learn about computer engineering program' },
    { title: 'Mechanical Engineering', url: '#programs', description: 'Learn about mechanical engineering program' },
    { title: 'Electronics & Telecommunication', url: '#programs', description: 'Learn about E&TC program' },
    { title: 'Electrical Engineering', url: '#programs', description: 'Learn about electrical engineering program' },
    { title: 'Placements', url: '#placements', description: 'View our placement records and recruiters' },
    { title: 'Events', url: '#events', description: 'Latest events and activities' },
    { title: 'Contact Us', url: '#contact', description: 'Get in touch with us' },
    { title: 'Admission', url: '#admission', description: 'Admission information and process' }
];

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.length > 0) {
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(item => `
                <div class="search-result-item" style="padding: 15px; border-bottom: 1px solid #e0e0e0; cursor: pointer;">
                    <h4 style="margin-bottom: 5px; color: var(--primary-color);">${item.title}</h4>
                    <p style="color: var(--text-light); font-size: 14px; margin: 0;">${item.description}</p>
                </div>
            `).join('');
            
            searchResults.style.display = 'block';
            
            // Add click handlers to results
            document.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    window.location.href = results[index].url;
                    searchOverlay.classList.remove('active');
                    searchInput.value = '';
                    searchResults.style.display = 'none';
                });
            });
        } else {
            searchResults.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-light);">No results found</p>';
            searchResults.style.display = 'block';
        }
    } else {
        searchResults.style.display = 'none';
    }
});

// Stats Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#admission') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotBody = document.getElementById('chatbotBody');

chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('active');
    if (chatbot.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('active');
});

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Chatbot responses
const chatbotResponses = {
    'admission': 'Admissions are currently open! You can apply through our admission portal or visit our campus. For more details, please call +91 88305 65816.',
    'programs': 'We offer programs in Computer Engineering, Electronics & Telecommunication, Mechanical Engineering, and Electrical Engineering. Which one would you like to know more about?',
    'placements': 'Our placement rate is 95%! We have tie-ups with top companies like TCS, Infosys, Wipro, and many more. Our placement cell provides comprehensive training and support.',
    'contact': 'You can reach us at:\nPhone: +91 88305 65816\nEmail: info@pvpittssm.edu.in\nAddress: Bavdhan (KD), Chandni Chowk, Near Kothrud, Pune - 411021',
    'fees': 'For fee structure information, please contact our admission office at +91 88305 65816 or visit our campus.',
    'campus': 'Our campus is located at Bavdhan (KD), Chandni Chowk, near Kothrud, Pune. It features state-of-the-art labs, modern classrooms, library, sports facilities, and is surrounded by greenery.',
    'default': 'I can help you with information about admissions, programs, placements, contact details, and campus facilities. What would you like to know?'
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('admission') || message.includes('apply')) {
        return chatbotResponses.admission;
    } else if (message.includes('program') || message.includes('course') || message.includes('engineering')) {
        return chatbotResponses.programs;
    } else if (message.includes('placement') || message.includes('job') || message.includes('career')) {
        return chatbotResponses.placements;
    } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
        return chatbotResponses.contact;
    } else if (message.includes('fee') || message.includes('cost') || message.includes('price')) {
        return chatbotResponses.fees;
    } else if (message.includes('campus') || message.includes('location') || message.includes('address')) {
        return chatbotResponses.campus;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! Welcome to PVPIT. How can I assist you today?';
    } else if (message.includes('thanks') || message.includes('thank you')) {
        return 'You\'re welcome! Feel free to ask if you have any other questions.';
    } else {
        return chatbotResponses.default;
    }
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 500);
    }
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Virtual Tour Button
const virtualTourBtn = document.getElementById('virtualTourBtn');
virtualTourBtn.addEventListener('click', () => {
    alert('Virtual tour feature coming soon! You can watch our campus tour video in the About section.');
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.vmq-card, .program-card, .testimonial-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
};

// Initialize animations
animateOnScroll();

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Company logos infinite scroll animation
const companiesSlider = document.querySelector('.companies-slider');
if (companiesSlider) {
    const logos = companiesSlider.innerHTML;
    companiesSlider.innerHTML += logos; // Duplicate for seamless loop
    
    let scrollAmount = 0;
    const scrollSpeed = 1;
    
    // Commenting out auto-scroll for better user experience
    // setInterval(() => {
    //     scrollAmount += scrollSpeed;
    //     if (scrollAmount >= companiesSlider.scrollWidth / 2) {
    //         scrollAmount = 0;
    //     }
    //     companiesSlider.scrollLeft = scrollAmount;
    // }, 30);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('PVPIT Website - Enhanced Version Loaded Successfully! 🎉');
console.log('New Features:');
console.log('✓ Dark Mode Toggle');
console.log('✓ Advanced Search');
console.log('✓ AI Chatbot Assistant');
console.log('✓ Interactive Stats Counter');
console.log('✓ Programs Showcase');
console.log('✓ Placements Section');
console.log('✓ Events Timeline');
console.log('✓ Student Testimonials');
console.log('✓ Virtual Tour (Coming Soon)');
console.log('✓ Responsive Design');
console.log('✓ Smooth Animations');

