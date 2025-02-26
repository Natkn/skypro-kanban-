import "../../App";
import { useState } from "react";
import Calendar from "./Calendar";
import PropTypes from "prop-types";

function PopNewCard({ onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Design");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const handleSubmit = () => {
    // Валидация (необязательно)
    if (!title || !description) {
      return;
    }

    // Создание объекта задачи
    const newTask = {
      id: Date.now(),
      title,
      description,
      category,
      dueDate: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
      status: "todo",
    };

    // Вызов функции onCreateTask, переданной из родительского компонента
    onCreateTask(newTask);

    // Очистка формы
    setTitle("");
    setDescription("");
    setCategory("Web Design"); // Сбрасываем к значению по умолчанию
    setSelectedDate("");
  };
  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="#" className="pop-new-card__close">
              &#10006;
            </a>
            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                action="#"
              >
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                    value={title} // Устанавливаем значение из состояния
                    onChange={(e) => setTitle(e.target.value)} // Обновляем состояние при изменении
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description} // Устанавливаем значение из состояния
                    onChange={(e) => setDescription(e.target.value)} // Обновляем состояние при изменении
                  ></textarea>
                </div>
              </form>

              <Calendar onDateSelect={handleDateSelect} />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme _orange ${
                    category === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => setCategory("Web Design")}
                >
                  <p className="_orange">Web Design</p>
                </div>
                <div
                  className={`categories__theme _green ${
                    category === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => setCategory("Research")}
                >
                  <p className="_green">Research</p>
                </div>
                <div
                  className={`categories__theme _purple ${
                    category === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() => setCategory("Copywriting")}
                >
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>
            <button
              className="form-new__create _hover01"
              id="btnCreate"
              onClick={handleSubmit}
            >
              Создать задачу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

PopNewCard.propTypes = {
  onCreateTask: PropTypes.func.isRequired, // Пропс onCreateTask должен быть функцией и быть обязательным
};
export default PopNewCard;
