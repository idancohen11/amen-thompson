// Amen Thompson Trading Card - Interactive Features

// Animated Stat Counters
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');

    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(stat);
    });
}

// Signature Move Activation
function setupSignatureMove() {
    const activateButton = document.getElementById('activateMove');
    const modal = document.getElementById('moveModal');
    const closeButton = document.getElementById('closeModal');

    activateButton.addEventListener('click', () => {
        modal.classList.add('active');
        playDunkSound();
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Simulated dunk sound (visual feedback)
function playDunkSound() {
    // Create a visual "sound wave" effect
    const modal = document.getElementById('moveModal');
    const content = modal.querySelector('.modal-content');

    content.style.animation = 'none';
    setTimeout(() => {
        content.style.animation = 'modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 10);
}

// Card Tilt Effect (3D)
function setupCardTilt() {
    const card = document.querySelector('.card-container');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Easter Egg: Konami Code
function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    const card = document.querySelector('.card-container');
    card.style.animation = 'rainbowGlow 2s ease-in-out';

    setTimeout(() => {
        card.style.animation = '';
    }, 2000);

    // Add rainbow glow animation dynamically
    if (!document.getElementById('rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbowGlow {
                0% { box-shadow: 0 0 0 8px rgba(255, 0, 0, 0.8); }
                20% { box-shadow: 0 0 0 8px rgba(255, 165, 0, 0.8); }
                40% { box-shadow: 0 0 0 8px rgba(255, 255, 0, 0.8); }
                60% { box-shadow: 0 0 0 8px rgba(0, 255, 0, 0.8); }
                80% { box-shadow: 0 0 0 8px rgba(0, 0, 255, 0.8); }
                100% { box-shadow: 0 0 0 8px rgba(238, 130, 238, 0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('🏀 LEGENDARY COMBO ACTIVATED! 🏀');
}

// Achievement Badge Click Effects
function setupAchievements() {
    const badges = document.querySelectorAll('.achievement-badge');

    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            const icon = badge.querySelector('.badge-icon');
            const originalIcon = icon.textContent;

            icon.textContent = '✨';

            setTimeout(() => {
                icon.textContent = originalIcon;
            }, 1000);
        });
    });
}

// Smooth Scroll for Bio Items
function setupBioAnimations() {
    const bioItems = document.querySelectorAll('.bio-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    bioItems.forEach(item => observer.observe(item));
}

// Add touch support for mobile tilt
function setupMobileTilt() {
    const card = document.querySelector('.card-container');

    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
        window.addEventListener('deviceorientation', (e) => {
            const tiltX = e.beta ? e.beta / 2 : 0;  // -90 to 90
            const tiltY = e.gamma ? e.gamma / 2 : 0; // -90 to 90

            card.style.transform = `
                perspective(1000px)
                rotateX(${-tiltX}deg)
                rotateY(${tiltY}deg)
            `;
        });
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    setupSignatureMove();
    setupCardTilt();
    setupKonamiCode();
    setupAchievements();
    setupBioAnimations();
    setupMobileTilt();

    console.log('🏀 Amen Thompson Trading Card loaded! Try the Konami Code... 🏀');
});

// Add transition support to card
document.querySelector('.card-container').style.transition = 'transform 0.1s ease-out';
