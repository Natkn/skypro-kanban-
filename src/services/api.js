const API_URL = "https://wedev-api.sky.pro/api/kanban";
import axios from "axios";

const getAuthToken = () => localStorage.getItem("authToken");

const getHeaders = (contentType = "application/json") => {
  const token = getAuthToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
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

/*export const getTasks = async () => {
  try {
    const data = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    }).then(handleResponse);
    return data.tasks || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};*/

export async function getTasks({ token, taskId }) {
  try {
    const data = await axios.get(API_URL + "/" + taskId, {
      headers: {
        authorization: `Bearer ${token}`.replaceAll('"', ""),
      },
    });
    return data.data.task;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

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
    return data; // Or data.task if the API returns the updated task
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
