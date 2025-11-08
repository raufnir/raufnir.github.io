// Function to handle smooth scrolling and active link update on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor jump

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scroll to the target section, adjusting for a fixed header/navigation bar (80px offset)
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active class for the clicked navigation link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Highlight active section in navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section'); // Select all section elements
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Determine the current section based on scroll position, considering a fixed header offset
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active class for the navigation link corresponding to the current section
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Existing code for resume section buttons - KEEP THIS PART
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idex) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idex].classList.add('active');
    });
});


// নিউ 

// Service data
const serviceData = {
    dashboard: {
        title: "Dashboard Design Services",
        features: [
            "Interactive Power BI Dashboards",
            "Real-time Data Visualization", 
            "Custom KPI Metrics",
            "Mobile Responsive Design"
        ],
        duration: "2-4 weeks",
        technologies: "Power BI, DAX, SQL",
        price: "$500"
    },
    webscraping: {
        title: "Web Scraping Services",
        features: [
            "Automated Data Collection",
            "E-commerce Price Monitoring",
            "Social Media Data Mining", 
            "API Integration & ETL"
        ],
        duration: "1-3 weeks",
        technologies: "Python, Selenium, BeautifulSoup",
        price: "$300"
    },
    segmentation: {
        title: "Customer Segmentation Analysis",
        features: [
            "RFM Analysis Implementation",
            "Behavioral Pattern Analysis",
            "Customer Lifetime Value",
            "Predictive Modeling"
        ],
        duration: "3-5 weeks", 
        technologies: "Power BI, Python, SQL",
        price: "$700"
    },
    datacleaning: {
        title: "Data Cleaning & Preprocessing",
        features: [
            "Missing Data Handling",
            "Outlier Detection & Treatment",
            "Data Standardization",
            "Quality Assurance Reports"
        ],
        duration: "1-2 weeks",
        technologies: "Python, Pandas, NumPy", 
        price: "$250"
    },
    timeseries: {
        title: "Time Series Analysis & Forecasting",
        features: [
            "Trend & Seasonality Analysis",
            "ARIMA & Prophet Models", 
            "Demand Forecasting",
            "Statistical Validation"
        ],
        duration: "2-4 weeks",
        technologies: "Python, R, Statistics",
        price: "$600"
    }
};

// Global variables
let currentService = '';

// Open popup function
function openServicePopup(serviceId) {
    const overlay = document.getElementById('service-popup-overlay');
    const titleElement = document.getElementById('popup-title');
    const contentElement = document.getElementById('popup-content');
    
    if (!overlay || !titleElement || !contentElement) return;
    
    currentService = serviceId;
    const service = serviceData[serviceId];
    
    if (!service) return;
    
    // Set title
    titleElement.textContent = service.title;
    
    // Build content
    let contentHTML = '<div class="service-features">';
    service.features.forEach(feature => {
        contentHTML += `
            <div class="service-detail-item">
                <i class="bx bxs-check-circle"></i>
                <span>${feature}</span>
            </div>
        `;
    });
    contentHTML += '</div>';
    
    contentHTML += `
        <div class="service-info-box">
            <div class="service-info-row">
                <span class="service-info-label">Duration:</span>
                <span class="service-info-value">${service.duration}</span>
            </div>
            <div class="service-info-row">
                <span class="service-info-label">Technologies:</span>
                <span class="service-info-value">${service.technologies}</span>
            </div>
            <div class="service-info-row">
                <span class="service-info-label">Starting at:</span>
                <span class="service-info-value service-price">${service.price}</span>
            </div>
        </div>
    `;
    
    contentElement.innerHTML = contentHTML;
    
    // Show popup
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close popup function
function closeServicePopup() {
    const overlay = document.getElementById('service-popup-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Request quote function
function requestQuote() {
    if (!currentService) return;
    
    const service = serviceData[currentService];
    closeServicePopup();
    
    // Scroll to contact section
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill subject field
            setTimeout(() => {
                const subjectField = document.querySelector('input[placeholder="email subject"]');
                if (subjectField) {
                    subjectField.value = `Quote Request: ${service.title}`;
                    subjectField.focus();
                }
            }, 1000);
        }
    }, 100);
}

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeServicePopup();
    }
});

// Prevent popup from closing when clicking inside it
document.addEventListener('DOMContentLoaded', function() {
    const popupContainer = document.getElementById('service-popup');
    if (popupContainer) {
        popupContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});