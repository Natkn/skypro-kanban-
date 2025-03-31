import Card from "../card/Card";
import { useTasks } from "../context/TaskContext";

function TaskList() {
  const { tasks } = useTasks();

  return (
    <ul>
      {tasks.map((task, index) => (
        <Card
          key={task.id}
          id={task.id}
          index={index}
          theme={task.theme}
          title={task.title}
          date={task.date}
          loading={false}
        />
      ))}
    </ul>
  );
}

export default TaskList;
