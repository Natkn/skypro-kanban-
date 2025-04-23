import { useState, useCallback, useContext } from "react";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import { ThemeContext } from "../../themecontent/themeContext";
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
import TaskContext from "../../context/TaskContext";
import { useTasks } from "../../context/UseTask";

function PopNewCard({ onClose, cardtheme }) {
  const [dateLabel] = useState("Выберите срок исполнения:");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Design");
  const { createTask } = useTasks();
  const [selectedDate, setSelectedDate] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { fetchTasks } = useContext(TaskContext);

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

    const newTask = {
      title: title,
      description: description,
      topic: category,
      date: selectedDate ? selectedDate.toISOString() : null,
      status: "noStatus",
    };

    try {
      createTask(newTask);
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      alert("Произошла ошибка при создании задачи.");
    }

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
    <PopNewCardWrapper
      onClick={(e) => e.stopPropagation()}
      theme={theme}
      cardtheme={cardtheme}
    >
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
            <CategoriesP theme={theme} cardtheme={cardtheme}>
              Категория
            </CategoriesP>
            <CategoriesThemes>
              <CategoriesTheme
                $active={category === "Web Design"}
                onClick={() => setCategory("Web Design")}
                $category="Web Design"
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
  task: PropTypes.shape({
    date: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  theme: PropTypes.func.isRequired,
  topic: PropTypes.func.isRequired,
  cardtheme: PropTypes.string.isRequired,
  getTasks: PropTypes.func.isRequired,
};
export default PopNewCard;
