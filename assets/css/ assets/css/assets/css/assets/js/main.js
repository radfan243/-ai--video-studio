// ===== قاموس الترجمة المباشر =====
const translations = {
  ar: {
    dir: "rtl",
    nav_home: "الرئيسية",
    nav_pricing: "الأسعار",
    nav_about: "من نحن",
    nav_privacy: "الخصوصية",
    nav_login: "تسجيل الدخول",
    hero_title: "حوّل النص أو الصورة إلى فيديو ناطق بالذكاء الاصطناعي",
    hero_desc: "أنشئ شخصيات كرتونية أو واقعية تتكلم بأي لغة، بمزامنة شفاه دقيقة، وبدون علامة مائية.",
    btn_start: "ابدأ مجاناً الآن",
    btn_features: "شاهد المميزات"
  },
  en: {
    dir: "ltr",
    nav_home: "Home",
    nav_pricing: "Pricing",
    nav_about: "About",
    nav_privacy: "Privacy",
    nav_login: "Login",
    hero_title: "Turn Text or Images into Talking AI Videos",
    hero_desc: "Create cartoon or realistic characters that speak any language with accurate lip-sync, no watermark.",
    btn_start: "Start Free Now",
    btn_features: "See Features"
  }
};

// ===== تطبيق اللغة المختارة =====
function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;

  const navHome = document.querySelector('.nav-links a[href="index.html"]');
  const navPricing = document.querySelector('.nav-links a[href="pricing.html"]');
  const navAbout = document.querySelector('.nav-links a[href="about.html"]');
  const navPrivacy = document.querySelector('.nav-links a[href="privacy.html"]');
  const navLogin = document.querySelector('.nav-actions a[href="login.html"]');
  const heroTitle = document.querySelector('.hero h1');
  const heroDesc = document.querySelector('.hero p');
  const btnStart = document.querySelector('.hero-buttons .btn-primary');
  const btnFeatures = document.querySelector('.hero-buttons .btn-ghost');

  if (navHome) navHome.textContent = t.nav_home;
  if (navPricing) navPricing.textContent = t.nav_pricing;
  if (navAbout) navAbout.textContent = t.nav_about;
  if (navPrivacy) navPrivacy.textContent = t.nav_privacy;
  if (navLogin) navLogin.textContent = t.nav_login;
  if (heroTitle) heroTitle.textContent = t.hero_title;
  if (heroDesc) heroDesc.textContent = t.hero_desc;
  if (btnStart) btnStart.textContent = t.btn_start;
  if (btnFeatures) btnFeatures.textContent = t.btn_features;

  localStorage.setItem('site_lang', lang);
}

// ===== عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('site_lang') || 'ar';
  const langSwitch = document.getElementById('langSwitch');

  if (langSwitch) {
    langSwitch.value = savedLang;
    applyLanguage(savedLang);

    langSwitch.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  }
});
