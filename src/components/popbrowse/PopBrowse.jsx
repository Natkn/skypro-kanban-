import "../../assets/App.css";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import * as S from "../popbrowse/PopBrowseStyled";
import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { useTasks } from "../context/UseTask";
import { useTheme } from "../themecontent/themeContext";
//import { getThemeStyles } from "../../assets/themes";

function PopBrowse({ task, onClose }) {
  const { themeMode, themes } = useTheme(); // Получаем темы (lightThemeС и darkThemeС) и режим темы из ThemeProvider
  const themeName = task.theme;
  const defaultDate = dayjs("2023-10-30").toDate();
  const [selectedDate, setSelectedDate] = useState(
    task?.date ? dayjs(task.date).toDate() : defaultDate
  );

  const [dateLabel, setDateLabel] = useState("Выберите срок исполнения:");

  const formatDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) {
      return "";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const [isEditing, setIsEditing] = useState(false); // Состояние режима редактирования
  const [editedStatus, setEditedStatus] = useState(task?.status || "noStatus"); // Состояние для редактируемого статуса
  const [editedDescription, setEditedDescription] = useState(
    task?.description || ""
  );

  const formattedSelectedDate = formatDate(selectedDate);
  const { status } = task || {};
  const { updateTask: updateTaskContext, deleteTask } = useTasks();

  useEffect(() => {
    //  Инициализация selectedDate при загрузке компонента
    if (task?.date) {
      setSelectedDate(new Date(task.date));
    }
  }, [task?.date]);

  useEffect(() => {
    setDateLabel("Срок исполнения:");
  }, []);

  const handleDateSelect = useCallback(
    (date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const handleEditTask = () => {
    setIsEditing(true); // Включаем режим редактирования
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Выключаем режим редактирования
    setEditedStatus(task.status); // Reset status
    setEditedDescription(task.description); // Reset description
    setSelectedDate(task.date ? new Date(task.date) : null);
  };

  const handleSaveTask = async () => {
    try {
      const updatedTaskData = {
        ...task,
        status: editedStatus,
        description: editedDescription,
        date: selectedDate ? selectedDate.toISOString() : null,
      };

      await updateTaskContext(task.id, updatedTaskData); // Use the function from context
      onClose();
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      alert("Произошла ошибка при обновлении задачи.");
    }
  };

  const handleDeleteTask = async () => {
    if (!task) {
      console.error("Нет задачи для удаления");
      return;
    }
    console.log("PopBrowse.jsx: Удаляем задачу с ID:", task.id); // Проверяем task._id
    try {
      await deleteTask(task.id); // Используем task._id
      onClose();
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleStatusChange = (newStatus) => {
    setEditedStatus(newStatus);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const statusOptions = ["noStatus", "needToDo", "inProcess", "test", "ready"];

  if (!task) {
    return null;
  }
  return (
    <S.PopBrowseContainer>
      <S.PopBrowseWrapper>
        <S.PopBrowseBlock>
          <S.PopBrowseContent>
            <S.PopBrowseTopBlock>
              <S.PopBrowseTitle>Название задачи</S.PopBrowseTitle>
              <S.PopBrowseTitleTheme
                theme={themes[themeMode]}
                themename={themeName}
              >
                {task.theme}
              </S.PopBrowseTitleTheme>
            </S.PopBrowseTopBlock>

            <S.Status>
              <S.StatusP>Статус</S.StatusP>
              <S.StatusThemes>
                {isEditing ? (
                  statusOptions.map((option) => (
                    <S.StatusTheme
                      key={option}
                      $isselected={editedStatus === option ? "true" : "false"}
                      onClick={() => handleStatusChange(option)}
                    >
                      <p>
                        {option === "noStatus"
                          ? "Без статуса"
                          : option === "needToDo"
                          ? "Нужно сделать"
                          : option === "inProcess"
                          ? "В работе"
                          : option === "test"
                          ? "Тестирование"
                          : "Готово"}
                      </p>
                    </S.StatusTheme>
                  ))
                ) : (
                  <S.StatusTheme $isselected="true">
                    <p>
                      {status === "noStatus"
                        ? "Без статуса"
                        : status === "needToDo"
                        ? "Нужно сделать"
                        : status === "inProcess"
                        ? "В работе"
                        : status === "test"
                        ? "Тестирование"
                        : "Готово"}
                    </p>
                  </S.StatusTheme>
                )}
              </S.StatusThemes>
            </S.Status>

            <S.PopBrowseWrap>
              <S.PopBrowseForm>
                <S.FormBrowseBlock>
                  <label htmlFor="textArea01">Описание задачи</label>
                  <S.FormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly={!isEditing}
                    placeholder={
                      isEditing
                        ? "Введите описание задачи..."
                        : "Описание задачи"
                    }
                    value={task.description}
                    onChange={handleDescriptionChange}
                  />
                </S.FormBrowseBlock>
              </S.PopBrowseForm>
              <Calendar
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                disabled={!isEditing}
                dateLabel={dateLabel}
              />
              <input
                type="hidden"
                id="datepick_value"
                value={formattedSelectedDate}
              />
            </S.PopBrowseWrap>

            <S.PopBrowseBtnBrowse>
              <S.BtnBorb>
                {isEditing ? (
                  <>
                    <S.BtnBor onClick={handleSaveTask}>Сохранить</S.BtnBor>
                    <S.BtnBor onClick={handleCancelEdit}>Отменить</S.BtnBor>
                  </>
                ) : (
                  <S.BtnBor onClick={handleEditTask}>
                    Редактировать задачу
                  </S.BtnBor>
                )}
                <S.BtnBor onClick={handleDeleteTask}>Удалить задачу</S.BtnBor>
              </S.BtnBorb>
              <S.BtnBc
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                }}
              >
                Закрыть
              </S.BtnBc>
            </S.PopBrowseBtnBrowse>
          </S.PopBrowseContent>
        </S.PopBrowseBlock>
      </S.PopBrowseWrapper>
    </S.PopBrowseContainer>
  );
}

PopBrowse.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    _id: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(["Web Design", "Research", "Copywriting"])
      .isRequired,
    cardtheme: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.oneOf([
      "noStatus",
      "needToDo",
      "inProcess",
      "test",
      "ready",
    ]),
  }),
  onClose: PropTypes.func.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

export default PopBrowse;
