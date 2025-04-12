import Card from "../card/Card";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MainColumn, ColumnTitle, ColumnTitleText } from "./Column.styled";

export function Column({ title, tasks, loading, status, handleCardClick }) {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <MainColumn>
      <ColumnTitle>
        <ColumnTitleText>{title}</ColumnTitleText>
      </ColumnTitle>
      {loading
        ? Array.from({ length: filteredTasks.length }).map(() => (
            <Card key={uuidv4()} loading={true} theme="" title="" date="" />
          ))
        : filteredTasks.map((task) => (
            <Card
              key={task._id || uuidv4()}
              theme={task.theme}
              title={task.title}
              date={task.date}
              id={task.id}
              onClick={() => handleCardClick(task.id)}
            />
          ))}
    </MainColumn>
  );
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Column;
