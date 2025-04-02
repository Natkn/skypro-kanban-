/*import axios from "axios";

const API_URL_WORDS = "https://wedev-api.sky.pro/api/words/";
const API_URL_AUTH = "https://wedev-api.sky.pro/api/user";

const createAuthorizationHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const editWord = async ({ token, id, word }) => {
  try {
    const response = await axios.patch(`${API_URL_WORDS}${id}`, word, {
      headers: {
        ...createAuthorizationHeader(token),
        "Content-Type": "text/html",
      },
    });
    return response.data.words; // Changed from tasks to words
  } catch (error) {
    throw new Error(`Failed to edit word: ${error.message}`);
  }
};

// Функции для аутентификации (signIn и signUp)
export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/login`, userData);
    return response.data.user;
  } catch (error) {
    throw new Error(`Failed to sign in: ${error.response.data.error}`);
  }
};

export const signUp = async (userData) => {
  try {
    const response = await axios.post(API_URL_AUTH, userData);
    return response.data.user;
  } catch (error) {
    throw new Error(`Failed to sign up: ${error.response.data.error}`);
  }
};
*/
