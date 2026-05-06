/* ========================= */
// MENU MOBILE
/* ========================= */
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        
        // Trocar ícone do menu
        const icon = mobileMenu.querySelector("i");
        if (icon) {
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        }
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            mobileMenu.classList.remove("open");
            const icon = mobileMenu.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    });
}

/* ========================= */
// HEADER SCROLL EFFECT
/* ========================= */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ========================= */
// TABS (SERVIÇOS)
/* ========================= */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active de todos
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Ativa o atual
            button.classList.add("active");
            const target = button.getAttribute("data-tab");
            const activeContent = document.getElementById(target);
            if (activeContent) {
                activeContent.classList.add("active");
            }
        });
    });
}

/* ========================= */
// SCROLL SUAVE PARA ÂNCORAS
/* ========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* ========================= */
// WHATSAPP DINÂMICO
/* ========================= */
const whatsappBtn = document.querySelector(".whatsapp-float");

if (whatsappBtn) {
    whatsappBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        let message = "Olá! Gostaria de agendar um horário no Studio Nail Art.";
        
        // Verifica se está na página de serviços
        const activeService = document.querySelector(".servico-item:hover h3");
        if (activeService) {
            message = `Olá! Tenho interesse no serviço: ${activeService.innerText}. Pode me passar mais informações?`;
        }
        
        const phone = "5511913340706";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });
}

/* ========================= */
// BOTÕES DE AGENDAMENTO INTELIGENTES
/* ========================= */
document.querySelectorAll(".btn-primary").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const btnText = btn.innerText.toLowerCase();
        
        if (btnText.includes("agendar") || btnText.includes("whatsapp") || btnText.includes("assinar")) {
            e.preventDefault();
            
            let message = "Olá! Quero agendar um horário. Já li as políticas e gostaria de verificar disponibilidade.";
            
            // Personalizar mensagem para pacotes
            const pacoteCard = btn.closest(".pacote-card");
            if (pacoteCard) {
                const pacoteNome = pacoteCard.querySelector("h3")?.innerText;
                if (pacoteNome) {
                    message = `Olá! Tenho interesse no ${pacoteNome}. Gostaria de mais informações e disponibilidade.`;
                }
            }
            
            const phone = "5511913340706";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        }
    });
});

/* ========================= */
// ANIMAÇÃO AO SCROLL (Intersection Observer)
/* ========================= */
const elements = document.querySelectorAll(".servico-item, .diferencial-card, .info-box, .valor-item, .pacote-card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            // Desobserva após aparecer
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -20px 0px"
});

elements.forEach(el => observer.observe(el));

/* ========================= */
// ADICIONAR CLASSE SHOW AOS ELEMENTOS VISÍVEIS INICIALMENTE
/* ========================= */
setTimeout(() => {
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
}, 100);

/* ========================= */
// TYPEWRITER EFFECT (HERO)
/* ========================= */
const typeText = document.querySelector(".typewriter");

if (typeText) {
    const texts = ["Transforme suas unhas em arte.", "Beleza e sofisticação.", "Cuidado profissional."];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typeText.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeText.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
            return;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
}

/* ========================= */
// PREVENIR SUBMISSÃO DE FORMULÁRIO (se existir)
/* ========================= */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Pegar dados do formulário
        const nome = document.getElementById("nome")?.value;
        const email = document.getElementById("email")?.value;
        const mensagem = document.getElementById("mensagem")?.value;
        
        if (!nome || !email || !mensagem) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        
        // Criar mensagem para WhatsApp
        const whatsappMessage = `Olá! Meu nome é ${nome}.${mensagem ? `\n\n${mensagem}` : ""}\n\nE-mail: ${email}`;
        const phone = "5511913340706";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(url, "_blank");
        contactForm.reset();
    });
}

/* ========================= */
// CARREGAMENTO SUAVE DA PÁGINA
/* ========================= */
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 50);
});

/* ========================= */
// NOTIFICAÇÃO SIMPLES (opcional)
/* ========================= */
function showMessage(text, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
        <span>${text}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : "#f44336"};
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar animações de notificação se não existirem
if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
