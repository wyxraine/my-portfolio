

const texts = [
    "CS Graduate",
    "Developer",
    "Pianist",
];

const speed = 100;
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000); // Delay before erasing
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500); // Delay before typing the next word
    }
}

window.onload = typeWriter;

//scroll
ScrollReveal({
    reset: false,
    distance: '40px',
    duration: 1000,
    delay: 100
});

//scroll nav
function handleScroll() {
    var nav = document.getElementById('desktop-nav');
    if (window.scrollY > 0) {
        nav.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
}

// Check scroll position on page load
document.addEventListener('DOMContentLoaded', handleScroll);

// Update shadow on scroll
window.addEventListener('scroll', handleScroll);



// Profile Section
ScrollReveal().reveal('#profile .section__text__p1', { delay: 200, origin: 'left' });
ScrollReveal().reveal('#profile .title', { delay: 300, origin: 'left' });
ScrollReveal().reveal('#profile .typewriter', { delay: 400, origin: 'left' });
ScrollReveal().reveal('#profile .btn-container', { delay: 500, origin: 'bottom' });
ScrollReveal().reveal('#profile .section__pic-container img', { delay: 200, origin: 'bottom' });

// Global Section Headers (Subtitles and Titles)
ScrollReveal().reveal('.all_section_text', { delay: 200, origin: 'top', distance: '30px' });
ScrollReveal().reveal('.all_section_title', { delay: 300, origin: 'top', distance: '30px' });

// About Section Content
ScrollReveal().reveal('#about .about-pic', { delay: 400, origin: 'left' });
ScrollReveal().reveal('.about-me', { delay: 500, origin: 'right' });

// Experience/Services Section
ScrollReveal().reveal('.services__content', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    interval: 300,
    reset: true
});

// Education Section
ScrollReveal().reveal('.school-container', {
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    interval: 200,
    opacity: 0,
    scale: 0.85,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

// Projects Section
ScrollReveal().reveal('.portfolio-swiper', {
    delay: 400,
    origin: 'bottom',
    distance: '50px'
});

// Contact Section reveal
ScrollReveal().reveal('.contact-info-container', {
    delay: 400,
    origin: 'bottom',
    distance: '50px',
    interval: 200
});


// Initialize Swiper
const swiper = new Swiper('.portfolio-swiper', {
    loop: true,
    spaceBetween: 30,
    grabCursor: true,
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,



    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Clean Navigation (Prevents browser title/favicon flicker)
document.querySelectorAll('.nav-link, .navbar-brand').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only handle internal links
        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href === '#' ? 'home' : href.substring(1);
            const targetElement = document.getElementById(targetId) || document.body;

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth < 992) {
                    const menuToggle = document.getElementById('navbarNav');
                    const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        }
    });
});


// About Section Tabs
const aboutButtons = document.querySelectorAll('.about-buttons .btn');
const tabContents = document.querySelectorAll('.tab-content');

aboutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        // Update buttons
        aboutButtons.forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        // Update content
        tabContents.forEach(content => {
            if (content.id === targetId) {
                content.classList.remove('d-none');
                content.classList.add('active-tab');
            } else {
                content.classList.add('d-none');
                content.classList.remove('active-tab');
            }
        });
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-theme') {
        themeToggle.classList.replace('uil-moon', 'uil-sun');
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        themeToggle.classList.replace('uil-moon', 'uil-sun');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        themeToggle.classList.replace('uil-sun', 'uil-moon');
        localStorage.setItem('theme', 'light-theme');
    }
});

// Project Modal Data Handling
const projectModal = document.getElementById('projectModal');
if (projectModal) {
    projectModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;

        // Extract info from data-attributes
        const title = button.getAttribute('data-title');
        const description = button.getAttribute('data-description');
        const image = button.getAttribute('data-image');
        const image2 = button.getAttribute('data-image2');
        const github = button.getAttribute('data-github') || '#';
        const website = button.getAttribute('data-website');
        const websiteLabel = button.getAttribute('data-website-label');
        const tools = button.getAttribute('data-tools') || '';

        // Update the modal's content
        const modalTitle = projectModal.querySelector('#modalTitle');
        const modalDescription = projectModal.querySelector('#modalDescription');
        const modalImage = projectModal.querySelector('#modalImage');
        const modalImage2 = projectModal.querySelector('#modalImage2');
        const modalGithub = projectModal.querySelector('#modalGithub');
        const modalDemo = projectModal.querySelector('#modalDemo');
        const modalWebsite = projectModal.querySelector('#modalWebsite');
        const modalTools = projectModal.querySelector('#modalTools');

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = image;

        // Handle second image
        if (image2) {
            modalImage2.src = image2;
            modalImage2.classList.remove('d-none');
        } else {
            modalImage2.src = '';
            modalImage2.classList.add('d-none');
        }


        // Handle Website Button
        if (website) {
            modalWebsite.href = website;
            modalWebsite.innerHTML = `<i class="uil uil-globe me-2"></i>${websiteLabel || 'Website'}`;
            modalWebsite.classList.remove('d-none');
        } else {
            modalWebsite.classList.add('d-none');
        }

        // Handle Demo Button
        if (demo) {
            modalDemo.href = demo;
            modalDemo.classList.remove('d-none');
        } else {
            modalDemo.classList.add('d-none');
        }

        // Handle Github Button
        if (github === '#' || !github) {
            modalGithub.classList.add('d-none');
        } else {
            modalGithub.href = github;
            modalGithub.classList.remove('d-none');
        }

        // Render tools
        modalTools.innerHTML = '';
        if (tools) {
            tools.split(',').forEach(tool => {
                const badge = document.createElement('span');
                badge.className = 'badge rounded-pill bg-danger-subtle text-danger px-3 py-2';
                badge.textContent = tool.trim();
                modalTools.appendChild(badge);
            });
        }
    });
}

// Services Modal logic
const servicesModal = document.getElementById('servicesModal');
if (servicesModal) {
    servicesModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const title = button.getAttribute('data-title');
        const icon = button.getAttribute('data-icon');
        const description = button.getAttribute('data-description');
        const capabilities = button.getAttribute('data-capabilities') || '';
        const tools = button.getAttribute('data-tools') || '';

        servicesModal.querySelector('#serviceModalTitle').textContent = title;
        servicesModal.querySelector('#serviceModalDescription').textContent = description;
        servicesModal.querySelector('#serviceModalIcon').className = `uil ${icon}`;

        const capsContainer = servicesModal.querySelector('#serviceModalCapabilities');
        capsContainer.innerHTML = '';
        capabilities.split(',').forEach(cap => {
            const badge = document.createElement('span');
            badge.className = 'badge rounded-pill bg-danger-subtle text-danger px-2 py-1 small';
            badge.textContent = cap.trim();
            capsContainer.appendChild(badge);
        });

        const toolsContainer = servicesModal.querySelector('#serviceModalTools');
        toolsContainer.innerHTML = '';
        tools.split(',').forEach(tool => {
            const badge = document.createElement('span');
            badge.className = 'badge rounded-pill bg-secondary-subtle text-secondary px-2 py-1 small';
            badge.textContent = tool.trim();
            toolsContainer.appendChild(badge);
        });
    });

    const contactBtn = document.getElementById('serviceModalContact');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const bsModal = bootstrap.Modal.getInstance(servicesModal);
            if (bsModal) bsModal.hide();
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    }
}

// Stop project button clicks from bubbling to Swiper
document.querySelectorAll('.project-card button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

