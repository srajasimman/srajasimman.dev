// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Toggle mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a navigation link
        document.querySelectorAll('nav ul li a').forEach(function(navLink) {
            navLink.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (themeToggle && themeIcon) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');

        // Apply saved theme or default to light mode
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Active navigation links
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        sections.forEach(function(current) {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('nav ul li a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('nav ul li a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Here you would typically send this data to a server
            // For this example, we'll just log it to console and show an alert
            console.log({ name, email, subject, message });

            // Post the form submission to https://formspree.io/f/mpwdqgjq
            fetch('https://formspree.io/f/mpwdqgjq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
            )

            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Load resume data from JSON
    fetchResumeData();

    // Load GitHub repositories data from JSON
    fetchGitHubRepos();
});

// Function to fetch and load resume data
async function fetchResumeData() {
    try {
        const response = await fetch('data/resume.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resumeData = await response.json();

        // Process and display the resume data
        displaySkills(resumeData.skills);
        displayWorkExperience(resumeData.work);
        displayProjects(resumeData.projects);
    } catch (error) {
        console.error('Error loading resume data:', error);
    }
}

// Function to fetch and load GitHub repositories data
async function fetchGitHubRepos() {
    try {
        const response = await fetch('data/repos.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reposData = await response.json();

        // Display the GitHub repositories
        displayGitHubRepos(reposData);
    } catch (error) {
        console.error('Error loading GitHub repositories data:', error);
    }
}

// Function to display GitHub repositories
function displayGitHubRepos(repos) {
    const reposContainer = document.querySelector('.github-repos');

    if (!reposContainer || !repos || !repos.length) return;

    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'project-card'; // Using project-card class for consistency

        // Create tags HTML if repo has tags
        let tagsHTML = '';
        if (repo.tags && repo.tags.length) {
            tagsHTML = `
                <div class="project-highlights">
                    ${repo.tags.slice(0, 4).map(tag => `<li>${tag}</li>`).join('')}
                </div>
            `;
        }

        repoCard.innerHTML = `
            <div class="project-details">
                <div class="repo-header">
                    <i class="fab fa-github"></i>
                    <h3 class="project-title">${repo.name}</h3>
                </div>
                <p class="project-description">${repo.description}</p>
                ${tagsHTML}
                <div class="project-link">
                    <a href="${repo.url}" target="_blank" rel="noopener noreferrer">View Repository <i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `;

        reposContainer.appendChild(repoCard);
    });
}

// Function to display work experience
function displayWorkExperience(workHistory) {
    const timelineContainer = document.querySelector('.timeline');

    if (!timelineContainer || !workHistory || !workHistory.length) return;

    workHistory.forEach((job, index) => {
        const isEven = index % 2 === 0;
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`;

        const endDate = job.endDate === 'Present' ? 'Present' : formatDate(job.endDate);

        timelineItem.innerHTML = `
            <div class="timeline-content">
                <p class="timeline-date">${formatDate(job.startDate)} - ${endDate}</p>
                <h3 class="timeline-title">${job.name}</h3>
                <h4 class="timeline-subtitle">${job.position}</h4>
                <p class="timeline-description">${job.summary}</p>
                <ul class="timeline-highlights">
                    ${job.highlights.slice(0, 6).map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        `;

        timelineContainer.appendChild(timelineItem);
    });
}

// Function to display projects
function displayProjects(projects) {
    const projectsContainer = document.querySelector('.projects-content');

    if (!projectsContainer || !projects || !projects.length) return;

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const endDate = project.endDate ? formatDate(project.endDate) : 'Present';

        projectCard.innerHTML = `
            <div class="project-details">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-date">${formatDate(project.startDate)} - ${endDate}</p>
                <p class="project-description">${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}</p>
                <ul class="project-highlights">
                    ${project.highlights.slice(0, 2).map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
                ${project.url ? `
                <div class="project-link">
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer">View Project <i class="fas fa-external-link-alt"></i></a>
                </div>
                ` : ''}
            </div>
        `;

        projectsContainer.appendChild(projectCard);
    });
}

// Function to display skills
function displaySkills(skills) {
    const skillsContainer = document.querySelector('.skills-content');

    if (!skillsContainer || !skills || !skills.length) return;

    skillsContainer.innerHTML = '';

    skills.forEach(skill => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';
        skillCategory.innerHTML = `
            <h3>${skill.name}</h3>
            <div class="skill-chips">
                ${(skill.keywords && skill.keywords.length) ? skill.keywords.map(keyword => `<span class="skill-chip">${keyword}</span>`).join('') : ''}
            </div>
        `;
        skillsContainer.appendChild(skillCategory);
    });
}

// Format date function
function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${month} ${year}`;
}

// Add animation when elements come into view
function addScrollAnimation() {
    const elementsToAnimate = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}
