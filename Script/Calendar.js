const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const notes = {
    "13-10-2024": "Пример заметки" 
};

function createCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const adjustedFirstDay = (firstDay + 6) % 7; 
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const calendarBody = document.querySelector("#calendar tbody");

    calendarBody.innerHTML = "";
    let date = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < adjustedFirstDay) {
                cell.appendChild(document.createTextNode(""));
            } else if (date > daysInMonth) {
                break;
            } else {
                const cellText = document.createTextNode(date);
                cell.appendChild(cellText);

                if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    cell.classList.add("today");
                }

                const note = notes[`${date}-${month}-${year}`];
                if (note) {
                    const noteText = document.createElement("div");
                    noteText.classList.add("note");
                    noteText.textContent = note;
                    cell.appendChild(noteText);
                }

                (function(d, m, y) {
                    cell.addEventListener("click", function () {
                        const currentNote = notes[`${d}-${m}-${y}`] || "";
                        let action = prompt(`Введите "1" для добавления/изменения заметки, "2" для удаления заметки:`, "1");
                        if (action === "1") {
                            const note = prompt("Введите текст:", currentNote);
                            if (note !== null) {
                                notes[`${d}-${m}-${y}`] = note;
                            }
                        } else if (action === "2") {
                            delete notes[`${d}-${m}-${y}`];
                        }
                        createCalendar(m, y);
                    });
                })(date, month, year);

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    createCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentMonth, currentYear);
}

function changeMonth() {
    const monthSelect = document.getElementById("month");
    currentMonth = parseInt(monthSelect.value);
    createCalendar(currentMonth, currentYear);
}

function changeYear() {
    const yearSelect = document.getElementById("year");
    currentYear = parseInt(yearSelect.value);
    createCalendar(currentMonth, currentYear);
}

function populateMonthSelect() {
    const monthSelect = document.getElementById("month");
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    for (let i = 0; i < 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = monthNames[i];
        if (i === currentMonth) {
            option.selected = true;
        }
        monthSelect.appendChild(option);
    }
}

function populateYearSelect() {
    const yearSelect = document.getElementById("year");
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        if (i === currentYear) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }
}

populateMonthSelect();
populateYearSelect();
createCalendar(currentMonth, currentYear);