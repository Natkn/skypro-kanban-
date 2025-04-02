import { LogoImage, HeaderLogo } from "../components/header/Header";
import logo from "../../public/images/logo.png";
import { useTheme } from "../components/themecontent/themeContext";

const headerLogoStyle = {
  height: "70px" /* Высота контейнера */,
  paddingLeft: "50px",
  paddingTop: "30px",
};

const NotFoundPage = () => {
  const { theme } = useTheme();
  return (
    <>
      <div style={headerLogoStyle}>
        <HeaderLogo
          className={`_show _light ${theme === "dark" ? "_hidden" : ""}`}
        >
          <a href="/" target="_self">
            <LogoImage src={logo} alt="logo" />
          </a>
        </HeaderLogo>
      </div>
      <div className="not-pages">
        <h1>404</h1>
        <div className="not-page">Страница не найдена</div>
      </div>
    </>
  );
};

export default NotFoundPage;
