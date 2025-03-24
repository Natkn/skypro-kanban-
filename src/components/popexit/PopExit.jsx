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
import { useNavigate, Link } from "react-router-dom";

function PopExit({ onClose, isOpen }) {
  const navigate = useNavigate();
  const handleYesClick = () => {
    navigate("/signup");
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
                <Link to="/signup">Да, выйти</Link>{" "}
              </PopExitExitYes>
              <PopExitExitNo onClick={handleNoClick}>
                <Link to="/">Нет, остаться</Link>
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
  isOpen: PropTypes.bool.isRequired,
};

export default PopExit;
