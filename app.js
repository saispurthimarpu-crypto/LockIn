// MINIMAL JS - Only essential functionality that CSS cannot handle

const $ = id => document.getElementById(id);

// Password strength check (CSS handles the display via data-strength attribute)
$('passwordInput').oninput = e => {
    const p = e.target.value;
    const s = p.length < 8 ? 'weak' :
        (p.length < 12 || !/[A-Z]/.test(p) || !/[0-9]/.test(p) || !/[!@#$%^&*]/.test(p)) ? 'fair' : 'strong';
    $('checker').dataset.strength = p ? s : '';
    $('checker').dataset.hasLength = p.length >= 8;
    $('checker').dataset.hasUpper = /[A-Z]/.test(p);
    $('checker').dataset.hasLower = /[a-z]/.test(p);
    $('checker').dataset.hasNumber = /[0-9]/.test(p);
    $('checker').dataset.hasSpecial = /[!@#$%^&*]/.test(p);
};

// Toggle password visibility
$('togglePass').onclick = () => {
    const i = $('passwordInput');
    i.type = i.type === 'password' ? 'text' : 'password';
};

// Slider value display
$('lengthSlider').oninput = e => $('lengthVal').textContent = e.target.value;

// Generate password
$('generateBtn').onclick = () => {
    const len = +$('lengthSlider').value;
    let chars = '';
    if ($('optUpper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if ($('optLower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
    if ($('optNum').checked) chars += '0123456789';
    if ($('optSpec').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) return alert('Select at least one option');

    let pwd = '';
    for (let i = 0; i < len; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
    $('output').value = pwd;
    $('output').dataset.generated = 'true';
};

// Copy to clipboard
$('copyBtn').onclick = () => {
    navigator.clipboard.writeText($('output').value);
    $('copyBtn').textContent = '✓ Copied';
    setTimeout(() => $('copyBtn').textContent = 'Copy', 2000);
};

// Generate on load
window.onload = () => $('generateBtn').click();
