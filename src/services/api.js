const API_URL = "https://wedev-api.sky.pro/api/kanban"; // Предполагаем, что базовый URL остается прежним

const getAuthToken = () => {
  const token = localStorage.getItem("authToken");

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
export const apiUpdateTask = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Ошибка при обновлении задачи с ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    throw error;
  }
};

// Удалить задачу
export const deleteTask = async (_id) => {
  try {
    const token = getAuthToken();

    const response = await fetch(`${API_URL}/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response); // Get JSON from handleResponse
    return data.tasks;
  } catch (error) {
    console.error(`Ошибка при удалении задачи с ID ${_id}:`, error);
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
