   let currentSlide = 0;
        let currentImages = [];
        let currentTitle = '';
        let isAnimating = false;
        
       function openSlider(title, images) {
    currentSlide = 0;
    currentImages = images;
    currentTitle = title;
    
    const sliderImages = document.getElementById('sliderImages');
    sliderImages.innerHTML = '';
    sliderImages.style.transform = 'translateX(0)';
    
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = title + ' ' + (index + 1);
        img.className = 'slider-image' + (index === 0 ? ' active' : '');
        img.style.width = '100%';
        sliderImages.appendChild(img);
    });
    
    const modal = document.getElementById('sliderModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    isAnimating = false;
}
        
        function closeSlider() {
            const modal = document.getElementById('sliderModal');
            modal.classList.remove('show');
          
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        function changeSlide(direction) {
            if (isAnimating) return;
            isAnimating = true;
            
            const slides = document.querySelectorAll('.slider-image');
            if (slides.length === 0) return;
            
            // Nonaktifkan slide saat ini
            slides[currentSlide].classList.remove('active');
            
            // Hitung slide baru
            currentSlide += direction;
            
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            
            // Animasi slide
            const sliderImages = document.getElementById('sliderImages');
            sliderImages.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Aktifkan slide baru setelah delay kecil
            setTimeout(() => {
                slides[currentSlide].classList.add('active');
                isAnimating = false;
            }, 100);
        }
        
        // Event listeners
        document.getElementById('sliderModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeSlider();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (document.getElementById('sliderModal').style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    changeSlide(-1);
                } else if (e.key === 'ArrowRight') {
                    changeSlide(1);
                } else if (e.key === 'Escape') {
                    closeSlider();
                }
            }
        });