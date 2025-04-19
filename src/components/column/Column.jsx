import TaskList from "../context/TaskList";
import PropTypes from "prop-types";
import { MainColumn, ColumnTitle, ColumnTitleText } from "./Column.styled";
import { useDroppable } from "@dnd-kit/core";
import { useTasks } from "../context/UseTask";

export function Column({ title, tasks, status, handleCardClick }) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  const filteredTasks = tasks.filter((task) => task.status === status);
  const { loading } = useTasks();

  return (
    <MainColumn ref={setNodeRef}>
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
      cardtheme: PropTypes.string.isRequired,
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
