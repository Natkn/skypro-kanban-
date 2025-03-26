import styled from "styled-components";
import Header from "../components/header/Header.jsx";
import { useCallback, useState, useEffect } from "react";
import Column from "../components/column/Column.jsx";
import { cardList } from "../mock/data.js";
import PopNewCard from "../components/popnewcard/PopNewCard.jsx";

const Container = styled.div`
  width: 100vw;
`;

const MainPage = () => {
  const [loading, setLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);

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

  return (
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
            />
            <Column
              title={"Нужно сделать"}
              tasks={tasks}
              loading={loading}
              status={"needToDo"}
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
            />
            <Column
              title={"Готово"}
              tasks={tasks}
              loading={loading}
              status={"ready"}
            />
          </div>
        </div>
        {isPopNewCardOpen && (
          <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
        )}
      </main>
    </Container>
  );
};
export default MainPage;
