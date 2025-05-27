// ===== مركز الإرادة للعلاج الطبيعي - ملف JavaScript الرئيسي =====

document.addEventListener('DOMContentLoaded', function() {

    // تهيئة المتغيرات
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // تأثير شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // قائمة الهاتف المحمول
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // تأثير الأيقونة
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');

            // إعادة تعيين أيقونة القائمة
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // تمييز الرابط النشط
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === currentPage ||
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveLink();

    // تأثيرات الحركة عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // مراقبة العناصر للحركة
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // تأثير الكتابة المتحركة للعنوان الرئيسي
    function typeWriter(element, text, speed = 100) {
        if (!element) return;

        element.innerHTML = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // تطبيق تأثير الكتابة على العنوان الرئيسي
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }

    // تأثير العد التصاعدي للأرقام
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // تطبيق العد التصاعدي على الإحصائيات
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // تأثير التمرير السلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80; // مراعاة ارتفاع شريط التنقل

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تأثير البطاقات التفاعلية
    const cards = document.querySelectorAll('.service-card, .benefit-card, .gallery-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // تحميل الصور بشكل تدريجي (Lazy Loading)
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // تأثير الجسيمات في الخلفية (اختياري)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // إضافة CSS للجسيمات
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
    `;
    document.head.appendChild(particleStyle);

    // تطبيق تأثير الجسيمات
    createParticles();

    // تحسين الأداء - تأخير تحميل المحتوى غير الضروري
    setTimeout(() => {
        // تحميل الخطوط الإضافية
        const fontLink = document.createElement('link');
        fontLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }, 1000);

    // معالجة الأخطاء
    window.addEventListener('error', function(e) {
        console.log('خطأ في تحميل المورد:', e.filename, e.message);
    });

    // تحسين تجربة المستخدم - إخفاء شاشة التحميل
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    console.log('🏥 مركز الإرادة للعلاج الطبيعي - تم تحميل الموقع بنجاح!');
});

// دالة إرسال طلب الحجز عبر الواتساب
function sendWhatsApp() {
    // جمع بيانات النموذج
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    // التحقق من الحقول المطلوبة
    if (!name || !phone || !service || !date || !time) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    // تنسيق الرسالة
    let message = `السلام عليكم ورحمة الله وبركاته 🌹\n\n`;
    message += `🏥 *طلب حجز موعد*\n`;
    message += `*مركز الإرادة للعلاج الطبيعي وإعادة التأهيل*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 *الاسم الكريم:* ${name}\n`;
    message += `📱 *رقم الهاتف:* ${phone}\n`;
    message += `🩺 *الخدمة المطلوبة:* ${service}\n`;
    message += `📅 *التاريخ المفضل:* ${date}\n`;
    message += `🕐 *الوقت المفضل:* ${time}\n`;

    if (notes) {
        message += `📝 *ملاحظات إضافية:* ${notes}\n`;
    }

    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `🙏 *يرجى تأكيد الموعد أو اقتراح موعد بديل مناسب*\n\n`;
    message += `شكراً لكم وبارك الله فيكم 🤲\n\n`;
    message += `📍 *العنوان:* محافظة إب - مدينة يريم - الشارع العام - مطعم الأندلس سابقاً`;

    // ترميز الرسالة للرابط
    const encodedMessage = encodeURIComponent(message);

    // رقم الواتساب (يمكن تغييره حسب الحاجة)
    const whatsappNumber = '967713095445';

    // إنشاء رابط الواتساب
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // فتح الواتساب
    window.open(whatsappURL, '_blank');
}

// دالة التحكم في أيقونات التواصل العائمة
function toggleFloatingContacts() {
    const floatingContacts = document.querySelector('.floating-contacts');
    floatingContacts.classList.toggle('active');
}

// إظهار الأيقونات العائمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إظهار الزر الرئيسي مع تأخير بسيط
    setTimeout(() => {
        const mainBtn = document.querySelector('.main-btn');
        if (mainBtn) {
            mainBtn.style.opacity = '1';
            mainBtn.style.transform = 'translateX(0)';
        }
    }, 1000);

    // إضافة تأثير النبض للواتساب كل 10 ثوان
    setInterval(() => {
        const whatsappBtns = document.querySelectorAll('.whatsapp-1, .whatsapp-2');
        whatsappBtns.forEach(btn => {
            btn.style.animation = 'none';
            setTimeout(() => {
                btn.style.animation = 'shake 0.5s ease-in-out 3';
            }, 100);
        });
    }, 10000);
});
