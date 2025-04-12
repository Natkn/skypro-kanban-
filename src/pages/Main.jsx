import styled from "styled-components";
import Header from "../components/header/Header.jsx";
import { useCallback, useState, useEffect, useContext } from "react";
import Column from "../components/column/Column.jsx";
import PopNewCard from "../components/popnewcard/PopNewCard.jsx";
import PopBrowse from "../components/popbrowse/PopBrowse";
import { CardContext } from "../components/context/CardContext";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../components/context/UseTask.jsx";
import TaskList from "../components/context/TaskList.jsx";
import { useAuth } from "../components/context/AuthContext.js";
import TaskContext from "../components/context/TaskContext.js";

const Container = styled.div`
  width: 100vw;
`;
const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainPage = () => {
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const { isLoggedIn } = useAuth();
  const { tasks, loading, fetchTasks } = useContext(TaskContext);

  console.log("MainPage: isLoggedIn =", isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [fetchTasks, isLoggedIn]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = async (newTask) => {
    try {
      await createTask(newTask);
      handleCloseModal();
      setIsPopNewCardOpen(false); // Close PopNewCard after creating task
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      alert("Произошла ошибка при создании задачи.");
    }
  };

  const openPopNewCardHandler = useCallback(() => {
    setIsPopNewCardOpen(true);
  }, [setIsPopNewCardOpen]);

  const handleCardButtonClick = (taskId) => {
    const task = tasks.find(
      (task) => task.id === taskId || task._id === taskId
    );
    console.log("MainPage.jsx: selectedTask =", task); // Add this line
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
          {isLoggedIn ? (
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
              </div>
            </div>
          ) : (
            <p>Пожалуйста, войдите в систему.</p>
          )}
          {isPopNewCardOpen && (
            <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
          )}
          {isPopBrowseOpen && (
            <>
              <PopBrowse task={selectedTask} onClose={handleClosePopBrowse} />
            </>
          )}
        </main>
      </Container>
    </CardContext.Provider>
  );
};

export default MainPage;
