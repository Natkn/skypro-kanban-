import HeaderLogo from "../components/header/HeaderLogo";
import logo from "../../public/images/logo.png";
import logodark from "../../public/images/logo_dark.png";
const headerLogoStyle = {
  height: "70px" /* Высота контейнера */,
  paddingLeft: "50px",
  paddingTop: "30px",
};

const NotFoundPage = () => {
  return (
    <>
      <div style={headerLogoStyle}>
        <HeaderLogo logo={logo} logodark={logodark} />
      </div>
      <div className="not-pages">
        <h1>404</h1>
        <div className="not-page">Страница не найдена</div>
      </div>
    </>
  );
};

export default NotFoundPage;
