// Loading Screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
});

// Scroll Progress Bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.setProperty('--scroll', `${scrolled}%`);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission with Animation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    document.body.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 3000);
});

// Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-progress') + '%';
                });
            }

            // Animate project cards when projects section is visible
            if (entry.target.id === 'projects') {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add floating animation to skill icons
document.querySelectorAll('.skill-card i').forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Add pulse animation to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.animation = 'pulse 1s ease infinite';
    });

    button.addEventListener('mouseleave', () => {
        button.style.animation = '';
    });
});

// Add form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add section header animations
document.querySelectorAll('section h2').forEach(header => {
    header.addEventListener('mouseenter', () => {
        header.style.animation = 'pulse 1s ease infinite';
    });

    header.addEventListener('mouseleave', () => {
        header.style.animation = '';
    });
});

// --- Dynamic Projects Section ---
const projects = [
  {
    name: "Furni",
    folder: "furni-1.0.0",
    image: "projects/furni-1.0.0/images/img-grid-1.jpg",
    description: "Modern furniture e-commerce template.",
    link: "projects/furni-1.0.0/index.html"
  },
  {
    name: "Louis Vuitton",
    folder: "Louis_Vuitton-main",
    image: "projects/Louis_Vuitton-main/assets/Hero Pages/i1.jpg",
    description: "Luxury brand landing page.",
    link: "projects/Louis_Vuitton-main/index.html"
  },
  {
    name: "Merlin Fashion",
    folder: "Merlin-Fashion-master",
    image: "projects/Merlin-Fashion-master/images/index-img/andres-jasso-PqbL_mxmaUE-unsplash (1).jpg",
    description: "Fashion store web template.",
    link: "projects/Merlin-Fashion-master/index.html"
  },
  {
    name: "Shoppers",
    folder: "shoppers-gh-pages",
    image: "projects/shoppers-gh-pages/images/hero_1.jpg",
    description: "Bootstrap-based shopping site.",
    link: "projects/shoppers-gh-pages/index.html"
  }
];

function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    card.innerHTML = `
      <img src="${project.image}" alt="${project.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
      <div class="project-overlay">
        <div class="project-overlay-content">
          <h3>View Details</h3>
          <p>Click to learn more about this project</p>
        </div>
      </div>
      <div class="project-content">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-links">
          <a href="${project.link}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>
        </div>
      </div>
    `;
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.querySelector('.project-overlay').style.opacity = '1';
      card.querySelector('.project-content').style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.project-overlay').style.opacity = '0';
      card.querySelector('.project-content').style.transform = 'translateY(0)';
    });
    grid.appendChild(card);
  });
  // Reveal project cards when they come into view
  const projectCards = grid.querySelectorAll('.project-card');
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  projectCards.forEach(card => projectObserver.observe(card));
}

document.addEventListener('DOMContentLoaded', loadProjects);

// Typing Animation for Hero Text
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = '';
  let i = 0;
  function typeWriter() {
      if (i < text.length) {
          heroText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
      }
  }
  // Start typing animation when page loads
  window.addEventListener('load', typeWriter);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Add hover effect to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.querySelector('i').style.transform = 'scale(1.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.querySelector('i').style.transform = 'scale(1)';
    });
}); 