// ===== التحقق من تسجيل الدخول =====
const currentUserEmail = localStorage.getItem('currentUser');
if (!currentUserEmail) {
  window.location.href = "login.html";
}

const users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser = users.find(u => u.email === currentUserEmail);

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

document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "index.html";
});

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

const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
textInput?.addEventListener('input', () => {
  charCount.textContent = textInput.value.length;
});

document.querySelectorAll('.avatar-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

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

document.getElementById('generateTextBtn')?.addEventListener('click', () => {
  if (!canGenerate()) return;
  const text = textInput.value.trim();
  if (!text) { alert("اكتب نص أولاً"); return; }

  const selectedAvatar = document.querySelector('.avatar-card.selected')?.dataset.avatar;
  const lang = document.getElementById('voiceLang').value;

  startGeneration({ mode: "text", text, avatar: selectedAvatar, lang });
});

document.getElementById('generateImageBtn')?.addEventListener('click', () => {
  if (!canGenerate()) return;
  const text = document.getElementById('textInputImg').value.trim();
  const file = imageInput.files[0];
  if (!file) { alert("ارفع صورة أولاً"); return; }
  if (!text) { alert("اكتب نص أولاً"); return; }

  const lang = document.getElementById('voiceLangImg').value;
  startGeneration({ mode: "image", text, image: file, lang });
});

const PROXY_URL = "https://nabdh-ai-proxy.radfanr24.workers.dev";
const PLACEHOLDER_IMAGE = "https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.png";

async function startGeneration(payload) {
  const btn = event.target;
  btn.textContent = "⏳ جاري التوليد...";
  btn.disabled = true;

  try {
    const voiceMap = { ar: "ar-SA-HamedNeural", en: "en-US-JennyNeural", fr: "fr-FR-DeniseNeural", es: "es-ES-ElviraNeural", tr: "tr-TR-AhmetNeural" };

    const createRes = await fetch(`${PROXY_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: PLACEHOLDER_IMAGE,
        text: payload.text,
        voiceId: voiceMap[payload.lang] || "ar-SA-HamedNeural",
      }),
    });
    const createData = await createRes.json();

    if (!createData.id) throw new Error("فشل إنشاء الفيديو");

    let statusData;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 3000));
      const statusRes = await fetch(`${PROXY_URL}/status?id=${createData.id}`);
      statusData = await statusRes.json();
      if (statusData.status === "done") break;
      if (statusData.status === "error") throw new Error("فشل توليد الفيديو");
    }

    if (statusData.status !== "done") throw new Error("استغرق وقتاً طويلاً");

    deductCredit();
    const resultVideo = document.getElementById('resultVideo');
    const downloadBtn = document.getElementById('downloadBtn');
    resultVideo.src = statusData.result_url;
    downloadBtn.href = statusData.result_url;
    document.getElementById('resultBox').classList.remove('hidden');
    document.getElementById('resultBox').scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    alert("حدث خطأ: " + err.message);
  } finally {
    btn.textContent = "🚀 توليد الفيديو";
    btn.disabled = false;
  }
        }
