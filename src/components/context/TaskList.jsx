import Card from "../card/Card";
import { useTasks } from "../context/UseTask";
import { v4 as uuidv4 } from "uuid";
function TaskList() {
  const { tasks } = useTasks();

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <Card
            key={task._id || uuidv4()}
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
