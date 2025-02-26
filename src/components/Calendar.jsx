import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Calendar({ onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Текущий месяц (0-11)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Текущий год
  const [selectedDate, setSelectedDate] = useState(null); // Выбранная дата
  useEffect(() => {
    // Вызываем onDateSelect при изменении selectedDate
    if (selectedDate) {
      onDateSelect(selectedDate); // Передаем выбранную дату
    }
  }, [selectedDate, onDateSelect]); // Добавляем onDateSelect в зависимость

  // Функция для получения названий дней недели
  const getDayNames = () => {
    const dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    return dayNames;
  };

  // Функция для получения дат текущего месяца
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Получаем дни предыдущего месяца для заполнения первой недели
  const getDaysFromPreviousMonth = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const days = [];

    if (firstDayOfWeek !== 1) {
      let day = new Date(year, month, 0).getDate();
      for (
        let i = 0;
        i < (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1);
        i++
      ) {
        days.unshift(day);
        day--;
      }
    }
    return days;
  };

  // Получаем дни следующего месяца для заполнения последней недели
  const getDaysFromNextMonth = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfMonth = new Date(year, month, daysInMonth);
    const lastDayOfWeek = lastDayOfMonth.getDay();

    const days = [];

    if (lastDayOfWeek !== 0) {
      // если последний день месяца не воскресенье
      for (
        let i = 1;
        i <= 7 - (lastDayOfWeek === 6 ? 7 : lastDayOfWeek + 1);
        i++
      ) {
        days.push(i);
      }
    }

    return days;
  };

  // Получаем все дни месяца, включая дни предыдущего и следующего месяцев
  const getAllDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const prevMonthDays = getDaysFromPreviousMonth(currentMonth, currentYear);
    const nextMonthDays = getDaysFromNextMonth(currentMonth, currentYear);

    return {
      prevMonthDays,
      daysInMonth,
      nextMonthDays,
    };
  };

  // Функция для обработки клика по дню
  const handleDayClick = (day) => {
    if (typeof day === "number") {
      const clickedDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(clickedDate);
    } else {
      // Обрабатываем клики по дням предыдущего или следующего месяца (например, не даем выбирать)
      console.log("Клик по дню другого месяца");
    }
  };

  // Функции для перехода к предыдущему и следующему месяцу
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null); // Сбрасываем выбранную дату при переходе к другому месяцу
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null); // Сбрасываем выбранную дату при переходе к другому месяцу
  };

  const { prevMonthDays, daysInMonth, nextMonthDays } = getAllDays();
  const allDays = [
    ...prevMonthDays.map((day) => ({ day, isOtherMonth: true })),
    ...daysInMonth.map((day) => ({ day: day.getDate(), isOtherMonth: false })),
    ...nextMonthDays.map((day) => ({ day, isOtherMonth: true })),
  ];

  // Функция для форматирования даты в формат DD.MM.YYYY
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Получаем название текущего месяца
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const currentMonthName = monthNames[currentMonth];
  const formattedSelectedDate = formatDate(selectedDate);

  return (
    <div className="pop-new-card__calendar calendar">
      <p className="calendar__ttl subttl">Даты</p>
      <div className="calendar__block">
        <div className="calendar__nav">
          <div className="calendar__month">
            {currentMonthName} {currentYear}
          </div>
          <div className="nav__actions">
            <div
              className="nav__action"
              data-action="prev"
              onClick={goToPreviousMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </div>
            <div
              className="nav__action"
              data-action="next"
              onClick={goToNextMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="calendar__content">
          <div className="calendar__days-names">
            {getDayNames().map((dayName) => (
              <div key={dayName} className="calendar__day-name">
                {dayName}
              </div>
            ))}
          </div>
          <div className="calendar__cells">
            {allDays.map((dayInfo, index) => {
              const { day, isOtherMonth } = dayInfo;
              const isCurrentDay =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;

              return (
                <div
                  key={index} // Уникальный ключ для каждого элемента
                  className={`calendar__cell _cell-day ${
                    isOtherMonth ? "_other-month" : ""
                  } ${isCurrentDay ? "_active-day" : ""}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <input type="hidden" id="datepick_value" value="08.09.2023" />
        <div className="calendar__period">
          <p className="calendar__p date-end">
            Выберите срок исполнения{" "}
            <span className="date-control">{formattedSelectedDate}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired, // Пропс onCreateTask должен быть функцией и быть обязательным
};
export default Calendar;
