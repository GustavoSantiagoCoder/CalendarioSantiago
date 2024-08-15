const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const year = 2024;
let currentMonth = new Date().getMonth();

// Lista de feriados para 2024 (considerando feriados nacionais)
const holidays = {
    0: [1],  // Janeiro: Confraternização Universal (1º de Janeiro)
    1: [20], // Fevereiro: Carnaval (20 de Fevereiro)
    3: [21], // Abril: Tiradentes (21 de Abril)
    4: [1],  // Maio: Dia do Trabalho (1º de Maio)
    8: [7],  // Setembro: Independência do Brasil (7 de Setembro)
    9: [12], // Outubro: Nossa Senhora Aparecida (12 de Outubro)
    10: [2, 15], // Novembro: Finados (2 de Novembro), Proclamação da República (15 de Novembro)
    11: [25] // Dezembro: Natal (25 de Dezembro)
};

document.getElementById('month').textContent = monthNames[currentMonth];
document.getElementById('year').textContent = year;

function renderCalendar(month) {
    const daysContainer = document.getElementById('days');
    daysContainer.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Preenche os dias em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += '<span></span>';
    }

    // Preenche os dias do mês e aplica cores especiais para domingos e feriados
    for (let day = 1; day <= lastDate; day++) {
        const dayOfWeek = new Date(year, month, day).getDay();
        const isHoliday = holidays[month] && holidays[month].includes(day);

        let className = "";
        if (dayOfWeek === 0) { // Domingo
            className = "sunday";
        }
        if (isHoliday) { // Feriado
            className = "holiday";
        }

        daysContainer.innerHTML += `<span class="${className}">${day}</span>`;
    }
}

function updateCalendar() {
    document.getElementById('month').textContent = monthNames[currentMonth];
    renderCalendar(currentMonth);
}

// Navegação dos meses
document.getElementById('prevMonth').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
    } else {
        currentMonth--;
    }
    updateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
    } else {
        currentMonth++;
    }
    updateCalendar();
});

renderCalendar(currentMonth);
