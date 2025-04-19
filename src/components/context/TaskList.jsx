import Card from "../card/Card";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import Popbrowse from "../popbrowse/PopBrowse";
import { useDroppable } from "@dnd-kit/core";

function TaskList({ tasks, loading, updateTask, id }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopbrowseOpen, setIsPopbrowseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsPopbrowseOpen(true); // Открываем Popbrowse
  };

  const handleUpdateTask = useCallback(
    async (updatedTask) => {
      try {
        // Обновляем задачу с помощью updateTask
        await updateTask(updatedTask._id, updatedTask);
        console.log("Задача успешно обновлена:", updatedTask);
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
      } finally {
        setIsPopbrowseOpen(false);
        setSelectedTask(null); // Закрываем форму редактирования
      }
    },
    [updateTask]
  );

  const handleClosePopbrowse = () => {
    setIsPopbrowseOpen(false);
    setSelectedTask(null); // Закрываем Popbrowse
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date); // Обновляем состояние selectedDate
  };

  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <ul>
      {loading ? (
        <Card key={uuidv4()} loading={true} ref={setNodeRef} />
      ) : Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task) => (
          <Card
            key={task._id || uuidv4()}
            id={task._id}
            topic={task.topic}
            title={task.title}
            date={task.date}
            description={task.description}
            theme={task.theme}
            loading={false}
            cardtheme={task.cardtheme}
            onClick={handleCardClick}
          />
        ))
      ) : null}

      {isPopbrowseOpen &&
        selectedTask && ( // Используем isPopbrowseOpen для отображения Popbrowse
          <Popbrowse
            task={selectedTask}
            onClose={handleClosePopbrowse}
            onUpdate={handleUpdateTask}
            selectedDate={selectedDate} // Передаем selectedDate в PopNewCard
            onDateSelect={handleDateSelect}
          />
        )}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string, // optional
      _id: PropTypes.string, // optional
      theme: PropTypes.string.isRequired,
      cardtheme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
      topic: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  updateTask: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TaskList;
