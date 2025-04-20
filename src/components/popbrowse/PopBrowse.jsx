import "../../assets/App.css";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import * as S from "../popbrowse/PopBrowseStyled";
import { useState, useContext, useEffect } from "react";
import { updateTask, deleteTask } from "../../services/api";
import { ThemeContext } from "../../components/themecontent/themeContext";

const statusOptions = ["noStatus", "needToDo", "inProcess", "test", "done"];

function Popbrowse({ task, onClose, onUpdate, cardtheme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [editedTitle, setEditedTitle] = useState(task.title); // Состояние для title
  const [editedTopic, setEditedTopic] = useState(task.topic); // Состояние для topic

  const [selectedDate, setSelectedDate] = useState(new Date(task.date));
  const [, setDateLabel] = useState(
    new Date(task.date).toLocaleDateString("ru-RU")
  );

  const formattedSelectedDate = selectedDate.toLocaleDateString("ru-RU");

  useEffect(() => {
    setDateLabel(selectedDate.toLocaleDateString("ru-RU"));
  }, [selectedDate]);

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDescription(task.description);
    setEditedStatus(task.status);
    setSelectedDate(task.date);
    setEditedTitle(task.title);
    setEditedTopic(task.topic);
    setDateLabel(new Date(task.date).toLocaleDateString("ru-RU"));
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

      const updatedTask = await updateTask(task._id, taskData);
      onUpdate(updatedTask); // Обновляем задачу в TaskList
      setIsEditing(false);
      console.log("onClose вызывается"); // Добавляем console.log
      onClose(); // Закрываем Popbrowse после успешного сохранения
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
    setDateLabel(new Date(date).toLocaleDateString("ru-RU"));
  };

  const handleDeleteTask = async () => {
    if (!task) {
      return;
    }
    {
      await deleteTask(task.id);
      onClose();
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
                          : "Готово"}
                      </p>
                    </S.StatusTheme>
                  ))
                ) : (
                  <S.StatusTheme
                    $isselected={true}
                    $isediting="false" // Указываем, что не в режиме редактирования
                  >
                    <p>
                      {task.status === "noStatus"
                        ? "Без статуса"
                        : task.status === "needToDo"
                        ? "Нужно сделать"
                        : task.status === "inProcess"
                        ? "В работе"
                        : task.status === "test"
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
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                  />
                </S.FormBrowseBlock>
              </S.PopBrowseForm>
              <Calendar
                onDateSelect={isEditing ? handleDateSelect : () => {}}
                selectedDate={selectedDate}
                disabled={!isEditing}
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
    description: PropTypes.string, // Добавлено описание
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
  cardtheme: PropTypes.string,
};

export default Popbrowse;
