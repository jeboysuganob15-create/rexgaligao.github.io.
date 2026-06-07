const words = [
    "Front-End Developer",
    "BSIT Student",
    "UI Designer",
    "Future Full Stack Developer"
];

let wordIndex = 0;
let letterIndex = 0;

function typingEffect() {

    const typing = document.getElementById("typing");

    if (letterIndex < words[wordIndex].length) {

        typing.textContent += words[wordIndex].charAt(letterIndex);
        letterIndex++;

        setTimeout(typingEffect, 100);

    } else {

        setTimeout(eraseEffect, 1500);

    }
}

function eraseEffect() {

    const typing = document.getElementById("typing");

    if (typing.textContent.length > 0) {

        typing.textContent =
            typing.textContent.substring(0, typing.textContent.length - 1);

        setTimeout(eraseEffect, 50);

    } else {

        wordIndex++;

        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        letterIndex = 0;

        setTimeout(typingEffect, 300);
    }
}

function initApp() {
    typingEffect();
    handleScroll();
    initHeroReveal();
    initSkillsAnimation();
    initAboutGlow();
    initProjectCarousel();
}

window.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('scroll', handleScroll);

function handleScroll() {
    const scrollY = window.scrollY;
    const layers = document.querySelectorAll('.parallax-layer');
    const nav = document.querySelector('nav');

    layers.forEach((layer, index) => {
        const speed = [0.18, 0.09, 0.05][index] || 0.05;
        layer.style.transform = `translateY(${scrollY * speed}px)`;
    });

    if (scrollY > 30) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            section.classList.add('visible');
        }
    });
}

function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');

    if (!skillsSection) {
        return;
    }

    const cards = skillsSection.querySelectorAll('.skill-card');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        const percent = Number(card.dataset.percent || 0);
                        const fill = card.querySelector('.bar-fill');
                        const label = card.querySelector('.skill-percent');

                        if (fill) {
                            fill.style.width = percent + '%';
                        }

                        if (label) {
                            animateCounter(label, 0, percent, 900);
                        }
                    }, index * 90);
                });

                sectionObserver.disconnect();
            }
        });
    }, { threshold: 0.25 });

    sectionObserver.observe(skillsSection);
}

function initHeroReveal() {
    const hero = document.querySelector('.hero');
    const navItems = document.querySelectorAll('nav li');

    if (navItems.length) {
        navItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('nav-ready'), index * 70);
        });
    }

    if (!hero) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            hero.classList.add('hero-visible');
            observer.disconnect();
        });
    }, { threshold: 0.2 });

    observer.observe(hero);
}

function initAboutGlow() {
    const aboutSection = document.querySelector('.about-section');

    if (!aboutSection) {
        return;
    }

    let pulse = 0;

    setInterval(() => {
        pulse = (pulse + 1) % 2;
        aboutSection.classList.toggle('lightning-soft', pulse === 1);
    }, 1800);
}

function initProjectCarousel() {
    const carousel = document.getElementById('projectCarousel');
    const prevBtn = document.getElementById('projectPrev');
    const nextBtn = document.getElementById('projectNext');

    if (!carousel || !prevBtn || !nextBtn) {
        return;
    }

    const projects = [
        {
            label: 'Web Application',
            theme: 'SDG 14 – Life Below Water',
            title: 'Sustainable Blue Economy Network Portal',
            summary: 'The Sustainable Blue Economy Network Portal is a web based platform that utilizes PHP for serverside scripting, MySQL for database development and CSS to provide an easy clean friendly design. It supports businesses on the coast that wish to register or advertise their work, while providing a platform for institutions and communities to share information, build bridges, and promote sustainable organization. The portal facilitates collaboration by improving visibility into marine biodiversity and therefore contributes to equitable opportunities aligned with global goals such as SDG 14: Life Below Water.',
            tech: ['PHP', 'Laravel', 'MySQL', 'HTML5', 'CSS3'],
            repo: 'https://github.com/jeboysuganob15-create/laravel_economy',
            file: 'portal',
            icon: 'fa-solid fa-wave-square',
            mockupTitle: 'Sustainable Blue Economy Network Portal',
            mockupTag: 'SDG 14 • Clean Digital Impact'
        },
        {
            label: 'Reporting System',
            theme: 'SDG 5 – Gender Equality',
            title: 'GENDER EQUALITY REPORTING AND INCLUSUION MONITORING SYSTEM (GERIMS)',
            summary: 'In this project, we are going to build a Gender Equality Reporting and Inclusion Monitoring System — a secure web-based application using PHP, MySQL, custom CSS for easy and simple front end. The provisions within the platform allow for individuals to seamlessly log concerns or issues pertaining to gender matters online and institutions can track, assess and measure institutional inclusivity in a systematic manner. Reports are categorized for more clarity, administrators can pull them up and respond directly or track the progress through integration of data into databases. The goal is to is to create a transparent and accountable system that not only handles reports efficiently but also supports meaningful action toward gender equality.',
            tech: ['PHP', 'Laravel', 'MySQL', 'HTML5', 'CSS3'],
            repo: 'https://github.com/jeboysuganob15-create/gerimus_reporting_system',
            file: 'gerims',
            icon: 'fa-solid fa-scale-balanced',
            mockupTitle: 'GERIMS Reporting System',
            mockupTag: 'SDG 5 • Equality & Monitoring'
        }
    ];

    let currentIndex = 0;

    function renderProject(index) {
        const project = projects[index];

        carousel.innerHTML = `
            <div class="project-showcase-copy">
                <p class="project-label">${project.label}</p>
                <p class="project-theme">${project.theme}</p>
                <h3>${project.title}</h3>
                <p class="project-summary">${project.summary}</p>
                ${project.title === 'Sustainable Blue Economy Network Portal' ? '<p class="project-note">Note: This project is not fully finished.</p>' : ''}
                ${project.features && project.features.length ? `<ul class="feature-list">${project.features.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
                <a class="btn btn-primary project-btn" href="${project.repo}" target="_blank" rel="noopener">View Repository</a>
            </div>
            <aside class="project-mockup">
                <div class="mockup-window">
                    <div class="mockup-topbar"><span></span><span></span><span></span></div>
                    <div class="mockup-body">
                        <div class="mockup-icon"><i class="${project.icon}"></i></div>
                        <p class="mockup-file">${project.file}</p>
                        <h4>${project.mockupTitle}</h4>
                        <p class="mockup-tag">${project.mockupTag}</p>
                    </div>
                </div>
            </aside>
        `;
    }

    function showProject(step) {
        currentIndex = (currentIndex + step + projects.length) % projects.length;
        renderProject(currentIndex);
    }

    prevBtn.addEventListener('click', () => showProject(-1));
    nextBtn.addEventListener('click', () => showProject(1));

    renderProject(currentIndex);
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + '%';
        }
    }

    requestAnimationFrame(update);
}
