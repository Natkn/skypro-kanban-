import Card from "../components/card/Card";
import { useState, useCallback, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import Popbrowse from "../components/popbrowse/PopBrowse";
import TaskContext from "../../src/context/TaskContext";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../components/card/ItemTypes";

function TaskList({ tasks, loading, updateTask, getTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopbrowseOpen, setIsPopbrowseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [setTasks] = useState([]);
  const { fetchTasks } = useContext(TaskContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDrop = async (item) => {
    if (item.status !== status) {
      try {
        await updateTask(item.id, { status: status });
        fetchTasks();
      } catch (error) {
        console.error("Ошибка при обновлении статуса:", error);
      }
    }
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsPopbrowseOpen(true);
  };

  const handleUpdateTask = useCallback(
    async (updatedTask) => {
      try {
        await updateTask(updatedTask._id, updatedTask);
        await getTasks();
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
      } finally {
        setIsPopbrowseOpen(false);
        setSelectedTask(null);
      }
    },
    [updateTask, getTasks]
  );

  const handleClosePopbrowse = () => {
    setIsPopbrowseOpen(false);
    setSelectedTask(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <ul>
      {loading ? (
        <Card
          key={uuidv4()}
          loading={true}
          ref={drop}
          style={{
            backgroundColor: isOver ? "lightgreen" : "white",
            padding: "10px",
            minHeight: "200px",
          }}
        />
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

      {isPopbrowseOpen && selectedTask && (
        <Popbrowse
          task={selectedTask}
          onClose={handleClosePopbrowse}
          onUpdate={handleUpdateTask}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          setTasks={setTasks}
        />
      )}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
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
  getTasks: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TaskList;
