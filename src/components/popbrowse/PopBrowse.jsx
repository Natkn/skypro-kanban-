import "../../assets/App.css";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import * as S from "../popbrowse/PopBrowseStyled";
import { useState, useContext, useEffect } from "react";
import { updateTask, deleteTask } from "../../services/api";
import { ThemeContext } from "../../themecontent/themeContext";
import TaskContext from "../../context/TaskContext";

const statusOptions = ["noStatus", "needToDo", "inProcess", "test", "ready"];

function Popbrowse({ task, onClose, cardtheme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedTopic, setEditedTopic] = useState(task.topic);
  const [dateLabel] = useState("Срок исполнения:");
  const initialDate = task.date ? new Date(task.date) : new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { fetchTasks } = useContext(TaskContext);

  const [formattedSelectedDate, setFormattedSelectedDate] = useState(
    initialDate.toISOString().split("T")[0]
  );

  useEffect(() => {
    if (selectedDate) {
      setFormattedSelectedDate(selectedDate.toISOString().split("T")[0]);
    }
  }, [selectedDate]);

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDescription(task.description);
    setEditedStatus(task.status);
    setSelectedDate(task.date ? new Date(task.date) : new Date());
    setEditedTitle(task.title);
    setEditedTopic(task.topic);
  };

  const handleSaveTask = async () => {
    try {
      const taskData = {
        description: editedDescription,
        status: editedStatus,
        date: formattedSelectedDate,
        title: editedTitle,
        topic: editedTopic,
      };

      await updateTask(task._id, taskData);
      setIsEditing(false);
      console.log("onClose вызывается");
      onClose();
      fetchTasks();
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
    }
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleStatusChange = (newStatus) => {
    setEditedStatus(newStatus);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleTopicChange = (newTopic) => {
    setEditedTopic(newTopic);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    date.toLocaleDateString("ru-RU");
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task._id);
      console.log("Задача успешно удалена");
      onClose();
      fetchTasks();
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <S.PopBrowseContainer>
      <S.PopBrowseWrapper>
        <S.PopBrowseBlock>
          <S.PopBrowseContent>
            <S.PopBrowseTopBlock theme={theme} cardtheme={cardtheme}>
              <S.PopBrowseTitle onChange={handleTitleChange}>
                {task.title}
              </S.PopBrowseTitle>
              <S.PopBrowseTopic
                onChange={handleTopicChange}
                theme={theme}
                $category={task.topic}
              >
                {task.topic}
              </S.PopBrowseTopic>
            </S.PopBrowseTopBlock>

            <S.Status>
              <S.StatusP>Статус</S.StatusP>
              <S.StatusThemes>
                {isEditing ? (
                  statusOptions.map((option) => (
                    <S.StatusTheme
                      key={option}
                      $isselected={editedStatus === option}
                      $isediting="true"
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
                          : option === "ready"
                          ? "Готово"
                          : "Готово"}
                      </p>
                    </S.StatusTheme>
                  ))
                ) : (
                  <S.StatusTheme $isselected={true} $isediting="false">
                    <p>
                      {task.status === "noStatus"
                        ? "Без статуса"
                        : task.status === "needToDo"
                        ? "Нужно сделать"
                        : task.status === "inProcess"
                        ? "В работе"
                        : task.status === "test"
                        ? "Тестирование"
                        : task.status === "ready"
                        ? "Готово"
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
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                  />
                </S.FormBrowseBlock>
              </S.PopBrowseForm>
              <Calendar
                onDateSelect={isEditing ? handleDateSelect : () => {}}
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

Popbrowse.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    theme: PropTypes.string,
    cardtheme: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    topic: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,

  topic: PropTypes.string.isRequired,
  cardtheme: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default Popbrowse;
