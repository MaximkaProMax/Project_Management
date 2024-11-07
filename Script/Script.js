//Делаеv шрифт жирным при выборе раздела в боковом меню
document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar nav ul li');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Удаляем класс active у всех ссылок
            sidebarLinks.forEach(link => link.classList.remove('active'));
            
            // Добавляем класс active к выбранной ссылке
            e.target.classList.add('active');
        });
    });
});