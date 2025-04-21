import styled from "styled-components";
import Header from "../header/Header.jsx";
import { useCallback, useState } from "react";
import Column from "../column/Column.jsx";
import PopNewCard from "../popnewcard/PopNewCard.jsx";
import PopBrowse from "../popbrowse/PopBrowse.jsx";
import { CardContext } from "../../context/CardContext.js";
import { useTasks } from "../../context/UseTask.jsx";
import TaskList from "../../context/TaskList.jsx";
import { MainContainer, MainBlock } from "./Main.js";

const Container = styled.div`
  width: 100vw;
`;
const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainPage = () => {
  const [loading] = useState(true);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [isModalOpen] = useState(false);
  const { createTask, tasks } = useTasks();

  const handleCloseModal = () => {
    setIsPopNewCardOpen(false);
  };

  const handleCreateTask = async (newTask) => {
    try {
      await createTask(newTask);
      handleCloseModal();
      setIsPopNewCardOpen(false);
    } catch {
      alert("Произошла ошибка при создании задачи.");
    }
  };

  const openPopNewCardHandler = useCallback(() => {
    setIsPopNewCardOpen(true);
  }, [setIsPopNewCardOpen]);

  const handleCardButtonClick = (taskId) => {
    setSelectedTask(tasks.find((task) => task._id === taskId));
    setIsPopBrowseOpen(true);
  };

  const handleClosePopBrowse = () => {
    setIsPopBrowseOpen(false);
    setSelectedTask(null);
  };

  const handleCardClick = (taskId) => {
    setSelectedTask(tasks.find((task) => task._id === taskId));
    setIsPopBrowseOpen(true);
  };

  return (
    <CardContext.Provider value={{ handleCardButtonClick }}>
      <Container>
        <Header openPopNewCard={openPopNewCardHandler} />

        <MainContainer>
          {isModalOpen && (
            <PopNewCard
              onClose={handleCloseModal}
              onCreateTask={handleCreateTask}
            />
          )}
          <MainBlock>
            <ColumnsWrapper>
              <Column
                title={"Без статуса"}
                tasks={tasks}
                loading={loading}
                status={"noStatus"}
                handleCardClick={handleCardClick}
              />
              <TaskList handleCardButtonClick={handleCardButtonClick} />
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
              handleCardClick={handleCardClick}
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
          </MainBlock>{" "}
        </MainContainer>

        {isPopNewCardOpen && (
          <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
        )}
        {isPopBrowseOpen && (
          <>
            <PopBrowse
              isOpen={isPopBrowseOpen}
              task={selectedTask}
              onClose={handleClosePopBrowse}
            />
          </>
        )}
      </Container>
    </CardContext.Provider>
  );
};

export default MainPage;
