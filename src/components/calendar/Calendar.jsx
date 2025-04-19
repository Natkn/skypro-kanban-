import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  CalendarContainer,
  CalendarTitle,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  NavActions,
  NavAction,
  CalendarContent,
  CalendarDaysNames,
  CalendarCells,
  CalendarDayName,
  CalendarCell,
  CalendarPeriod,
  CalendarText,
  CalendarSpan,
} from "../calendar/Calendar.styled";

function Calendar({ onDateSelect, disabled }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Текущий месяц (0-11)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Текущий год

  useEffect(() => {
    // Вызываем onDateSelect при изменении selectedDate
    if (selectedDate) {
      onDateSelect(selectedDate); // Передаем выбранную дату
    }
  }, [selectedDate, onDateSelect]);

  const getDayNames = () => {
    return ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  };

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
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

  const handleDayClick = (day) => {
    if (typeof day === "number") {
      const clickedDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(clickedDate);
    } else {
      console.log("Клик по дню другого месяца");
    }
  };

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

  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

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
    <CalendarContainer className="pop-new-card__calendar calendar">
      <CalendarTitle className="calendar__ttl subttl">Даты</CalendarTitle>
      <CalendarBlock className="calendar__block">
        <CalendarNav className="calendar__nav">
          <CalendarMonth className="calendar__month">
            {currentMonthName} {currentYear}
          </CalendarMonth>
          <NavActions className="nav__actions">
            <NavAction
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
            </NavAction>
            <NavAction
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
            </NavAction>
          </NavActions>
        </CalendarNav>
        <CalendarContent className="calendar__content">
          <CalendarDaysNames className="calendar__days-names">
            {getDayNames().map((dayName) => (
              <CalendarDayName key={dayName} className="calendar__day-name">
                {dayName}
              </CalendarDayName>
            ))}
          </CalendarDaysNames>
          <CalendarCells className="calendar__cells">
            {allDays.map((dayInfo, index) => {
              const { day, isOtherMonth } = dayInfo;
              const isCurrentDay =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;

              return (
                <CalendarCell
                  key={index} // Уникальный ключ для каждого элемента
                  className={`calendar__cell _cell-day ${
                    isOtherMonth ? "_other-month" : ""
                  } ${isCurrentDay ? "_active-day" : ""}`}
                  onClick={disabled ? null : () => handleDayClick(dayInfo)}
                >
                  {dayInfo.isOtherMonth ? day : dayInfo.day}
                </CalendarCell>
              );
            })}
          </CalendarCells>
        </CalendarContent>
        <input type="hidden" id="datepick_value" value="08.09.2023" />
        <CalendarPeriod className="calendar__period">
          <CalendarText className="calendar__p date-end">
            Выберите срок исполнения:
            <CalendarSpan className="date-control">
              {formattedSelectedDate}
            </CalendarSpan>
          </CalendarText>
        </CalendarPeriod>
      </CalendarBlock>
    </CalendarContainer>
  );
}

Calendar.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  disabled: PropTypes.bool,
  dateLabel: PropTypes.string,
};

export default Calendar;
