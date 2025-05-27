// ===== مركز الإرادة للعلاج الطبيعي - ملف JavaScript للاتصال =====

document.addEventListener('DOMContentLoaded', function() {
    
    // معلومات الاتصال
    const contactInfo = {
        phone: '771571232',
        whatsapp1: '713095445',
        whatsapp2: '773142547',
        address: 'اب - يريم - الشارع العام - مطعم الاندلس سابقاً',
        coordinates: '79WG+RV يريم، اليمن'
    };
    
    // نموذج حجز الموعد
    const appointmentForm = document.getElementById('appointmentForm');
    const contactForm = document.getElementById('contactForm');
    
    // معالجة نموذج حجز الموعد
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                date: formData.get('date'),
                time: formData.get('time'),
                notes: formData.get('notes') || 'لا توجد ملاحظات إضافية'
            };
            
            // التحقق من صحة البيانات
            if (!validateForm(data)) {
                return;
            }
            
            // إنشاء رسالة الواتساب
            const message = createWhatsAppMessage(data, 'appointment');
            
            // إرسال عبر الواتساب
            sendWhatsAppMessage(message, contactInfo.whatsapp1);
            
            // إظهار رسالة نجاح
            showSuccessMessage('تم إرسال طلب حجز الموعد بنجاح! سيتم التواصل معك قريباً.');
            
            // إعادة تعيين النموذج
            this.reset();
        });
    }
    
    // معالجة نموذج الاتصال العام
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            if (!validateContactForm(data)) {
                return;
            }
            
            const message = createWhatsAppMessage(data, 'contact');
            sendWhatsAppMessage(message, contactInfo.whatsapp1);
            
            showSuccessMessage('تم إرسال رسالتك بنجاح! سيتم الرد عليك في أقرب وقت.');
            this.reset();
        });
    }
    
    // التحقق من صحة نموذج الموعد
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('يرجى إدخال اسم صحيح (حرفين على الأقل)');
        }
        
        if (!data.phone || !isValidPhone(data.phone)) {
            errors.push('يرجى إدخال رقم هاتف صحيح');
        }
        
        if (!data.service) {
            errors.push('يرجى اختيار نوع الخدمة');
        }
        
        if (!data.date) {
            errors.push('يرجى اختيار تاريخ الموعد');
        } else {
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                errors.push('لا يمكن حجز موعد في تاريخ سابق');
            }
            
            // التحقق من أن التاريخ ليس يوم جمعة
            if (selectedDate.getDay() === 5) {
                errors.push('المركز مغلق يوم الجمعة، يرجى اختيار تاريخ آخر');
            }
        }
        
        if (!data.time) {
            errors.push('يرجى اختيار وقت الموعد');
        }
        
        if (errors.length > 0) {
            showErrorMessage(errors.join('\n'));
            return false;
        }
        
        return true;
    }
    
    // التحقق من صحة نموذج الاتصال
    function validateContactForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('يرجى إدخال اسم صحيح');
        }
        
        if (!data.phone || !isValidPhone(data.phone)) {
            errors.push('يرجى إدخال رقم هاتف صحيح');
        }
        
        if (data.email && !isValidEmail(data.email)) {
            errors.push('يرجى إدخال بريد إلكتروني صحيح');
        }
        
        if (!data.subject || data.subject.trim().length < 3) {
            errors.push('يرجى إدخال موضوع الرسالة');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('يرجى إدخال رسالة (10 أحرف على الأقل)');
        }
        
        if (errors.length > 0) {
            showErrorMessage(errors.join('\n'));
            return false;
        }
        
        return true;
    }
    
    // التحقق من صحة رقم الهاتف
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
        return phoneRegex.test(phone.trim());
    }
    
    // التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
    
    // إنشاء رسالة الواتساب
    function createWhatsAppMessage(data, type) {
        let message = '';
        
        if (type === 'appointment') {
            message = `🏥 *طلب حجز موعد - مركز الإرادة للعلاج الطبيعي*\n\n`;
            message += `👤 *الاسم:* ${data.name}\n`;
            message += `📱 *رقم الهاتف:* ${data.phone}\n`;
            message += `🩺 *نوع الخدمة:* ${data.service}\n`;
            message += `📅 *تاريخ الموعد:* ${formatDate(data.date)}\n`;
            message += `⏰ *وقت الموعد:* ${data.time}\n`;
            message += `📝 *ملاحظات:* ${data.notes}\n\n`;
            message += `يرجى تأكيد الموعد أو اقتراح وقت بديل. شكراً لكم.`;
        } else if (type === 'contact') {
            message = `📧 *رسالة جديدة - مركز الإرادة للعلاج الطبيعي*\n\n`;
            message += `👤 *الاسم:* ${data.name}\n`;
            message += `📱 *رقم الهاتف:* ${data.phone}\n`;
            if (data.email) {
                message += `📧 *البريد الإلكتروني:* ${data.email}\n`;
            }
            message += `📋 *الموضوع:* ${data.subject}\n`;
            message += `💬 *الرسالة:*\n${data.message}\n\n`;
            message += `يرجى الرد في أقرب وقت ممكن. شكراً لكم.`;
        }
        
        return message;
    }
    
    // تنسيق التاريخ
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        return date.toLocaleDateString('ar-SA', options);
    }
    
    // إرسال رسالة الواتساب
    function sendWhatsAppMessage(message, phoneNumber) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/967${phoneNumber}?text=${encodedMessage}`;
        
        // فتح الواتساب في نافذة جديدة
        window.open(whatsappUrl, '_blank');
    }
    
    // إظهار رسالة نجاح
    function showSuccessMessage(message) {
        showNotification(message, 'success');
    }
    
    // إظهار رسالة خطأ
    function showErrorMessage(message) {
        showNotification(message, 'error');
    }
    
    // إظهار الإشعارات
    function showNotification(message, type) {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // إضافة التصميم
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
        `;
        
        // إضافة إلى الصفحة
        document.body.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // إخفاء الإشعار تلقائياً
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // إضافة حدث الإغلاق
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    // إخفاء الإشعار
    function hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // أزرار الاتصال السريع
    const quickCallBtns = document.querySelectorAll('.quick-call');
    quickCallBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('data-phone');
            window.open(`tel:+967${phoneNumber}`, '_self');
        });
    });
    
    // أزرار الواتساب السريع
    const quickWhatsAppBtns = document.querySelectorAll('.quick-whatsapp');
    quickWhatsAppBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('data-phone');
            const defaultMessage = 'السلام عليكم، أريد الاستفسار عن خدمات مركز الإرادة للعلاج الطبيعي.';
            sendWhatsAppMessage(defaultMessage, phoneNumber);
        });
    });
    
    console.log('📞 نظام الاتصال جاهز - مركز الإرادة للعلاج الطبيعي');
});
