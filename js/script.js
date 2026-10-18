const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const pwdError = document.getElementById('pwdError');
const msg = document.getElementById('formMessage');
const toggle = document.getElementById('togglePwd');

// helpers
function setError(el, text){ el.textContent = text || ''; }
function setMessage(text, type=''){
  msg.textContent = text || '';
  msg.className = type ? `message ${type}` : '';
}

function validateEmail(value){
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}

function validatePassword(value){
  return /(?=.{8,})/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value);
}

// Live validation
emailInput.addEventListener('input', ()=>{
  if(!emailInput.value) setError(emailError, 'Email wajib diisi');
  else if(!validateEmail(emailInput.value)) setError(emailError, 'Format email tidak valid');
  else setError(emailError, '');
  setMessage('');
});

pwdInput.addEventListener('input', ()=>{
  if(!pwdInput.value) setError(pwdError, 'Kata sandi wajib diisi');
  else if(!validatePassword(pwdInput.value)) setError(pwdError, 'Kata sandi tidak memenuhi syarat');
  else setError(pwdError, '');
  setMessage('');
});

// Toggle password visibility
toggle.addEventListener('click', ()=>{
  const shown = pwdInput.type === 'text';
  pwdInput.type = shown ? 'password' : 'text';
  toggle.setAttribute('aria-pressed', String(!shown));
  toggle.textContent = shown ? '👁️' : '🙈';
});

//navigate to dashboard
const navigateToDashboard = () => {
    window.location.href = 'dashboard.html'
}

// On submit
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let hasError = false;

  const email = String(emailInput.value || '').trim();
  const pwd = String(pwdInput.value || '');

  if(!email){ setError(emailError, 'Email wajib diisi'); hasError = true; }
  else if(!validateEmail(email)){ setError(emailError, 'Format email tidak valid'); hasError = true; }
  else setError(emailError, '');

  if(!pwd){ setError(pwdError, 'Kata sandi wajib diisi'); hasError = true; }
  else if(!validatePassword(pwd)){ setError(pwdError, 'Kata sandi tidak memenuhi syarat'); hasError = true; }
  else setError(pwdError, '');

  if(hasError){
    setMessage('Periksa kembali input Anda.', '');
    alert('Email/password yang anda masukkan salah');
    return;
  }

  const findUser = dataUsers.find((user) => user.email === email.toLowerCase() && user.password === pwd)
  if(findUser){
    localStorage.setItem('user',JSON.stringify(findUser))
    setMessage('Berhasil masuk! Mengarahkan ke dashboard', 'success');
    emailInput.disabled = true; 
    pwdInput.disabled = true; 
    document.getElementById('submitBtn').disabled = true;

    setTimeout(()=>{
      setMessage('Login Berhasil!', 'success');
      navigateToDashboard();
    }, 700);
  } else {
    setMessage('Email atau kata sandi salah.', '');
    const card = document.querySelector('.card');
    card.animate([
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(0)' }
    ], { duration: 280, iterations: 1 });
    alert('Email/password yang anda masukkan salah');
  }
});


    // Modal handling
    const forgotBtn = document.getElementById('forgotBtn');
    const registerBtn = document.getElementById('registerBtn');
    const forgotDialog = document.getElementById('forgotDialog');
    const registerDialog = document.getElementById('registerDialog');
    const closeForgot = document.getElementById('closeForgot');
    const closeRegister = document.getElementById('closeRegister');

    forgotBtn.onclick = () => forgotDialog.showModal();
    registerBtn.onclick = () => registerDialog.showModal();
    closeForgot.onclick = () => forgotDialog.close();
    closeRegister.onclick = () => registerDialog.close();

    // Lupa password
    const forgotForm = document.getElementById('forgotForm');
    forgotForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = document.getElementById('forgotEmail').value.trim().toLowerCase();

      if(!email){ alert('Email wajib diisi'); return; }
      if(!validateEmail(email)){ alert('Format email tidak valid'); return; }
      if(!dataUsers.some((user) => user.email === email)){ alert('Email tidak terdaftar'); return; }

      alert(`Link reset kata sandi telah dikirim ke ${email}`);
      forgotForm.reset();
      forgotDialog.close();
    });

    // Daftar akun baru
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const password = document.getElementById('regPassword').value;

      if(!name || !email || !password){ alert('Semua kolom wajib diisi'); return; }
      if(!validateEmail(email)){ alert('Format email tidak valid'); return; }
      if(!validatePassword(password)){ alert('Kata sandi minimal 8 karakter, 1 huruf besar & 1 angka'); return; }
      if(dataUsers.some((user) => user.email === email)){ alert('Email sudah terdaftar'); return; }

      dataUsers.push({ email, password, name });
      alert('Pendaftaran berhasil! Silakan login.');
      registerForm.reset();
      registerDialog.close();
    });
