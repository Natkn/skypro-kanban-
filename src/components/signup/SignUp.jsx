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

function AuthForm({ isSignUp }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/");
  };

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
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Имя"
                />
              )}
              <ModalInput
                type="text"
                name="login"
                id="formlogin"
                placeholder="Эл. почта"
              />
              <ModalInput
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
              />
              <ModalBtnEnter type="submit" id="btnEnter">
                {isSignUp ? "Зарегистрироваться" : "Войти"}
              </ModalBtnEnter>
              <ModalFormGroup $isSignUp={isSignUp}>
                {isSignUp ? (
                  <>
                    <p>Уже есть аккаунт?</p>
                    <Link to="/signin">Войдите здесь</Link>
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
