// Script pour Le Café des Devs

document.addEventListener('DOMContentLoaded', function() {
    
    // BUG HOTFIX #2: Mauvais sélecteur - le bouton a l'ID "btn-reservation"
    const reservationBtn = document.getElementById('reservationBtn');
    
    if (reservationBtn) {
        reservationBtn.addEventListener('click', function() {
            alert('Merci pour votre intérêt ! La réservation sera bientôt disponible.');
        });
    }
    
    // Smooth scroll pour la navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // BUG HOTFIX #3: Gestion du formulaire de contact - manque l'événement
    const contactForm = document.getElementById('contact-form');
    
    // Le formulaire ne se soumet pas car il manque l'écouteur d'événement
    // À ajouter : contactForm.addEventListener('submit', handleContactSubmit);
    
    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.feature-card, .menu-card, .team-member');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    console.log('Script chargé ✅');
});

// Fonction pour gérer la soumission du formulaire de contact
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simulation d'envoi
    alert(`Merci ${name} ! Votre message a été envoyé.\n\nNous vous répondrons à ${email} dans les plus brefs délais.`);
    
    // Reset du formulaire
    document.getElementById('contact-form').reset();
}

// FEATURE #5: Fonction pour la newsletter (à implémenter)
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            alert('Merci de vous être inscrit à notre newsletter !');
            emailInput.value = '';
        } else {
            alert('Veuillez entrer une adresse email valide.');
        }
    }
}