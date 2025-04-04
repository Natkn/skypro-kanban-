import Card from "../card/Card";
import { useTasks } from "../context/UseTask";

function TaskList() {
  const { tasks } = useTasks();

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            theme={task.theme}
            title={task.title}
            date={task.date}
            loading={false}
          />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
