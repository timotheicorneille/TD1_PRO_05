// Effet de particules flottantes
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(0, 245, 160, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 15}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Animation de particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
            opacity: 0.8;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
            opacity: 0.5;
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// Effet de suivi de la souris sur les cartes
function addMouseTrackingEffect() {
    const cards = document.querySelectorAll('.cartePresentation');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Compteur animé pour l'âge
function animateNumbers() {
    const descriptions = document.querySelectorAll('.description p');
    
    descriptions.forEach(desc => {
        const text = desc.innerHTML;
        const ageMatch = text.match(/j'ai\s+(\d+)\s+ans/i);
        
        if (ageMatch) {
            const targetAge = parseInt(ageMatch[1]);
            let currentAge = 0;
            let hasAnimated = false;
            
            const updateAge = () => {
                if (currentAge < targetAge) {
                    currentAge++;
                    desc.innerHTML = text.replace(/(\d+)(?=\s+ans)/i, currentAge);
                    setTimeout(updateAge, 50);
                } else {
                    desc.innerHTML = text.replace(/(\d+)(?=\s+ans)/i, targetAge);
                }
            };
            
            // Mettre à 0 au début
            desc.innerHTML = text.replace(/(\d+)(?=\s+ans)/i, '0');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        setTimeout(updateAge, 300);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(desc);
        }
    });
}

// Effet de typage pour les titres
function typeWriterEffect() {
    const titles = document.querySelectorAll('h2');
    
    titles.forEach((title, index) => {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';
        
        let charIndex = 0;
        
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    title.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 500);
    });
}

// Animation des items de liste au survol
function animateListItems() {
    const items = document.querySelectorAll('.itemList');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Effet de révélation au scroll
function revealOnScroll() {
    const cards = document.querySelectorAll('.part-L');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
    
    // Ajouter le style pour l'animation
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .part-L.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    `;
    document.head.appendChild(revealStyle);
}

// Effet de click sur les sections
function addClickEffects() {
    const sections = document.querySelectorAll('.description, .loisir, .pSco');
    
    sections.forEach(section => {
        section.addEventListener('click', function(e) {
            // Créer un effet de ripple
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: 20px;
                height: 20px;
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Ajouter l'animation ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(15);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Effet parallaxe sur les émojis
function parallaxEmojis() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        const descriptions = document.querySelectorAll('.description, .loisir, .pSco');
        descriptions.forEach(desc => {
            const emoji = desc.querySelector('::before');
            if (desc.style) {
                desc.style.setProperty('--mouse-x', `${moveX}px`);
                desc.style.setProperty('--mouse-y', `${moveY}px`);
            }
        });
    });
}

// Mode sombre/clair toggle (bonus)
function addThemeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1) rotate(20deg)';
    });
    
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1) rotate(0deg)';
    });
    
    toggle.addEventListener('click', () => {
        document.body.style.transition = 'all 0.5s ease';
        const currentBg = document.body.style.background;
        
        if (!currentBg || currentBg.includes('#0f0f1e')) {
            document.body.style.background = '#f0f0f5';
            toggle.innerHTML = '☀️';
        } else {
            document.body.style.background = '#0f0f1e';
            toggle.innerHTML = '🌙';
        }
    });
    
    document.body.appendChild(toggle);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    addMouseTrackingEffect();
    animateNumbers();
    typeWriterEffect();
    animateListItems();
    revealOnScroll();
    addClickEffects();
    parallaxEmojis();
    addThemeToggle();
    
    console.log('🎉 Site interactif chargé avec succès !');
});
