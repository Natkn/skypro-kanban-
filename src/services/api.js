const API_URL = "https://wedev-api.sky.pro/api/kanban"; // Предполагаем, что базовый URL остается прежним
console.log("API_URL =", API_URL);

const token = localStorage.getItem("authToken");

const getAuthToken = () => {
  console.log("getAuthToken: token =", token);
  return token;
};

const getHeaders = () => {
  const token = getAuthToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log("getHeaders: headers =", headers);
  return headers;
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

    // Проверяем, что data существует и содержит tasks
    if (data && data.tasks) {
      return data.tasks;
    } else {
      return []; // Возвращаем пустой массив
    }
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
};

// Добавить задачу
export async function addTask(taskData) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(API_URL, {
      // Исправлено: используем POST и URL /kanban
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка при добавлении задачи");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw error;
  }
}

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

export const apiUpdateTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      // Исправлено: используем URL /kanban/:id
      method: "PATCH",
      headers: getHeaders(), // Используем getHeaders()
      body: JSON.stringify(data),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    throw error;
  }
};

// Удалить задачу
export const deleteTask = async (taskId) => {
  try {
    const token = getAuthToken();
    console.log("Токен:", token); //  Проверяем токен
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response); // Get JSON from handleResponse
    return data.tasks;
  } catch (error) {
    console.error(`Ошибка при удалении задачи с ID ${taskId}:`, error);
    throw error;
  }
};

export async function getUser() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(API_URL + "/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      return { isLoggedIn: false, user: null };
    }

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data)); // Сохраняем данные пользователя
    return { isLoggedIn: true, user: data };
  } catch {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return { isLoggedIn: false, user: null };
  }
}
