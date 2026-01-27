document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox Logic
    // Create lightbox elements dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <div id="lightbox-caption" class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Add click event to all images with class 'zoomable'
    const zoomableImages = document.querySelectorAll('.zoomable');
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            lightboxCaption.innerHTML = this.alt;
        });
    });

    // Close functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});