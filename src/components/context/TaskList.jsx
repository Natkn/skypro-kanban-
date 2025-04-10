import Card from "../card/Card";
import { useTasks } from "../context/UseTask";
import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
  width: 250px;
`;

const ColumnTitle = styled.h2`
  margin-bottom: 10px;
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
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.entries(groupedTasks).map(([status, tasksForStatus]) => (
        <ColumnContainer key={status}>
          <ColumnTitle>
            {status === "noStatus"
              ? "Без статуса"
              : status === "needToDo"
              ? "Нужно сделать"
              : status === "inProcess"
              ? "В работе"
              : status === "test"
              ? "Тестирование"
              : "Готово"}
          </ColumnTitle>
          {tasksForStatus.map((task) => (
            <Card
              key={task.id}
              task={task}
              theme={task.theme}
              title={task.title}
              date={task.date}
              loading={false}
            />
          ))}
        </ColumnContainer>
      ))}
    </div>
  );
}

export default TaskList;
