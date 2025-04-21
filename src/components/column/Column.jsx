import TaskList from "../../context/TaskList";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MainColumn, ColumnTitle, ColumnTitleText } from "./Column.styled";
import { useDrop } from "react-dnd";
import { useTasks } from "../../context/UseTask";
import { ItemTypes } from "../card/ItemTypes";
import TaskContext from "../../context/TaskContext";

export function Column({ title, tasks, status, handleCardClick }) {
  const filteredTasks = tasks.filter((task) => task.status === status);
  const { loading } = useTasks();
  const { fetchTasks } = useContext(TaskContext);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => {
      fetchTasks();
      item.id, { status: status };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <MainColumn
      ref={drop}
      style={{ backgroundColor: isOver ? "transparent" : "transparent" }}
    >
      <ColumnTitle>
        <ColumnTitleText>{title}</ColumnTitleText>
      </ColumnTitle>

      <TaskList
        loading={loading}
        tasks={filteredTasks}
        handleCardClick={handleCardClick}
      />
    </MainColumn>
  );
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      _id: PropTypes.isRequired,
      theme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  status: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardButtonClick: PropTypes.func.isRequired,
};

export default Column;
