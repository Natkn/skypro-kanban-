import { useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import {
  Wrapper,
  ContainerSignin,
  Modal,
  ModalBlock,
  ModalTtl,
  ModalFormLogin,
  ModalInput,
  ModalBtnEnter,
  ModalFormGroup,
} from "./SignUpStyled";
import { useNavigate, Link } from "react-router-dom";
import { signIn, signUp } from "../../services/auth";
import { AuthContext } from "../context/AuthContext";

const validateForm = (formData, isSignUp, setError, setErrors) => {
  const newErrors = { name: "", login: "", password: "" };
  let isValid = true;

  if (isSignUp && !formData.name.trim()) {
    newErrors.name = true;
    setError("Заполните все поля");
    isValid = false;
  }

  if (!formData.login.trim()) {
    newErrors.login = true;
    setError("Заполните все поля");
    isValid = false;
  }

  if (!formData.password.trim()) {
    newErrors.password = true;
    setError("Заполните все поля");
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

function AuthForm({ isSignUp }) {
  const { updateUserInfo, onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Состояние полей формы
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });

  // Состояние ошибок
  const [errors, setErrors] = useState({
    name: "",
    login: "",
    password: "",
  });

  // Состояние текста ошибки, чтобы показать пользователю
  const [error, setError] = useState("");

  // Функция, которая отслеживает изменения в полях и меняет состояние компонента
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
    setError("");
  };

  // Функция отправки формы
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const isValid = validateForm(formData, isSignUp, setError, setErrors);
      if (!isValid) {
        setError("Пожалуйста, заполните все обязательные поля."); // Or a more specific message
        return;
      }

      {
        let data;
        if (isSignUp) {
          data = await signUp(formData);
        } else {
          data = await signIn(formData);
        }

        if (data && data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Data from sign up/in:", data);
          updateUserInfo(data); // Убедитесь, что updateUserInfo правильно обрабатывает данные и сохраняет токен, если это необходимо
          onLogin(); // Call onLogin to update the isLoggedIn state in AuthContext
          navigate("/");
        } else {
          setError("Ошибка при входе/регистрации: не получен токен.");
        }
      }
    },
    [isSignUp, formData, navigate, updateUserInfo, onLogin]
  );
  return (
    <Wrapper>
      <ContainerSignin>
        <Modal>
          <ModalBlock>
            <ModalTtl>
              <h2>{isSignUp ? "Регистрация" : "Вход"}</h2>
            </ModalTtl>
            <ModalFormLogin id="formLogIn" onSubmit={handleSubmit}>
              {isSignUp && (
                <ModalInput
                  error={errors.name ? "true" : undefined}
                  type="text"
                  name="name"
                  id="formname"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              <ModalInput
                error={errors.login ? "true" : undefined}
                type="text"
                name="login"
                id="formlogin"
                placeholder="Эл. почта"
                value={formData.login}
                onChange={handleChange}
                autoComplete="email"
              />
              <ModalInput
                error={errors.password ? "true" : undefined}
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <ModalBtnEnter type="submit" id="btnEnter">
                {isSignUp ? "Зарегистрироваться" : "Войти"}
              </ModalBtnEnter>
              <ModalFormGroup $isSignUp={isSignUp}>
                {isSignUp ? (
                  <>
                    <p>Уже есть аккаунт?</p>
                    <Link to="/login">Войдите здесь</Link>
                  </>
                ) : (
                  <>
                    <p>Нужно зарегистрироваться?</p>
                    <Link to="/signup">Регистрируйтесь здесь</Link>
                  </>
                )}
              </ModalFormGroup>
            </ModalFormLogin>
          </ModalBlock>
        </Modal>
      </ContainerSignin>
    </Wrapper>
  );
}

AuthForm.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
};

export default AuthForm;
