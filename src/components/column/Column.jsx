import Card from "../card/Card";
import PropTypes from "prop-types";

export function ColumnStatus({ tasks, loading }) {
  const filteredTasks = tasks.filter((task) => task.status === "Без статуса");

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>Без статуса</p>
      </div>
      {loading
        ? // Рендерим Card с loading={true} и значениями по умолчанию
          Array.from({ length: filteredTasks.length }).map((_, index) => (
            <Card key={index} loading={true} theme="" title="" date="" />
          ))
        : filteredTasks.map((task) => (
            <Card
              loading={loading}
              key={task.id}
              theme={task.theme}
              title={task.title}
              date={task.date}
            />
          ))}
    </div>
  );
}

ColumnStatus.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      theme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export function ColumnToDo({ tasks, loading }) {
  const filteredTasks = tasks.filter((task) => task.status === "Нужно сделать");

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>Нужно сделать</p>
      </div>
      {loading
        ? // Рендерим Card с loading={true} для каждой задачи
          Array.from({ length: filteredTasks.length }).map((_, index) => (
            <Card key={index} loading={true} />
          ))
        : filteredTasks.map((task) => (
            <Card
              key={task.id}
              theme={task.theme}
              title={task.title}
              date={task.date}
              loading={loading} // Передаем loading={false}, когда данные загружены
            />
          ))}
    </div>
  );
}

ColumnToDo.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      theme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export function ColumnInProcess({ tasks, loading }) {
  const filteredTasks = tasks.filter((task) => task.status === "В работе");

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>В работе</p>
      </div>
      {loading
        ? // Рендерим Card с loading={true} для каждой задачи
          Array.from({ length: filteredTasks.length }).map((_, index) => (
            <Card key={index} loading={true} />
          ))
        : filteredTasks.map((task) => (
            <Card
              key={task.id}
              theme={task.theme}
              title={task.title}
              date={task.date}
              loading={loading} // Передаем loading={false}, когда данные загружены
            />
          ))}
    </div>
  );
}

ColumnInProcess.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      theme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export function ColumnTest({ tasks, loading }) {
  const filteredTasks = tasks.filter((task) => task.status === "Тестирование");

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>Тестирование</p>
      </div>
      {loading
        ? // Рендерим Card с loading={true} для каждой задачи
          Array.from({ length: filteredTasks.length }).map((_, index) => (
            <Card key={index} loading={true} />
          ))
        : filteredTasks.map((task) => (
            <Card
              key={task.id}
              theme={task.theme}
              title={task.title}
              date={task.date}
              loading={loading} // Передаем loading={false}, когда данные загружены
            />
          ))}
    </div>
  );
}

ColumnTest.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      theme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export function ColumnReady({ tasks, loading }) {
  const filteredTasks = tasks.filter((task) => task.status === "Готово");

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>Готово</p>
      </div>
      {loading
        ? // Рендерим Card с loading={true} для каждой задачи
          Array.from({ length: filteredTasks.length }).map((_, index) => (
            <Card key={index} loading={true} />
          ))
        : filteredTasks.map((task) => (
            <Card
              key={task.id}
              theme={task.theme}
              title={task.title}
              date={task.date}
              loading={loading} // Передаем loading={false}, когда данные загружены
            />
          ))}
    </div>
  );
}

ColumnReady.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      theme: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
