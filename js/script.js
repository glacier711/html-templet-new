// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    let currentSlide = 0;
    const slideInterval = 5000; // 轮播间隔(毫秒)，这里是5秒

    // 切换到指定幻灯片
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 上一张幻灯片
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 自动轮播
    let autoSlide = setInterval(nextSlide, slideInterval);

    // 鼠标悬停时暂停自动轮播
    const heroArea = document.querySelector('.hero-area');
    if (heroArea) {
        heroArea.addEventListener('mouseenter', () => clearInterval(autoSlide));
        heroArea.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    }

    // 为指示点添加点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoSlide);
            goToSlide(index);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    // 为导航箭头添加点击事件
    if(nextBtn) nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, slideInterval);
    });
    
    if(prevBtn) prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, slideInterval);
    });

    // 初始化：显示第一张幻灯片
    goToSlide(0);

    // 平滑滚动导航链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证逻辑
            const service = document.getElementById('service').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (!service || !name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // 模拟表单提交成功
            alert('Thank you! Your appointment request has been submitted. We will contact you shortly.');
            contactForm.reset();
        });
    }

    // 进度条动画
    const progressSection = document.querySelector('.growth-section');
    if (progressSection) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 当进度条进入视口时，触发动画
                    document.querySelectorAll('.progress-fill').forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 300);
                    });
                    
                    // 停止观察，避免重复触发
                    observer.unobserve(progressSection);
                }
            });
        }, observerOptions);
        
        observer.observe(progressSection);
    }
});
