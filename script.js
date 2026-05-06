/* ========================= */
/* MENU MOBILE */
/* ========================= */
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("open");
});

/* ========================= */
/* FECHAR MENU AO CLICAR */
/* ========================= */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("open");
    });
});


/* ========================= */
/* TABS (SERVIÇOS) */
/* ========================= */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove active de todos
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        // Ativa atual
        button.classList.add("active");

        const target = button.getAttribute("data-tab");
        document.getElementById(target).classList.add("active");
    });
});


/* ========================= */
/* SCROLL SUAVE */
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
/* HEADER SCROLL EFFECT */
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
/* WHATSAPP DINÂMICO */
/* ========================= */
const whatsappBtn = document.querySelector(".whatsapp-float");

if (whatsappBtn) {
    whatsappBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let message = "Olá! Gostaria de agendar um horário.";

        // Se estiver na página de serviços, tenta pegar o serviço clicado
        const activeService = document.querySelector(".servico-item:hover h3");

        if (activeService) {
            message = `Olá! Tenho interesse no serviço: ${activeService.innerText}. Pode me passar disponibilidade?`;
        }

        const phone = "5511913340706";

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });
}


/* ========================= */
/* ANIMAÇÃO AO SCROLL */
/* ========================= */
const elements = document.querySelectorAll(".servico-item, .diferencial-card, .info-box");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

elements.forEach(el => observer.observe(el));


/* ========================= */
/* BOTÃO "AGENDAR" INTELIGENTE */
/* ========================= */
document.querySelectorAll(".btn-primary").forEach(btn => {
    btn.addEventListener("click", (e) => {

        if (btn.innerText.toLowerCase().includes("agendar")) {
            e.preventDefault();

            const message = "Olá! Quero agendar um horário. Já li as políticas e gostaria de verificar disponibilidade.";

            const url = `https://wa.me/5511913340706?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        }
    });
});


/* ========================= */
/* TYPEWRITER (HERO) */
/* ========================= */
const typeText = document.querySelector(".typewriter");

if (typeText) {
    const text = "Transforme suas unhas em arte.";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typeText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 50);
        }
    }

    typeEffect();
}
