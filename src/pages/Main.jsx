import styled from "styled-components";
import Header from "../components/header/Header.jsx";
import { useCallback, useState, useEffect } from "react";
import Column from "../components/column/Column.jsx";
import { cardList } from "../mock/data.js";
import PopNewCard from "../components/popnewcard/PopNewCard.jsx";
import PopBrowse from "../components/popbrowse/PopBrowse";
import { CardContext } from "../components/context/CardContext";
import { useTasks } from "../components/context/UseTask.jsx";
import TaskList from "../components/context/TaskList.jsx";
import { useAuth } from "../components/context/AuthContext.js";

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
  const [selectedTask, setSelectedTask] = useState(null);
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createTask, fetchTasks } = useTasks();

  console.log("MainPage: isLoggedIn =", isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [fetchTasks, isLoggedIn]);

  useEffect(() => {
    console.log("MainPage: isLoggedIn =", isLoggedIn);
  }, [isLoggedIn]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = async (newTask) => {
    try {
      await createTask(newTask);
      handleCloseModal();
      setIsPopNewCardOpen(false); // Close PopNewCard after creating task
    } catch {
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
    const taskIdString = String(taskId); // Приводим taskId к строке
    console.log("handleCardButtonClick: taskIdString =", taskIdString);
    console.log("handleCardButtonClick: tasks =", tasks);
    const task = tasks.find(
      (task) =>
        String(task._id) === taskIdString || String(task.id) === taskIdString
    ); // Ищем по _id или id
    console.log("handleCardButtonClick: task =", task);
    setSelectedTask(task);
    setIsPopBrowseOpen(true);
  };

  const handleClosePopBrowse = () => {
    setIsPopBrowseOpen(false);
    setSelectedTask(null);
  };

  const handleOpenPopBrowse = () => {
    setIsPopBrowseOpen(true);
  };

  useEffect(() => {
    console.log("MainPage: isLoggedIn =", isLoggedIn);
    console.log("MainPage: tasks =", tasks);
  }, [isLoggedIn, tasks]);
  const handleCardClick = (taskId) => {
    console.log("handleCardClick: taskId =", taskId);
    setSelectedTask(taskId);
    handleOpenPopBrowse();
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
            </div>{" "}
          </div>

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
        </main>
      </Container>
    </CardContext.Provider>
  );
};

export default MainPage;
