// --- Global functions needed by templates ---
const modal = document.createElement('div');
modal.id = 'project-modal';
modal.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 hidden opacity-0';
document.body.appendChild(modal);

modal.innerHTML = `
    <div class="w-full max-w-3xl max-h-[90vh] relative">
        <button id="close-modal-button" class="absolute -top-4 -right-4 bg-stone-800 rounded-full p-2 text-amber-200 hover:text-yellow-400 z-10 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
        </button>
        <div id="modal-content-container" class="modal-content glass-card rounded-xl overflow-y-auto p-8 transform scale-95 opacity-0 max-h-[90vh]">
            <!-- Content will be injected here -->
        </div>
    </div>
`;

const modalContentContainer = document.getElementById('modal-content-container');
const projectDetails = {
    'traffic-signal': {
        title: 'Real-Time Traffic Signal Recognition',
        image: 'https://placehold.co/600x400/1c1917/facc15?text=Traffic+Signal+Detection',
		
        problem: 'The goal was to develop a high-performance, real-time object detection model capable of accurately identifying and classifying traffic signals from a live video feed. This has direct applications in autonomous driving and intelligent traffic management systems.',
        features: [
            '*High Accuracy:* Achieved an outstanding *97% mean Average Precision (mAP)* on the test dataset.',
            '*Real-Time Performance:* Implemented with OpenCV for efficient video capture and real-time inference.',
            '*Robust Training:* Processed and augmented over 10,000 images from the LISA dataset to handle various lighting and weather conditions.',
            '*Tech Stack:* Python, PyTorch, YOLOv8, OpenCV, Computer Vision.'
        ],
        challenges: "A key challenge was ensuring the model's robustness to different environmental conditions. To solve this, I implemented a comprehensive data augmentation pipeline, including random brightness adjustments, rotations, and noise injection, which significantly improved the model's generalization capabilities.",
        link: 'https://github.com/AjayTiwari94/traffic-signal-detection'
    },
    'instagram-sentiment': {
        title: 'Instagram Sentiment Analysis',
        image: 'https://placehold.co/600x400/1c1917/facc15?text=Sentiment+Analysis',
        problem: "This project aimed to classify user sentiment from a dataset of Instagram comments with over 150 unique, nuanced emotion labels. The core task was to standardize these labels and evaluate a pre-trained NLP model's ability to handle complex, real-world text data.",
        features: [
            '*Label Standardization:* Engineered a mapping function to consolidate 150+ specific emotion labels into three standard categories (Positive, Negative, Neutral).',
            "*Model Evaluation:* Applied and evaluated NLTK's VADER model, achieving *54% overall accuracy* and identifying a high recall of *86%* for both positive and negative sentiments.",
            "*Insight Generation:* The analysis revealed the model's strength in identifying clear polarity and its challenges with subtle, neutral text.",
            '*Tech Stack:* Python, NLTK, VADER, Pandas, Scikit-learn, Seaborn.'
        ],
        challenges: "The primary challenge was the dataset's noisy and highly varied labels. The solution was to create a robust mapping system that grouped related emotions, allowing for a fair and meaningful evaluation of the sentiment analysis model.",
        link: 'https://github.com/AjayTiwari94/Instagram-Sentiment-Analysis'
    },
     'mental-health': {
        title: 'Mental Health Predictive Analysis',	
        image: 'https://placehold.co/600x400/1c1917/facc15?text=Mental+Health+Predictive+Analysis',

        problem: 'This project analyzed survey data to predict whether an employee in the tech industry would seek treatment for a mental health condition. The goal was to identify key factors influencing this decision to inform potential improvements in workplace support systems.',
        features: [
            '*Predictive Modeling:* Built a Logistic Regression model with *71% accuracy* to classify treatment-seeking behavior.',
            '*Feature Importance:* Identified \'family_history\' as the most significant predictor through model coefficient analysis.',
            '*Interactive Dashboard:* Designed and developed a Power BI dashboard to present the findings and allow for interactive data exploration.',
            '*Tech Stack:* Python, Scikit-learn, Pandas, Power BI.'
        ],
        challenges: "A major challenge was cleaning the raw survey data, which contained inconsistent and invalid entries in columns like 'Age' and 'Gender'. This was solved by implementing data cleaning functions to filter outliers and consolidate categories into a standardized format.",
        link: 'https://github.com/AjayTiwari94/Mental-Health-Data-Analysis-PowerBi-Python'
    },
     'customer-transaction': {
        title: 'Customer Transaction Pattern Analysis',
        image: 'https://placehold.co/600x400/1c1917/facc15?text=Tableau+Dashboard',
        problem: 'The objective was to analyze a raw banking transaction dataset to uncover key customer spending patterns and behaviors, and to present these insights in a dynamic, interactive dashboard for business stakeholders.',
        features: [
            '*Dynamic Dashboard:* Created an interactive dashboard in Tableau to visualize customer spending habits.',
            '*Python Integration:* Leveraged *TabPy* to integrate Python scripts directly into the Tableau dashboard, enabling more complex, real-time data processing.',
            '*Insight Generation:* The analysis successfully identified high-frequency transaction categories, providing a data-driven basis for potential marketing opportunities.',
            '*Tech Stack:* Tableau, Python (Pandas, NumPy), TabPy.'
        ],
        challenges: "The main technical challenge was establishing a stable and efficient connection between Tableau and a live Python backend via TabPy. This was overcome by carefully configuring the server and optimizing the Pandas scripts to ensure fast data processing and a smooth user experience in the dashboard.",
        link: 'https://github.com/AjayTiwari94/Customer-Transaction-Analysis'
    }
};

