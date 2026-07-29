// ===== التبديل بين التبويبات =====
const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (tabLogin && tabSignup) {
  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });

  tabSignup.addEventListener('click', () => {
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
}

// ===== إنشاء حساب جديد =====
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const errorBox = document.getElementById('signupError');

    if (password.length < 6) {
      errorBox.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => u.email === email)) {
      errorBox.textContent = "هذا البريد الإلكتروني مسجل مسبقاً";
      return;
    }

    users.push({ name, email, password, freeCreditsToday: 10, lastReset: new Date().toDateString() });
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('currentUser', email);
    window.location.href = "dashboard.html";
  });
}

// ===== تسجيل الدخول =====
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorBox = document.getElementById('loginError');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      errorBox.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      return;
    }

    localStorage.setItem('currentUser', email);
    window.location.href = "dashboard.html";
  });
}
