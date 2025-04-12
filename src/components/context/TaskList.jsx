import Card from "../card/Card";
import { useTasks } from "../context/UseTask";
import { v4 as uuidv4 } from "uuid";
function TaskList() {
  const { tasks } = useTasks();

  return (
    <ul>
      {tasks.map((task) => (
        <Card
          key={task.id || uuidv4()}
          title={task.title}
          id={task.id}
          tasks={tasks}
          theme={task.theme}
          date={task.date}
          loading={false}
        />
      ))}
    </ul>
  );
}

export default TaskList;
