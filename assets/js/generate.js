// ===== التحقق من تسجيل الدخول =====
const currentUserEmail = localStorage.getItem('currentUser');
if (!currentUserEmail) {
  window.location.href = "login.html";
}

const users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser = users.find(u => u.email === currentUserEmail);

// ===== إعادة تعيين الرصيد يومياً =====
function resetDailyCreditsIfNeeded() {
  const today = new Date().toDateString();
  if (currentUser.lastReset !== today) {
    currentUser.freeCreditsToday = 10;
    currentUser.lastReset = today;
    saveUser();
  }
}

function saveUser() {
  const idx = users.findIndex(u => u.email === currentUserEmail);
  users[idx] = currentUser;
  localStorage.setItem('users', JSON.stringify(users));
}

function updateCreditsBadge() {
  const badge = document.getElementById('creditsBadge');
  const userNameEl = document.getElementById('userName');
  if (badge) badge.textContent = `⚡ ${currentUser.freeCreditsToday} فيديو متبقي اليوم`;
  if (userNameEl) userNameEl.textContent = `مرحباً ${currentUser.name}`;
}

if (currentUser) {
  resetDailyCreditsIfNeeded();
  updateCreditsBadge();
}

// ===== زر الخروج =====
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "index.html";
});

// ===== التبديل بين تبويب النص والصورة =====
const dtabText = document.getElementById('dtabText');
const dtabImage = document.getElementById('dtabImage');
const panelText = document.getElementById('panelText');
const panelImage = document.getElementById('panelImage');

dtabText?.addEventListener('click', () => {
  dtabText.classList.add('active');
  dtabImage.classList.remove('active');
  panelText.classList.remove('hidden');
  panelImage.classList.add('hidden');
});
dtabImage?.addEventListener('click', () => {
  dtabImage.classList.add('active');
  dtabText.classList.remove('active');
  panelImage.classList.remove('hidden');
  panelText.classList.add('hidden');
});

// ===== عداد الأحرف =====
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
textInput?.addEventListener('input', () => {
  charCount.textContent = textInput.value.length;
});

// ===== اختيار الشخصية =====
document.querySelectorAll('.avatar-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

// ===== رفع الصورة ومعاينتها =====
const uploadBox = document.getElementById('uploadBox');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadText = document.getElementById('uploadText');

uploadBox?.addEventListener('click', () => imageInput.click());
imageInput?.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove('hidden');
      uploadText.textContent = "✅ تم رفع الصورة - اضغط لتغييرها";
    };
    reader.readAsDataURL(file);
  }
});

// ===== دالة خصم رصيد والتحقق منه =====
function canGenerate() {
  if (currentUser.freeCreditsToday <= 0) {
    alert("خلص رصيدك المجاني لليوم (10 فيديو). ترقّى لخطة مدفوعة من صفحة الأسعار، أو ارجع بكرة 🙂");
    return false;
  }
  return true;
}

function deductCredit() {
  currentUser.freeCreditsToday -= 1;
  saveUser();
  updateCreditsBadge();
}

// ===== زر توليد الفيديو (من نص) =====
document.getElementById('generateTextBtn')?.addEventListener('click', () => {
  if (!canGenerate()) return;
  const text = textInput.value.trim();
  if (!text) { alert("اكتب نص أولاً"); return; }

  const selectedAvatar = document.querySelector('.avatar-card.selected')?.dataset.avatar;
  const lang = document.getElementById('voiceLang').value;

  startGeneration({ mode: "text", text, avatar: selectedAvatar, lang });
});

// ===== زر توليد الفيديو (من صورة) =====
document.getElementById('generateImageBtn')?.addEventListener('click', () => {
  if (!canGenerate()) return;
  const text = document.getElementById('textInputImg').value.trim();
  const file = imageInput.files[0];
  if (!file) { alert("ارفع صورة أولاً"); return; }
  if (!text) { alert("اكتب نص أولاً"); return; }

  const lang = document.getElementById('voiceLangImg').value;
  startGeneration({ mode: "image", text, image: file, lang });
});
// ===== التحقق من تسجيل الدخول =====
const currentUserEmail = localStorage.getItem('currentUser');
if (!currentUserEmail) {
  window.location.href = "login.html";
}

const users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser = users.find(u => u.email === currentUserEmail);

