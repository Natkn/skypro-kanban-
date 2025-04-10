import Card from "../card/Card";
import { useTasks } from "../context/UseTask";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  margin: 10px;
  width: 250px;
`;

function TaskList() {
  const { tasks } = useTasks();

  //  Группируем задачи по статусу
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedTasks).map(([status, tasksForStatus]) => (
        <ColumnContainer key={status}>
          {status === "noStatus"
            ? "Без статуса"
            : status === "needToDo"
            ? "Нужно сделать"
            : status === "inProcess"
            ? "В работе"
            : status === "test"
            ? "Тестирование"
            : "Готово"}

          {tasksForStatus.map((task) => (
            <Card
              key={task.id || uuidv4()}
              task={task}
              theme={task.theme}
              title={task.title}
              date={task.date}
              loading={false}
              description={task.description}
            />
          ))}
        </ColumnContainer>
      ))}
    </div>
  );
}

export default TaskList;
