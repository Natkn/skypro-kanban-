import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../../public/images/images/logo.png";
import logodark from "../../../public/images/images/logo_dark.png";
import { useTheme } from "../themecontent/themeContext";
import PopExit from "../popexit/PopExit";
import {
  HeaderBlock,
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
  HeaderContainer,
} from "./Header.styled";
import HeaderLogo from "./HeaderLogo";
import { useAuth } from "../../components/context/AuthContext";

function Header({ openPopNewCard }) {
  const { userInfo } = useAuth();
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

  const name = userInfo?.name || "Имя не найдено";
  const login = userInfo?.login || "Почта не найдена";

  return (
    <HeaderContainer>
      <HeaderBlock theme={theme}>
        <HeaderLogo logo={logo} logodark={logodark} />

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
    </HeaderContainer>
  );
}
Header.propTypes = {
  openPopNewCard: PropTypes.func.isRequired,
};
export default Header;
export { HeaderLogo };
