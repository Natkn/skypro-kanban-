import { Card, CardSecond, CardThird } from "./Card";

function Column() {
  return (
    <div className="main__content">
      <div className="main__column column">
        <div className="column__title">
          <p>Без статуса</p>
        </div>
        <Card />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>Нужно сделать</p>
        </div>
        <CardSecond />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>В работе</p>
        </div>
        <CardThird />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>Тестирование</p>
        </div>
        <CardSecond />
      </div>
      <div className="main__column">
        <div className="column__title">
          <p>Готово</p>
        </div>
        <CardSecond />
      </div>
    </div>
  );
}

export default Column;
