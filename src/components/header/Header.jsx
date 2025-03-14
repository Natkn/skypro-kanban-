import { useState } from "react";
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

function Header() {
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
          <HeaderBtnMainNew id="btnMainNew">
            <a href="#popNewCard">Создать новую задачу</a>
          </HeaderBtnMainNew>
          <HeaderUser onClick={toggleUserSettings}>Ivan Ivanov</HeaderUser>
          {isUserSettingsOpen && (
            <HeaderPopUserSet>
              <PopUserSetName>Ivan Ivanov</PopUserSetName>
              <PopUserSetMail>ivan.ivanov@gmail.com</PopUserSetMail>
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

export default Header;
