import PropTypes from "prop-types";
import {
  PopWrap,
  PopExitStyled,
  PopExitContainer,
  PopExitBlock,
  PopExitTtl,
  PopExitExitYes,
  PopExitExitNo,
  PopExitFormGroup,
} from "./PopExitStyled";

function PopExit({ onClose, isOpen }) {
  const handleYesClick = () => {
    onClose();
  };

  const handleNoClick = () => {
    onClose();
  };

  return (
    <PopWrap>
      <PopExitStyled className={isOpen ? "active" : ""}>
        <PopExitContainer>
          <PopExitBlock>
            <PopExitTtl>
              <h2>Выйти из аккаунта?</h2>
            </PopExitTtl>
            <PopExitFormGroup>
              <PopExitExitYes onClick={handleYesClick}>
                <a href="modal/signin.html">Да, выйти</a>
              </PopExitExitYes>
              <PopExitExitNo onClick={handleNoClick}>
                <a href="main.html">Нет, остаться</a>
              </PopExitExitNo>
            </PopExitFormGroup>
          </PopExitBlock>
        </PopExitContainer>
      </PopExitStyled>
    </PopWrap>
  );
}

PopExit.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired, // Добавляем проверку типа для isOpen
};

export default PopExit;
