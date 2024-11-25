window.onload = function() {
    loadProfile(); // Загружаем данные профиля при загрузке страницы
};

function saveProfile() {
    const profile = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        education: document.getElementById('education').value,
        averagePrice: document.getElementById('average-price').value,
        skills: document.getElementById('skills').value,
    };
    localStorage.setItem('profile', JSON.stringify(profile)); // Сохраняем данные профиля в localStorage
    alert('Профиль сохранен!'); // Уведомляем пользователя о сохранении
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile')); // Загружаем данные профиля из localStorage
    if (profile) {
        document.getElementById('username').value = profile.username;
        document.getElementById('email').value = profile.email;
        document.getElementById('phone').value = profile.phone;
        document.getElementById('address').value = profile.address;
        document.getElementById('education').value = profile.education;
        document.getElementById('average-price').value = profile.averagePrice;
        document.getElementById('skills').value = profile.skills;
    }
}