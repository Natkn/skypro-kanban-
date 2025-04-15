const API_URL = "https://wedev-api.sky.pro/api/kanban"; // Предполагаем, что базовый URL остается прежним
const token = localStorage.getItem("authToken");

const getAuthToken = () => {
  return token;
};

const getHeaders = () => {
  const token = getAuthToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return headers;
};

// Обработка ошибок и получение JSON
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();

  return data;
};

// Получить список задач
export const getTasks = async () => {
  {
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
  }
};

export const apiGetTasks = async () => {
  const response = await fetch("/api/tasks");
  const data = await response.json();
  return data.map((task) => ({
    ...task,
    status: task.status || "noStatus",
    theme: task.theme || "defaultTheme",
    cardtheme: task.cardtheme || "defaultCardTheme",
  }));
};

// Добавить задачу
export async function addTask(taskData) {
  {
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
  }
}

export const apiAddTask = async (newTask) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {},
    body: JSON.stringify(newTask),
  });
  const data = await response.json();
  return data; // Возвращаем обновленные данные
};

// Изменить задачу
export async function updateTask(taskId, taskData) {
  // taskId - id задачи, taskData - обновленные данные
  {
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
  }
}

export const apiUpdateTask = async (id, data) => {
  {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {},
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Ошибка при обновлении задачи с ID ${id}`);
    }
    return await response.json();
  }
};

// Удалить задачу
export const deleteTask = async (taskId) => {
  {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Не забудьте про авторизацию
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Ошибка API: ${response.status} - ${
          errorData.message || "Неизвестная ошибка"
        }`
      );
    }

    const data = await response.json();
    return data; // Возвращаем обновленный список задач с сервера
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
