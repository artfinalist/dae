document.addEventListener('DOMContentLoaded', function() {
    // --- UNIFICAÇÃO DO CÓDIGO DENTRO DE UM ÚNICO DOMContentLoaded ---

    // --- MENU MOBILE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- MODAL DE PRODUTO ---
    const modal = document.getElementById('product-modal');
    const productCards = document.querySelectorAll('.product-card');

    if (modal && productCards.length > 0) {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeBtn = document.querySelector('.close-btn');

        productCards.forEach(card => {
            card.addEventListener('click', () => {
                // Verifica se os data attributes existem antes de usá-los
                if (card.dataset.img && card.dataset.title && card.dataset.description) {
                    modalImg.src = card.dataset.img; // CORRIGIDO: Removido o 'img/' duplicado
                    modalTitle.textContent = card.dataset.title;
                    modalDescription.textContent = card.dataset.description;
                    modal.style.display = 'block';
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // --- SELETOR DE TEMA (DARK/LIGHT MODE) ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') {
                themeToggle.checked = true;
            }
        }

        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode'); // Corrigido para 'light-mode'
            }
        });
    }

    // --- ROTAÇÃO DO LOGO 3D ---
    const logo3D = document.getElementById('logo-3d');
    if (logo3D) {
        logo3D.addEventListener('load', () => {
            const initialRadius = logo3D.getCameraOrbit().radius;

            window.addEventListener('scroll', () => {
                // Calcula a altura máxima de scroll
                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                
                // Evita divisão por zero se a página não for rolável
                if (scrollableHeight <= 0) return;

                // Calcula a porcentagem de scroll (de 0 a 1)
                const scrollFraction = window.scrollY / scrollableHeight;

                // Multiplica a porcentagem por 360 para obter o grau de rotação
                const rotationDegree = scrollFraction * 360;

                // Ângulo inicial de phi é ~90deg (visão frontal). Somamos nossa rotação a ele.
                const newPhi = 90 + rotationDegree;
                
                // Aplica a rotação no eixo X (vertical)
                logo3D.cameraOrbit = `0deg ${newPhi}deg ${initialRadius}m`;
            });
        });
    }
});
