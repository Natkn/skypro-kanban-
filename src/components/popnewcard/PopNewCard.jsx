import { useState, useCallback } from "react";
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
import { useTasks } from "../context/UseTask";

function PopNewCard({ onClose }) {
  const [dateLabel] = useState("Выберите срок исполнения:");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Design");
  const [selectedDate, setSelectedDate] = useState(null);
  const { createTask } = useTasks();

  const handleDateSelect = useCallback(
    (date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !description) {
      return;
    }

    // Создание объекта задачи
    const newTask = {
      title,
      description,
      theme: category,
      date: selectedDate ? selectedDate.toISOString() : null,
      status: "noStatus", //  Set default status
    };
    console.log("Создаваемая задача:", newTask);
    try {
      createTask(newTask); //  Use the createTask function from context
      onClose(); // Close the modal after successful task creation
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      alert("Произошла ошибка при создании задачи.");
    }

    // Очистка формы
    setTitle("");
    setDescription("");
    setCategory("Web Design");
    setSelectedDate(null);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formattedSelectedDate = formatDate(selectedDate);

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
              <PopNewCardForm id="formNewCard" onSubmit={handleSubmit}>
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
                </FormNewBlock>{" "}
              </PopNewCardForm>
              <Calendar
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                dateLabel={dateLabel}
              />
              <input
                type="hidden"
                id="datepick_value"
                value={formattedSelectedDate}
              />
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
            <FormNewCreate id="btnCreate" onClick={handleSubmit} href="#">
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
