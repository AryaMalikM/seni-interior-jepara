// NAVIGATION MENU TOGGLE
const menuIcon = document.getElementById('menu-icon');
const menuList = document.getElementById('menu-list');

function toggleMenu() {
    menuList.classList.toggle("hidden");
}

menuIcon.addEventListener("click", toggleMenu);

// COUNTER ANIMATION
function initCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
        console.log("Counter elements not found");
        return;
    }
    
    const animateCounter = (element, target, duration) => {
        const start = 0;
        const startTime = performance.now();
        const isPercentage = element.parentElement.querySelector('.stat-label').textContent.includes('%');
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.floor(progress * target);
            
            element.textContent = isPercentage ? currentValue + '%' : currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (!isPercentage && target >= 1000) {
                    element.textContent = (target / 1000).toFixed(1) + 'K+';
                } else if (!isPercentage) {
                    element.textContent = target + '+';
                }
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    const startCounters = () => {
        console.log("Starting counters...");
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = parseInt(stat.getAttribute('data-duration'));
            animateCounter(stat, target, duration);
        });
    };
    
    // Gunakan Intersection Observer dengan opsi yang lebih sensitif
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Counter section is visible");
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1, // Lebih sensitif
        rootMargin: '0px 0px -50px 0px' // Memicu saat 50px dari bawah masuk viewport
    });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    } else {
        console.log("Stats section not found");
        // Fallback: Jalankan counter setelah timeout jika Observer gagal
        setTimeout(startCounters, 1000);
    }
}

// Pastikan DOM sepenuhnya dimuat sebelum menjalankan counter
if (document.readyState === 'complete') {
    initCounter();
} else {
    window.addEventListener('load', initCounter);
    document.addEventListener('DOMContentLoaded', initCounter);
}