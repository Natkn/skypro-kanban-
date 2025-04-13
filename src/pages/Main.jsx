import styled from "styled-components";
import Header from "../components/header/Header.jsx";
import { useCallback, useState, useEffect } from "react";
import Column from "../components/column/Column.jsx";
import { cardList } from "../mock/data.js";
import PopNewCard from "../components/popnewcard/PopNewCard.jsx";
import PopBrowse from "../components/popbrowse/PopBrowse";
import { CardContext } from "../components/context/CardContext";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../components/context/UseTask.jsx";
import TaskList from "../components/context/TaskList.jsx";

const Container = styled.div`
  width: 100vw;
`;
const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask, selectedCardId] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createTask } = useTasks();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = async (newTask) => {
    try {
      await createTask(newTask);
      handleCloseModal();
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      alert("Произошла ошибка при создании задачи.");
    }
  };

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
    const task = tasks.find((task) => task._id === taskId);
    setSelectedTask(task);
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
            {isModalOpen && (
              <PopNewCard
                onClose={handleCloseModal}
                onCreateTask={handleCreateTask}
              />
            )}
            <div className="main__block">
              <ColumnsWrapper>
                <Column
                  title={"Без статуса"}
                  tasks={tasks}
                  loading={loading}
                  status={"noStatus"}
                  handleCardClick={handleCardClick}
                />
                <TaskList />
              </ColumnsWrapper>
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
            </div>{" "}
          </div>

          {isPopNewCardOpen && (
            <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
          )}
          {isPopBrowseOpen && (
            <>
              <PopBrowse
                task={selectedTask}
                onClose={handleClosePopBrowse}
                cardId={selectedCardId}
                taskId={selectedTask?._id}
              />
            </>
          )}
        </main>
      </Container>
    </CardContext.Provider>
  );
};

export default MainPage;
