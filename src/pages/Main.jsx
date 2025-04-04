import styled from "styled-components";
import Header from "../components/header/Header.jsx";
import { useCallback, useState, useEffect } from "react";
import Column from "../components/column/Column.jsx";
import { cardList } from "../mock/data.js";
import PopNewCard from "../components/popnewcard/PopNewCard.jsx";
import PopBrowse from "../components/popbrowse/PopBrowse";
import { CardContext } from "../components/context/CardContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
`;

const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const dataLoadTimer = setTimeout(() => {
      setTasks(cardList);
    }, 500);

    const loadingHideTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(dataLoadTimer);
      clearTimeout(loadingHideTimer);
    };
  }, []);

  const openPopNewCardHandler = useCallback(() => {
    setIsPopNewCardOpen(true);
  }, [setIsPopNewCardOpen]);

  const handleCardButtonClick = (taskId) => {
    console.log("Button clicked!");
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
    console.log({ selectedTask });
    setIsPopBrowseOpen(true);
  };

  const handleClosePopBrowse = () => {
    setIsPopBrowseOpen(false);
    setSelectedTask(null);
  };

  const handleCardClick = (taskId) => {
    navigate(`/card/${taskId}`);
  };

  return (
    <CardContext.Provider value={{ handleCardButtonClick }}>
      <Container>
        <Header openPopNewCard={openPopNewCardHandler} />
        <main className="main">
          <div className="container">
            <div className="main__block">
              <Column
                title={"Без статуса"}
                tasks={tasks}
                loading={loading}
                status={"noStatus"}
                handleCardClick={handleCardClick}
              />
              <Column
                title={"Нужно сделать"}
                tasks={tasks}
                loading={loading}
                status={"needToDo"}
                handleCardClick={handleCardClick}
              />
              <Column
                title={"В работе"}
                tasks={tasks}
                loading={loading}
                status={"inProcess"}
              />
              <Column
                title={"Тестирование"}
                tasks={tasks}
                loading={loading}
                status={"test"}
                handleCardClick={handleCardClick}
              />
              <Column
                title={"Готово"}
                tasks={tasks}
                loading={loading}
                status={"ready"}
                handleCardClick={handleCardClick}
              />
            </div>
          </div>
          {isPopNewCardOpen && (
            <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
          )}
          {isPopBrowseOpen && (
            <>
              {console.log("Rendering PopBrowse with task:", selectedTask)}
              <PopBrowse task={selectedTask} onClose={handleClosePopBrowse} />
            </>
          )}
        </main>
      </Container>
    </CardContext.Provider>
  );
};

export default MainPage;
