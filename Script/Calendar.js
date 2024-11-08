document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.querySelector('.main-content');
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    function renderCalendar() {
        // Очищаем старое содержимое календаря
        calendar.innerHTML = '';

        // Определяем первый день месяца и количество дней в месяце
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Создаем заголовок календаря
        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        calendarHeader.innerHTML = `
            <button id="prevMonth">◀</button>
            <span>${months[currentMonth]} ${currentYear}</span>
            <button id="nextMonth">▶</button>
        `;
        calendar.appendChild(calendarHeader);

        // Создаем контейнер для дней недели
        const calendarDays = document.createElement('div');
        calendarDays.className = 'calendar-days';
        calendar.appendChild(calendarDays);

        // Создаем тело календаря
        const calendarBody = document.createElement('div');
        calendarBody.className = 'calendar-body';
        calendar.appendChild(calendarBody);

        // Добавляем дни недели
        const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            calendarDays.appendChild(dayElement);
        });

        // Заполняем пустые ячейки до первого дня месяца
        const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-cell empty';
            calendarBody.appendChild(emptyCell);
        }

        // Заполняем ячейки днями месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell';
            dayCell.textContent = day;

            // Проверяем, является ли этот день сегодняшним
            const today = new Date();
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            dayCell.addEventListener('click', () => addEvent(day));
            calendarBody.appendChild(dayCell);
        }

        // Добавляем обработчики событий для кнопок переключения месяцев
        document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
    }

    function changeMonth(direction) {
        currentMonth += direction;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    }

    function addEvent(day) {
        const eventText = prompt('Введите событие:');
        if (eventText) {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.textContent = eventText;
            eventElement.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Удалить это событие?')) {
                    eventElement.remove();
                }
            });
            const adjustedFirstDay = (new Date(currentYear, currentMonth, 1).getDay() === 0) ? 6 : new Date(currentYear, currentMonth, 1).getDay() - 1;
            document.querySelectorAll('.calendar-cell')[day + adjustedFirstDay - 1].appendChild(eventElement);
        }
    }

    renderCalendar();
});