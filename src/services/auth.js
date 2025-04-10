const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn(userData) {
  const response = await fetch(API_URL + "/login", {
    method: "POST",
    headers: {},
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Ошибка при входе");
  }

  localStorage.setItem("authToken", data.token);
  return data.user;
}

export async function signUp({ name, login, password }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {},
    body: JSON.stringify({ name, login, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Ошибка при регистрации");
  }

  localStorage.setItem("authToken", data.token);
  return data.user;
}
