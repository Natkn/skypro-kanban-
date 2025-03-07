import { useState } from "react";
import logo from "../../images/logo.png";
import logoDark from "../../images/logo_dark.png";
import { useTheme } from "../themecontent/themeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);

  const toggleUserSettings = () => {
    setIsUserSettingsOpen(!isUserSettingsOpen); // Переключаем состояние
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo _show _light">
            <a href="/" target="_self">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="header__logo _dark">
            <a href="/" target="_self">
              <img src={logoDark} alt="logo" />
            </a>
          </div>
          <nav className="header__nav">
            <button className="header__btn-main-new _hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </button>
            <button
              className="header__user _hover02"
              onClick={toggleUserSettings}
            >
              Ivan Ivanov
            </button>
            {isUserSettingsOpen && (
              <div className="header__pop-user-set pop-user-set">
                <p className="pop-user-set__name">Ivan Ivanov</p>
                <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
                <div className="pop-user-set__theme">
                  <p>Темная тема</p>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="checkbox"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                  />
                </div>
                <button type="button" className="_hover03">
                  <a href="#popExit">Выйти</a>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
