// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 关闭公告栏功能
    const closeAnnouncementBtn = document.querySelector('.close-announcement');
    const announcementBar = document.querySelector('.announcement-bar');
    
    if (closeAnnouncementBtn && announcementBar) {
        closeAnnouncementBtn.addEventListener('click', function() {
            announcementBar.style.display = 'none';
        });
    }
    
    // 2. 移动端导航菜单切换
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // 3. 滚动时固定头部
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // 4. 项目筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有按钮的激活状态
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 为当前点击的按钮添加激活状态
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // 根据筛选值显示/隐藏项目卡片
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // 5. 客户评价轮播
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // 显示指定索引的幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // 移除所有圆点的激活状态
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 显示当前幻灯片并激活对应的圆点
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    if (prevBtn && nextBtn && dots.length > 0) {
        // 下一张按钮点击事件
        nextBtn.addEventListener('click', function() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= testimonialCards.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        });
        
        // 上一张按钮点击事件
        prevBtn.addEventListener('click', function() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = testimonialCards.length - 1;
            }
            showSlide(prevIndex);
        });
        
        // 圆点点击事件
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // 自动轮播（每5秒切换一次）
        setInterval(() => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= testimonialCards.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        }, 5000);
    }
    
    // 6. 预约表单提交
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单值
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const service = this.querySelector('select').value;
            
            // 基本验证
            if (!name || !email || !service) {
                alert('Please fill in all fields.');
                return;
            }
            
            // 在实际应用中，这里应该发送数据到服务器
            alert(`Thank you, ${name}! Your appointment request has been received. We will contact you at ${email} regarding ${service} services.`);
            
            // 重置表单
            this.reset();
        });
    }
    
    // 7. 新闻订阅表单提交
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // 在实际应用中，这里应该发送数据到服务器
            alert(`Thank you for subscribing to our newsletter! A confirmation has been sent to ${email}.`);
            
            // 清空输入框
            emailInput.value = '';
        });
    }
    
    // 8. 返回顶部按钮
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 9. 滚动动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .project-card, .team-member, .pricing-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 设置动画元素的初始状态
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .project-card, .team-member, .pricing-card, .blog-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // 页面加载时立即检查一次
    animateOnScroll();
    
    // 10. 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 跳过仅包含"#"的链接
            if (href === '#') return;
            
            // 检查是否为内部锚点链接
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 11. 根据滚动位置高亮导航链接
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // 12. 移动端下拉菜单功能
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            // 在移动设备上，点击切换下拉菜单
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 关闭其他下拉菜单
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // 切换当前下拉菜单
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // 点击外部区域关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // 13. 进度条动画
    const statProgressBars = document.querySelectorAll('.stat-progress');
    
    const animateStats = function() {
        statProgressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease';
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    window.addEventListener('scroll', animateStats);
    // 初始检查
    animateStats();
});
