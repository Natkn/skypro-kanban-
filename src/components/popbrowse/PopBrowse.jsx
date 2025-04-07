import "../../assets/App.css";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import * as S from "../popbrowse/PopBrowseStyled";
import { themePop } from "../../mock/data";
import { useState, useCallback } from "react";
import { deleteTask, updateTask } from "../../services/api";

function PopBrowse({ task, onClose, onTaskUpdate, onTaskDelete }) {
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const [isEditing, setIsEditing] = useState(false); // Состояние режима редактирования
  const [selectedDate, setSelectedDate] = useState(
    task?.date ? new Date(task.date) : null
  );
  const [editedStatus, setEditedStatus] = useState(task?.status || "noStatus"); // Состояние для редактируемого статуса
  const [editedDescription, setEditedDescription] = useState(
    task?.description || ""
  );

  const themeStyles = task ? themePop[task.theme] || {} : {};
  const formattedSelectedDate = formatDate(selectedDate);
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
  };

  const handleSaveTask = async () => {
    try {
      const updatedTaskData = {
        ...task,
        status: editedStatus,
        description: editedDescription,
        date: selectedDate ? selectedDate.toISOString() : null,
      };

      const updatedTasks = await updateTask(task.id, updatedTaskData);
      onTaskUpdate(updatedTasks); //  TODO:  Передайте actual updatedTasks
      setIsEditing(false); // Выключаем режим редактирования
      onClose();
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      alert("Произошла ошибка при обновлении задачи.");
    }
  };

  const handleDeleteTask = async () => {
    if (
      window.confirm(`Вы уверены, что хотите удалить задачу "${task.title}"?`)
    ) {
      try {
        await deleteTask(task.id);
        onTaskDelete(task.id); // Вызываем callback для обновления списка задач в родительском компоненте
        onClose(); // Закрываем модальное окно
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        alert("Произошла ошибка при удалении задачи.");
      }
    }
  };

  const handleStatusChange = (newStatus) => {
    setEditedStatus(newStatus);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

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
              <div
                className="categories__theme theme-top _active-category "
                style={{
                  backgroundColor: themeStyles.background,
                  color: themeStyles.text,
                }}
              >
                <p style={{ color: themeStyles.text }}>{task.theme}</p>
              </div>
            </S.PopBrowseTopBlock>

            <S.Status>
              <S.StatusP>Статус</S.StatusP>
              <S.StatusThemes>
                <S.StatusTheme
                  $ishide={(editedStatus !== "noStatus").toString()}
                  $isselected={editedStatus === "noStatus" ? "true" : "false"}
                  onClick={() => handleStatusChange("noStatus")}
                >
                  <p>Без статуса</p>
                </S.StatusTheme>
                <S.StatusTheme
                  $ishide={(editedStatus !== "needToDo").toString()}
                  $isselected={editedStatus === "needToDo" ? "true" : "false"}
                  onClick={() => handleStatusChange("needToDo")}
                >
                  <p>Нужно сделать</p>
                </S.StatusTheme>
                <S.StatusTheme
                  $ishide={(editedStatus !== "inProcess").toString()}
                  $isselected={editedStatus === "inProcess" ? "true" : "false"}
                  onClick={() => handleStatusChange("inProcess")}
                >
                  <p>В работе</p>
                </S.StatusTheme>
                <S.StatusTheme
                  $ishide={(editedStatus !== "test").toString()}
                  $isselected={editedStatus === "test" ? "true" : "false"}
                  onClick={() => handleStatusChange("test")}
                >
                  <p>Тестирование</p>
                </S.StatusTheme>
                <S.StatusTheme
                  $ishide={(editedStatus !== "ready").toString()}
                  $isselected={editedStatus === "ready" ? "true" : "false"}
                  onClick={() => handleStatusChange("ready")}
                >
                  <p>Готово</p>
                </S.StatusTheme>
              </S.StatusThemes>
            </S.Status>

            <S.PopBrowseWrap>
              <S.PopBrowseForm>
                <S.FormBrowseBlock>
                  <label htmlFor="textArea01">Описание задачи</label>
                  <S.FormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly
                    placeholder="Описание задачи"
                    value={task.description}
                    onChange={handleDescriptionChange}
                  />
                </S.FormBrowseBlock>
              </S.PopBrowseForm>
              <Calendar onDateSelect={handleDateSelect} disabled={!isEditing} />
              <input
                type="hidden"
                id="datepick_value"
                value={formattedSelectedDate}
              />
            </S.PopBrowseWrap>

            <S.PopBrowseBtnBrowse>
              <div>
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
              </div>
              <S.BtnBg
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                }}
              >
                Закрыть
              </S.BtnBg>
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
    title: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(["Web Design", "Research", "Copywriting"])
      .isRequired,
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
};

export default PopBrowse;
