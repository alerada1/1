// بوت المحادثة الذكي لمركز الإرادة
class AlIradahChatBot {
    constructor() {
        this.isOpen = false;
        this.currentStep = 'welcome';
        this.userName = '';
        this.init();
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
    }

    createChatWidget() {
        // إنشاء الأيقونة العائمة
        const chatIcon = document.createElement('div');
        chatIcon.className = 'chat-icon';
        chatIcon.innerHTML = `
            <i class="fas fa-comments"></i>
            <span class="chat-notification">1</span>
        `;

        // إنشاء نافذة المحادثة
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-info">
                    <img src="al.png" alt="مركز الإرادة" class="chat-avatar">
                    <div>
                        <h4>مساعد مركز الإرادة</h4>
                        <span class="chat-status">متصل الآن</span>
                    </div>
                </div>
                <button class="chat-close" onclick="chatBot.toggleChat()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot-message">
                    <div class="message-content">
                        <p>السلام عليكم ورحمة الله وبركاته 🌹</p>
                        <p>أهلاً وسهلاً بكم في <strong>مركز الإرادة للعلاج الطبيعي وإعادة التأهيل</strong></p>
                        <p>أنا المساعد الذكي للمركز، كيف يمكنني مساعدتكم اليوم؟</p>
                    </div>
                </div>
            </div>
            <div class="chat-options" id="chatOptions">
                <button class="option-btn" onclick="chatBot.showServices()">
                    <i class="fas fa-medical-kit"></i> الخدمات الطبية
                </button>
                <button class="option-btn" onclick="chatBot.showDepartments()">
                    <i class="fas fa-hospital"></i> أقسام المركز
                </button>
                <button class="option-btn" onclick="chatBot.showInfo()">
                    <i class="fas fa-info-circle"></i> معلومات المركز
                </button>
                <button class="option-btn" onclick="chatBot.showContact()">
                    <i class="fas fa-phone"></i> معلومات الاتصال
                </button>
                <button class="option-btn" onclick="chatBot.bookAppointment()">
                    <i class="fas fa-calendar-check"></i> حجز موعد
                </button>
            </div>
        `;

        // إضافة العناصر للصفحة
        document.body.appendChild(chatIcon);
        document.body.appendChild(chatWindow);

        // حفظ المراجع
        this.chatIcon = chatIcon;
        this.chatWindow = chatWindow;
        this.chatMessages = document.getElementById('chatMessages');
        this.chatOptions = document.getElementById('chatOptions');
    }

    bindEvents() {
        this.chatIcon.addEventListener('click', () => this.toggleChat());

        // إظهار الإشعار بعد 3 ثوان
        setTimeout(() => {
            this.showNotification();
        }, 3000);
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatWindow.classList.toggle('open', this.isOpen);
        this.chatIcon.classList.toggle('active', this.isOpen);

        if (this.isOpen) {
            this.hideNotification();
        }
    }

    showNotification() {
        if (!this.isOpen) {
            this.chatIcon.classList.add('notification');
        }
    }

    hideNotification() {
        this.chatIcon.classList.remove('notification');
        const notification = this.chatIcon.querySelector('.chat-notification');
        if (notification) {
            notification.style.display = 'none';
        }
    }

    addMessage(content, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showBackButton() {
        this.chatOptions.innerHTML = `
            <button class="option-btn back-btn" onclick="chatBot.showMainMenu()">
                <i class="fas fa-arrow-right"></i> العودة للقائمة الرئيسية
            </button>
        `;
    }

    showMainMenu() {
        this.chatOptions.innerHTML = `
            <button class="option-btn" onclick="chatBot.showServices()">
                <i class="fas fa-medical-kit"></i> الخدمات الطبية
            </button>
            <button class="option-btn" onclick="chatBot.showDepartments()">
                <i class="fas fa-hospital"></i> أقسام المركز
            </button>
            <button class="option-btn" onclick="chatBot.showInfo()">
                <i class="fas fa-info-circle"></i> معلومات المركز
            </button>
            <button class="option-btn" onclick="chatBot.showContact()">
                <i class="fas fa-phone"></i> معلومات الاتصال
            </button>
            <button class="option-btn" onclick="chatBot.bookAppointment()">
                <i class="fas fa-calendar-check"></i> حجز موعد
            </button>
        `;
    }

    showServices() {
        const servicesContent = `
            <h4>🩺 خدماتنا الطبية المتخصصة</h4>
            <p>نقدم <strong>12 خدمة متخصصة</strong> في العلاج الطبيعي وإعادة التأهيل:</p>
            <ul>
                <li>🧠 حالات تأهيل الشلل النصفي والوجهي وشلل الأطفال</li>
                <li>🦴 تأهيل ما بعد الكسور والحوادث</li>
                <li>💓 تأهيل ما بعد الإصابات بالجلطات</li>
                <li>🦴 تأهيل المفاصل والعمود الفقري ومعالجة انحراف العمود الفقري</li>
                <li>👶 تأهيل الشلل الدماغي (ضمور الدماغ) للأطفال</li>
                <li>⚕️ التأهيل بعد عمليات تبديل المفصل</li>
                <li>🤕 معالجة آلام الرقبة والظهر والعمود الفقري</li>
                <li>💪 معالجة الألم العضلي والشد العضلي</li>
                <li>🏃 معالجة الإصابات الرياضية والالتواءات</li>
                <li>🦴 معالجة التهابات المفاصل والآلام المزمنة</li>
                <li>🧘 الوخز بالإبر الصينية</li>
                <li>⭕ الحجامة الإسلامية الطبيعية</li>
                <li>👐 التدليك والمساج الطبيعي</li>
            </ul>
            <p>💡 <em>جميع خدماتنا تُقدم بأحدث التقنيات وعلى أيدي متخصصين مؤهلين</em></p>
        `;

        this.addMessage(servicesContent);
        this.showBackButton();
    }

    showDepartments() {
        const departmentsContent = `
            <h4>🏥 أقسام المركز المتخصصة</h4>
            <p>يضم مركزنا <strong>7 أقسام متخصصة</strong> مجهزة بأحدث الأجهزة:</p>
            <div class="departments-list">
                <div class="dept-item">
                    <strong>🔴 قسم الأشعة تحت الحمراء</strong>
                    <p>لمعالجة الشد العضلي وتحسين الدورة الدموية</p>
                </div>
                <div class="dept-item">
                    <strong>🦴 قسم شد الفقرات الإلكتروني</strong>
                    <p>لمعالجة الإنزلاق الغضروفي بأحدث التقنيات</p>
                </div>
                <div class="dept-item">
                    <strong>💉 قسم الوخز بالإبر الصينية</strong>
                    <p>لمعالجة شلل الوجه (العصب السابع) والآلام المزمنة</p>
                </div>
                <div class="dept-item">
                    <strong>🌊 قسم الموجات فوق الصوتية</strong>
                    <p>لمعالجة تيبس المفاصل والالتهابات</p>
                </div>
                <div class="dept-item">
                    <strong>⚡ قسم تحفيز العضلات والأعصاب</strong>
                    <p>بالتحفيز الكهربائي المتطور</p>
                </div>
                <div class="dept-item">
                    <strong>⭕ قسم الحجامة الإسلامية</strong>
                    <p>بطرق حديثة وآمنة وفقاً للسنة النبوية</p>
                </div>
                <div class="dept-item">
                    <strong>👐 قسم التدليك والمساج</strong>
                    <p>العلاج اليدوي المتخصص والطبيعي</p>
                </div>
            </div>
        `;

        this.addMessage(departmentsContent);
        this.showBackButton();
    }

    showInfo() {
        const infoContent = `
            <h4>ℹ️ معلومات مركز الإرادة</h4>
            <div class="info-section">
                <h5>🎯 رؤيتنا</h5>
                <p>أن نكون المركز الرائد في مجال العلاج الطبيعي وإعادة التأهيل في اليمن</p>

                <h5>📋 رسالتنا</h5>
                <p>تقديم خدمات علاج طبيعي شاملة وعالية الجودة باستخدام أحدث التقنيات</p>

                <h5>⭐ مميزاتنا</h5>
                <ul>
                    <li>👨‍⚕️ فريق طبي متخصص ومؤهل</li>
                    <li>🔬 أحدث الأجهزة والتقنيات</li>
                    <li>🏥 بيئة علاجية آمنة ومعقمة</li>
                    <li>💰 أسعار مناسبة ومعقولة</li>
                    <li>🕐 مواعيد مرنة تناسب المرضى</li>
                    <li>❤️ رعاية شخصية لكل مريض</li>
                </ul>

                <h5>🏆 إنجازاتنا</h5>
                <p>✅ أكثر من 1000 حالة شفاء بنجاح<br>
                ✅ 12 خدمة طبية متخصصة<br>
                ✅ 7 أقسام مجهزة بأحدث التقنيات<br>
                ✅ 15 سنة خبرة في المجال الطبي</p>
            </div>
        `;

        this.addMessage(infoContent);
        this.showBackButton();
    }

    showContact() {
        const contactContent = `
            <h4>📞 معلومات الاتصال</h4>
            <div class="contact-info">
                <div class="contact-item">
                    <strong>📱 أرقام الهاتف:</strong>
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                        <p style="margin: 5px 0;">📞 <strong>للاستفسارات:</strong>
                            <a href="tel:+967771571232" style="color: #25d366; font-weight: bold; text-decoration: none; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 4px; margin-right: 5px;">771571232</a>
                        </p>
                        <p style="margin: 5px 0;">💬 <strong>واتساب 1:</strong>
                            <a href="https://wa.me/967713095445?text=السلام عليكم، أريد الاستفسار عن خدمات مركز الإرادة للعلاج الطبيعي" target="_blank" style="color: #25d366; font-weight: bold; text-decoration: none; background: rgba(37, 211, 102, 0.2); padding: 3px 8px; border-radius: 4px; margin-right: 5px;">713095445</a>
                        </p>
                        <p style="margin: 5px 0;">💬 <strong>واتساب 2:</strong>
                            <a href="https://wa.me/967773142547?text=السلام عليكم، أريد الاستفسار عن خدمات مركز الإرادة للعلاج الطبيعي" target="_blank" style="color: #25d366; font-weight: bold; text-decoration: none; background: rgba(37, 211, 102, 0.2); padding: 3px 8px; border-radius: 4px; margin-right: 5px;">773142547</a>
                        </p>
                    </div>
                </div>

                <div class="contact-item">
                    <strong>📍 العنوان:</strong>
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                        <p style="margin: 5px 0;">
                            <a href="https://maps.google.com/?q=79WG%2BRV+يريم" target="_blank" style="color: #0066cc; font-weight: bold; text-decoration: none; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                                محافظة إب - مدينة يريم - الشارع العام<br>مطعم الأندلس سابق
                            </a>
                        </p>
                        <p style="margin: 5px 0;">🗺️ <strong>الإحداثيات:</strong>
                            <a href="https://maps.google.com/?q=79WG%2BRV+يريم" target="_blank" style="color: #0066cc; font-weight: bold; text-decoration: none; background: rgba(0, 102, 204, 0.3); padding: 3px 8px; border-radius: 4px; margin-right: 5px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">79WG+RV يريم، اليمن</a>
                        </p>
                    </div>
                </div>

                <div class="contact-item">
                    <strong>🕐 ساعات العمل:</strong>
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                        <p style="margin: 5px 0; color: #ffd700; font-weight: bold;">السبت - الخميس: 8:00 ص - 6:00 م</p>
                        <p style="margin: 5px 0; color: #ffd700; font-weight: bold;">الجمعة: 8:00 ص - 12:00 م (الفترة الصباحية فقط)</p>
                    </div>
                </div>

                <div class="contact-item">
                    <strong>🌐 تابعونا:</strong>
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px; text-align: center;">
                        <a href="https://www.facebook.com/share/194kwN7ueQ/" target="_blank" style="color: #1877f2; font-weight: bold; text-decoration: none; background: rgba(24, 119, 242, 0.2); padding: 8px 12px; border-radius: 6px; margin: 0 5px; display: inline-block;">
                            📘 فيسبوك
                        </a>
                        <a href="https://t.me/+967771571232" target="_blank" style="color: #0088cc; font-weight: bold; text-decoration: none; background: rgba(0, 136, 204, 0.2); padding: 8px 12px; border-radius: 6px; margin: 0 5px; display: inline-block;">
                            📱 تيليجرام
                        </a>
                    </div>
                </div>
            </div>
        `;

        this.addMessage(contactContent);
        this.showBackButton();
    }

    bookAppointment() {
        const appointmentContent = `
            <h4>📅 حجز موعد</h4>
            <p>يمكنكم حجز موعد بإحدى الطرق التالية:</p>

            <div class="appointment-options">
                <div class="appointment-option">
                    <strong>💬 عبر الواتساب (الأسرع)</strong>
                    <p>تواصلوا معنا مباشرة عبر الواتساب:</p>
                    <a href="https://wa.me/967713095445?text=السلام عليكم، أريد حجز موعد في مركز الإرادة للعلاج الطبيعي"
                       target="_blank" class="whatsapp-link">
                        📱 واتساب 1: 713095445
                    </a>
                    <a href="https://wa.me/967773142547?text=السلام عليكم، أريد حجز موعد في مركز الإرادة للعلاج الطبيعي"
                       target="_blank" class="whatsapp-link">
                        📱 واتساب 2: 773142547
                    </a>
                </div>

                <div class="appointment-option">
                    <strong>📞 عبر الهاتف</strong>
                    <p>اتصلوا بنا مباشرة:</p>
                    <a href="tel:+967771571232" class="phone-link">
                        📞 771571232
                    </a>
                </div>

                <div class="appointment-option">
                    <strong>🏥 زيارة المركز</strong>
                    <p>يمكنكم زيارة المركز مباشرة في:</p>
                    <p>📍 محافظة إب - مدينة يريم - الشارع العام<br>
                    مطعم الأندلس سابق</p>
                </div>
            </div>

            <div class="appointment-note">
                <p>📝 <strong>ملاحظة:</strong> يُفضل الحجز المسبق لضمان توفر الموعد المناسب</p>
                <p>⏰ <strong>مواعيد الطوارئ:</strong> متوفرة خلال ساعات الدوام الرسمي</p>
            </div>
        `;

        this.addMessage(appointmentContent);
        this.showBackButton();
    }
}

// تهيئة البوت عند تحميل الصفحة
let chatBot;
document.addEventListener('DOMContentLoaded', function() {
    chatBot = new AlIradahChatBot();
});
