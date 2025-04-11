const API_URL = "https://wedev-api.sky.pro/api/kanban"; // Предполагаем, что базовый URL остается прежним
const token = localStorage.getItem("authToken");

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
export async function updateTask(taskId, taskData) {
  // taskId - id задачи, taskData - обновленные данные
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      // Используем taskId в URL
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData), // taskData содержит данные для обновления
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Ошибка при обновлении задачи с ID ${taskId}`
      );
    }

    const data = await response.json();
    return data; // Возвращаем обновленную задачу (или сообщение об успехе)
  } catch (error) {
    console.error(`Ошибка при обновлении задачи с ID ${taskId}:`, error);
    throw error; //  Передаем ошибку дальше, чтобы можно было ее обработать в компоненте
  }
}

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
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(API_URL + "/user", {
      // Убедитесь, что это правильный URL
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      //console.error("getUser error:", response.status, response.statusText); // Для отладки
      return { isLoggedIn: false, user: null }; // Возвращаем объект с isLoggedIn: false
    }

    const data = await response.json();
    console.log("getUser data:", data); // Проверьте структуру ответа
    return { isLoggedIn: true, user: data }; //  Возвращаем объект с данными пользователя и isLoggedIn: true
  } catch (error) {
    console.error("getUser error:", error); // Логируем ошибку
    return { isLoggedIn: false, user: null }; // Возвращаем объект с isLoggedIn: false
  }
}
