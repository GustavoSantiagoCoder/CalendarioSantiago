document.addEventListener('DOMContentLoaded', () => {
  const monthYear = document.getElementById('month-year');
  const calendarDays = document.getElementById('calendar-days');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const reminderModal = document.getElementById('reminder-modal');
  const closeModalButton = document.getElementById('close-modal');
  const saveReminderButton = document.getElementById('save-reminder');
  const reminderText = document.getElementById('reminder-text');
  const selectedDateInput = document.getElementById('selected-date');
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const reminders = {};

  function renderCalendar() {
      calendarDays.innerHTML = '';
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
          calendarDays.innerHTML += '<div class="calendar-day"></div>';
      }

      for (let date = 1; date <= lastDate; date++) {
          const dayDiv = document.createElement('div');
          dayDiv.className = 'calendar-day';
          dayDiv.innerText = date;
          dayDiv.dataset.date = `${currentYear}-${currentMonth + 1}-${date}`;
          dayDiv.addEventListener('click', (event) => {
              const selectedDate = event.target.dataset.date;
              selectedDateInput.value = selectedDate;
              reminderText.value = reminders[selectedDate] || '';
              reminderModal.style.display = 'flex';
          });
          calendarDays.appendChild(dayDiv);
      }

      monthYear.innerText = `${currentYear}-${currentMonth + 1}`;
  }

  prevMonthButton.addEventListener('click', () => {
      currentMonth -= 1;
      if (currentMonth < 0) {
          currentMonth = 11;
          currentYear -= 1;
      }
      renderCalendar();
  });

  nextMonthButton.addEventListener('click', () => {
      currentMonth += 1;
      if (currentMonth > 11) {
          currentMonth = 0;
          currentYear += 1;
      }
      renderCalendar();
  });

  closeModalButton.addEventListener('click', () => {
      reminderModal.style.display = 'none';
  });

  saveReminderButton.addEventListener('click', () => {
      const date = selectedDateInput.value;
      const text = reminderText.value;
      if (date && text) {
          reminders[date] = text;
      } else {
          delete reminders[date];
      }
      reminderModal.style.display = 'none';
      renderCalendar();
  });

  renderCalendar();
});
