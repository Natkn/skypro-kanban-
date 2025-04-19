import Card from "../card/Card";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MainColumn, ColumnTitle, ColumnTitleText } from "./Column.styled";
import { useDroppable } from "@dnd-kit/core";
export function Column({ title, tasks, loading, status, handleCardClick }) {
  console.log("Column: tasks =", tasks);
  const { setNodeRef } = useDroppable({
    id: title,
  });

  const filteredTasks = (tasks || []).filter((task) => task.status === status);
  return (
    <MainColumn ref={setNodeRef}>
      <ColumnTitle>
        <ColumnTitleText>{title}</ColumnTitleText>
      </ColumnTitle>
      {loading
        ? Array.from({ length: (tasks || []).length }).map(() => (
            <Card
              key={uuidv4()}
              loading={true}
              cardTheme=""
              theme=""
              title=""
              date=""
              description=""
              topic=""
              status=""
              id=""
            />
          ))
        : filteredTasks.map((task) => (
            <Card
              key={task._id || uuidv4()}
              id={task._id}
              theme={task.topic}
              title={task.title}
              date={task.date}
              onClick={() => handleCardClick(task._id)}
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
      cardtheme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardButtonClick: PropTypes.func.isRequired,
};

export default Column;
