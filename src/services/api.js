const API_URL = "https://wedev-api.sky.pro/api/kanban";
//import axios from "axios";

const getAuthToken = () => {
  try {
    return localStorage.getItem("authToken");
  } catch (error) {
    console.error("Ошибка при получении токена из localStorage:", error);
    return null; // Или другое значение по умолчанию, например, ""
  }
};

const getHeaders = (contentType) => {
  const token = getAuthToken();
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `API error: ${response.status} - ${
        errorData.message || response.statusText
      }`
    );
  }
  return response.json();
};

export const getTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Ошибка при получении задач: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.tasks) {
      console.log("getTasks: data.tasks =", data.tasks);
      const tasksWithId = data.tasks.map((task) => ({
        ...task,
        id: task._id, // Копируем значение из _id в id
      }));
      return tasksWithId;
    } else {
      console.warn(
        "В ответе от сервера нет поля tasks. Возвращаю пустой массив."
      );
      return [];
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    const data = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(taskData),
    }).then(handleResponse);
    return data; // Or data.task if the API returns the added task
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const data = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(taskData),
    }).then(handleResponse);
    return data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const apiUpdateTask = async (taskId, taskData) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse);
    // No data is usually returned on DELETE, so return undefined
    return;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const data = await fetch(`${API_URL}/user`, {
      headers: getHeaders(),
    }).then(handleResponse);

    localStorage.setItem("user", JSON.stringify(data));
    return { isLoggedIn: true, user: data };
  } catch (error) {
    console.error("Error getting user:", error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return { isLoggedIn: false, user: null };
  }
};
