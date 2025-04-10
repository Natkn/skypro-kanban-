const API_URL = "https://wedev-api.sky.pro/api/kanban";

const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  console.log("Токен из localStorage:", token); // Add this line
  return token;
};

const getHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Обработка ошибок и получение JSON
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Ошибка API:", errorData);
    throw new Error(`Ошибка API: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Данные, полученные от сервера:", data); // Add this line
  return data;
};

// Получить список задач
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await handleResponse(response); // Get JSON from handleResponse
    return data.tasks;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
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

    const data = await handleResponse(response); // Get JSON from handleResponse
    return data.tasks;
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw error;
  }
};

// Изменить задачу
export const updateTask = async (id, taskData) => {
  try {
    const token = getAuthToken();
    const url = `${API_URL}/${String(id)}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify(taskData);

    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: body,
    });

    const data = await handleResponse(response); // Get JSON from handleResponse
    return data.tasks; // Return updated tasks
  } catch (error) {
    console.error(`Ошибка при обновлении задачи с ID ${id}:`, error);
    throw error;
  }
};

// Удалить задачу
export const deleteTask = async (id) => {
  try {
    const token = getAuthToken();
    console.log("Токен:", token); //  Проверяем токен
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response); // Get JSON from handleResponse
    return data.tasks;
  } catch (error) {
    console.error(`Ошибка при удалении задачи с ID ${id}:`, error);
    throw error;
  }
};

export async function getUser() {
  const token = localStorage.getItem("authToken");
  const response = await fetch(API_URL + "/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Добавьте заголовок Authorization
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Ошибка при получении данных пользователя"
    );
  }

  const data = await response.json();
  return data;
}