function openModal(projectId) {
    const details = projectDetails[projectId];
    if (!details) return;

    let featuresHtml = details.features.map(feature => `<li>${feature.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-100">$1</strong>')}</li>`).join('');

    modalContentContainer.innerHTML = `
        <h2 class="text-3xl font-bold gradient-text mb-6">${details.title}</h2>
        ${details.video ? `
    <video controls class="rounded-lg mb-6 w-full h-64 object-cover" poster="${details.image}">
        <source src="${details.video}" type="video/mp4">
        Your browser does not support the video tag.
    </video>
` : `
    <img src="${details.image}" alt="${details.title}" class="rounded-lg mb-6 w-full h-64 object-cover">
`}

        <div class="text-amber-200 space-y-4">
            <h3 class="text-xl font-bold text-amber-100">Problem Statement</h3>
            <p>${details.problem}</p>
            <h3 class="text-xl font-bold text-amber-100">Key Features & Technologies</h3>
            <ul class="list-disc list-inside space-y-2">${featuresHtml}</ul>
            <h3 class="text-xl font-bold text-amber-100">Challenges & Solutions</h3>
            <p>${details.challenges}</p>
        </div>
        <div class="mt-8 flex gap-4">
			<a href="${details.link}" target="_blank" class="hero-button bg-stone-800 hover:bg-stone-700 text-amber-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.305 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.333-5.467-5.93 0-1.311.47-2.382 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.243 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.22.693.825.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
				</svg>
				View on GitHub
			</a>
		</div>

    `;
    
    document.body.classList.add('body-no-scroll');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContentContainer.classList.remove('opacity-0', 'scale-95');
    }, 10);
}

function closeModal() {
    modalContentContainer.classList.add('opacity-0', 'scale-95');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('body-no-scroll');
    }, 300);
}

// --- Scripts that need to run after a page is loaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Contact Button Animation
    const contactButton = document.getElementById('contact-button');
    if (contactButton) {
        const messageBox = document.getElementById('message-box');
        contactButton.addEventListener('click', (event) => {
            messageBox.classList.add('message-box-show');
            setTimeout(() => {
                messageBox.classList.remove('message-box-show');
            }, 3000);
        });
    }

    // Emoji click animation for hero buttons with 3-second delay
    const heroButtons = document.querySelectorAll('.hero-button');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = button.href;
            const emoji = document.createElement('span');
            emoji.innerHTML = '😊';
            emoji.classList.add('emoji-pop');
            const rect = button.getBoundingClientRect();
            emoji.style.left = `${e.clientX - rect.left}px`;
            emoji.style.top = `${e.clientY - rect.top}px`;
            button.appendChild(emoji);
            setTimeout(() => {
                window.open(destination, '_blank');
            }, 3000); // 3 second delay
            setTimeout(() => {
                emoji.remove();
            }, 800);
        });
    });
    
    // Modal Click Listeners
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.projectId;
            openModal(projectId);
        });
    });
    
    const closeModalButton = document.getElementById('close-modal-button');
    if(closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    
    const modalOverlay = document.getElementById('project-modal');
    if(modalOverlay) {
         modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Enhanced scroll animations with reduced intensity
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Refined hover effects for cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.01)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for anchor links
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

    // Enhanced navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('nav-active');
        }
    });
	// Example: Only update animated-title, including the cursor
	
}); 
// --- Typing effect setup ---
const roles = ["AI/ML Engineer", "Data Analyst"];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const target = document.getElementById('animated-title');

function typeWriter() {
    const currentRole = roles[roleIdx];

    if (!isDeleting) {
        // typing forward
        target.innerHTML =
            currentRole.slice(0, charIdx + 1) +
            '<span class="typing-cursor">|</span>';
        charIdx++;
        if (charIdx === currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1200); // pause after full word
            return;
        }
    } else {
        // deleting backward
        target.innerHTML =
            currentRole.slice(0, charIdx - 1) +
            '<span class="typing-cursor">|</span>';
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }

    setTimeout(typeWriter, isDeleting ? 60 : 90); // adjust speed here
}

// Start typing effect
typeWriter();


