import { useState } from "react";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import {
  PopNewCardWrapper,
  PopNewCardContainer,
  PopNewCardBlock,
  PopNewCardContent,
  PopNewCardTtl,
  PopNewCardClose,
  PopNewCardWrap,
  PopNewCardForm,
  FormNewBlock,
  FormNewInput,
  FormNewArea,
  FormNewCreate,
  Subttl,
  CategoriesP,
  CategoriesThemes,
  CategoriesTheme,
} from "./PopNewCardStyled";
import { theme } from "./PopNewCardStyled";

function PopNewCard({ onCreateTask, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Design");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect =
    ((date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]);

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
    setCategory("Web Design");
    setSelectedDate("");
  };
  return (
    <PopNewCardWrapper onClick={(e) => e.stopPropagation()}>
      <PopNewCardContainer>
        <PopNewCardBlock>
          <PopNewCardContent>
            <PopNewCardTtl>Создание задачи</PopNewCardTtl>
            <PopNewCardClose href="#" onClick={onClose}>
              &#10006;
            </PopNewCardClose>
            <PopNewCardWrap>
              <PopNewCardForm id="formNewCard" action="#">
                <FormNewBlock>
                  <Subttl htmlFor="formTitle">Название задачи</Subttl>
                  <FormNewInput
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormNewBlock>
                <FormNewBlock>
                  <Subttl htmlFor="textArea">Описание задачи</Subttl>
                  <FormNewArea
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormNewBlock>
              </PopNewCardForm>
              <Calendar onDateSelect={handleDateSelect} />
            </PopNewCardWrap>
            <CategoriesP>Категория</CategoriesP>
            <CategoriesThemes>
              <CategoriesTheme
                $active={category === "Web Design"}
                onClick={() => setCategory("Web Design")}
                $category="WebDesign"
                theme={theme}
              >
                Web Design
              </CategoriesTheme>
              <CategoriesTheme
                $active={category === "Research"}
                onClick={() => setCategory("Research")}
                $category="Research"
                theme={theme}
              >
                Research
              </CategoriesTheme>
              <CategoriesTheme
                $active={category === "Copywriting"}
                onClick={() => setCategory("Copywriting")}
                $category="Copywriting"
                theme={theme}
              >
                Copywriting
              </CategoriesTheme>
            </CategoriesThemes>
            <FormNewCreate id="btnCreate" onClick={handleSubmit}>
              Создать задачу
            </FormNewCreate>
          </PopNewCardContent>
        </PopNewCardBlock>
      </PopNewCardContainer>
    </PopNewCardWrapper>
  );
}

PopNewCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired,
};
export default PopNewCard;