// ===== إعادة تعيين الرصيد يومياً =====
function resetDailyCreditsIfNeeded() {
  const today = new Date().toDateString();
  if (currentUser.lastReset !== today) {
    currentUser.freeCreditsToday = 10;
    currentUser.lastReset = today;
    saveUser();
  }
}

function saveUser() {
  const idx = users.findIndex(u => u.email === currentUserEmail);
  users[idx] = currentUser;
  localStorage.setItem('users', JSON.stringify(users));
}

function updateCreditsBadge() {
  const badge = document.getElementById('creditsBadge');
  const userNameEl = document.getElementById('userName');
  if (badge) badge.textContent = `⚡ ${currentUser.freeCreditsToday} فيديو متبقي اليوم`;
  if (userNameEl) userNameEl.textContent = `مرحباً ${currentUser.name}`;
}

if (currentUser) {
  resetDailyCreditsIfNeeded();
  updateCreditsBadge();
}

// ===== زر الخروج =====
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "index.html";
});

// ===== التبديل بين تبويب النص والصورة =====
const dtabText = document.getElementById('dtabText');
const dtabImage = document.getElementById('dtabImage');
const panelText = document.getElementById('panelText');
const panelImage = document.getElementById('panelImage');

dtabText?.addEventListener('click', () => {
  dtabText.classList.add('active');
  dtabImage.classList.remove('active');
  panelText.classList.remove('hidden');
  panelImage.classList.add('hidden');
});
dtabImage?.addEventListener('click', () => {
  dtabImage.classList.add('active');
  dtabText.classList.remove('active');
  panelImage.classList.remove('hidden');
  panelText.classList.add('hidden');
});

// ===== عداد الأحرف =====
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
textInput?.addEventListener('input', () => {
  charCount.textContent = textInput.value.length;
});

// ===== اختيار الشخصية =====
document.querySelectorAll('.avatar-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

// ===== رفع الصورة ومعاينتها =====
const uploadBox = document.getElementById('uploadBox');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadText = document.getElementById('uploadText');

uploadBox?.addEventListener('click', () => imageInput.click());
imageInput?.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove('hidden');
      uploadText.textContent = "✅ تم رفع الصورة - اضغط لتغييرها";
    };
    reader.readAsDataURL(file);
  }
});

// ===== دالة خصم رصيد والتحقق منه =====
function canGenerate() {
  if (currentUser.freeCreditsToday <= 0) {
    alert("خلص رصيدك المجاني لليوم (10 فيديو). ترقّى لخطة مدفوعة من صفحة الأسعار، أو ارجع بكرة 🙂");
    return false;
  }
  return true;
}

function deductCredit() {
  currentUser.freeCreditsToday -= 1;
  saveUser();
  updateCreditsBadge();
}

// ===== زر توليد الفيديو (من نص) =====
document.getElementById('generateTextBtn')?.addEventListener('click', () => {
  if (!canGenerate()) return;
  const text = textInput.value.trim();
  if (!text) { alert("اكتب نص أولاً"); return; }

  const selectedAvatar = document.querySelector('.avatar-card.selected')?.dataset.avatar;
  const lang = document.getElementById('voiceLang').value;

  startGeneration({ mode: "text", text, avatar: selectedAvatar, lang });
});

// ===== زر توليد الفيديو (من صورة) =====
document.getElementById('generateImageBtn')?.addEventListener('click', () => {
  if (!canGenerate()) return;
  const text = document.getElementById('textInputImg').value.trim();
  const file = imageInput.files[0];
  if (!file) { alert("ارفع صورة أولاً"); return; }
  if (!text) { alert("اكتب نص أولاً"); return; }

  const lang = document.getElementById('voiceLangImg').value;
  startGeneration({ mode: "image", text, image: file, lang });
});

// ===== دالة التوليد الفعلية - سنربطها بمحرك AI حقيقي لاحقاً =====
function startGeneration(payload) {
  const btn = event.target;
  btn.textContent = "⏳ جاري التوليد...";
  btn.disabled = true;

  setTimeout(() => {
    deductCredit();
    btn.textContent = "🚀 توليد الفيديو";
    btn.disabled = false;
    document.getElementById('resultBox').classList.remove('hidden');
    document.getElementById('resultBox').scrollIntoView({ behavior: 'smooth' });
  }, 2000);
}
