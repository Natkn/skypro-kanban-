const API_URL = "https://wedev-api.sky.pro/api/kanban";

// Получить токен из локального хранилища или другого источника
const getAuthToken = () => {
  return localStorage.getItem("authToken"); //  Пример: получаем токен из localStorage
};

const getHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Обработка ошибок
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json(); // Попытка получить детали ошибки из тела ответа
    console.error("Ошибка API:", errorData);
    throw new Error(`Ошибка API: ${response.status} - ${response.statusText}`);
  }
  return response;
};

// Получить список задач
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    await handleResponse(response);
    const data = await response.json();
    return data.tasks;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
};

// Получить задачу по ID
export const getTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });

    await handleResponse(response);
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error(`Ошибка при получении задачи с ID ${id}:`, error);
    throw error;
  }
};

// Добавить задачу
export const addTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(taskData),
    });

    await handleResponse(response);
    const data = await response.json();
    return data.tasks; // Возвращает обновленный список задач
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw error;
  }
};

// Изменить задачу
export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(taskData),
    });

    await handleResponse(response);
    const data = await response.json();
    return data.tasks; // Возвращает обновленный список задач
  } catch (error) {
    console.error(`Ошибка при обновлении задачи с ID ${id}:`, error);
    throw error;
  }
};

// Удалить задачу
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    await handleResponse(response);
    const data = await response.json();
    return data.tasks; // Возвращает обновленный список задач
  } catch (error) {
    console.error(`Ошибка при удалении задачи с ID ${id}:`, error);
    throw error;
  }
};

/*

import React, { useState, useEffect } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";

function MyComponent() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
        // Обработайте ошибку, например, покажите сообщение пользователю
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const updatedTasks = await addTask(newTask);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const updatedTasks = await updateTask(id, updatedTask);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const updatedTasks = await deleteTask(id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };*/
