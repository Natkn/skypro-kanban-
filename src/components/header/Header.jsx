import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../images/logo.png";
import logoDark from "../../images/logo_dark.png";
import { useTheme } from "../themecontent/themeContext";
import PopExit from "../popexit/PopExit";
import {
  HeaderBlock,
  HeaderLogo,
  HeaderLogoDark,
  HeaderNav,
  HeaderBtnMainNew,
  HeaderUser,
  HeaderPopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
  ThemeToggleLabel,
  ThemeToggleButton,
  HeaderBtnExit,
  LogoImage,
} from "./Header.styled";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";

function Header({ openPopNewCard }) {
  const { user, userInfo } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);

  const toggleUserSettings = () => {
    setIsUserSettingsOpen(!isUserSettingsOpen);
  };

  const openPopExit = () => {
    setIsPopExitOpen(true);
  };

  const closePopExit = () => {
    setIsPopExitOpen(false);
  };

  const handleClick = (event) => {
    event.preventDefault();
    openPopNewCard();
  };

  const name = user ? user.name : "Имя не найдено";
  const login = userInfo?.login || "Почта не найдена";

  return (
    <div className="container">
      <HeaderBlock>
        <HeaderLogo
          className={`_show _light ${theme === "dark" ? "_hidden" : ""}`}
        >
          <a href="/" target="_self">
            <LogoImage src={logo} alt="logo" />
          </a>
        </HeaderLogo>
        <HeaderLogoDark
          className={`_dark ${theme === "dark" ? "_show" : "_hidden"}`}
        >
          <a href="/" target="_self">
            <LogoImage src={logoDark} alt="logo" />
          </a>
        </HeaderLogoDark>
        <HeaderNav>
          <HeaderBtnMainNew id="btnMainNew" onClick={handleClick}>
            Создать новую задачу
          </HeaderBtnMainNew>
          <HeaderUser onClick={toggleUserSettings}>{name}</HeaderUser>
          {isUserSettingsOpen && (
            <HeaderPopUserSet>
              <PopUserSetName>{name}</PopUserSetName>
              <PopUserSetMail>{login}</PopUserSetMail>
              <PopUserSetTheme>
                <ThemeToggleLabel>Темная тема</ThemeToggleLabel>
                <ThemeToggleButton
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
              </PopUserSetTheme>
              <HeaderBtnExit onClick={openPopExit}>Выйти</HeaderBtnExit>
            </HeaderPopUserSet>
          )}
        </HeaderNav>
      </HeaderBlock>
      {isPopExitOpen && (
        <PopExit onClose={closePopExit} isOpen={isPopExitOpen} />
      )}
    </div>
  );
}
Header.propTypes = {
  openPopNewCard: PropTypes.func.isRequired,
};
export default Header;
export { HeaderLogo, HeaderLogoDark, LogoImage };
