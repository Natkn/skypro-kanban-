import { Card, CardSecond, CardThird } from "../card/Card";
import PropTypes from "prop-types";

function Column({ tasks, loading }) {
  if (!Array.isArray(tasks)) {
    console.warn("Column.jsx: tasks is not an array!", tasks);
    return <p>Error: tasks is not an array.</p>; // Сообщение об ошибке
  }

  return (
    <div className="main__content">
      <div className="main__column column">
        <div className="column__title">
          <p>Без статуса</p>
        </div>
        <Card loading={loading} />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>Нужно сделать</p>
        </div>
        <CardSecond loading={loading} />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>В работе</p>
        </div>
        <CardThird loading={loading} />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>Тестирование</p>
        </div>
        <CardSecond loading={loading} />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>Готово</p>
        </div>
        <CardSecond loading={loading} />
      </div>
    </div>
  );
}
Column.propTypes = {
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
export default Column;
