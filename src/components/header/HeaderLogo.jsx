import styled from "styled-components";
import { useTheme } from "../../components/themecontent/themeContext"; // Путь к ThemeProvider
import PropTypes from "prop-types";

// Стили для логотипа (общие для обоих логотипов)
const HeaderLogoStyle = styled.div`
  a {
    /* Ваши общие стили для ссылки */
  }
`;

// Стили для изображения логотипа
const LogoImage = styled.img`
  width: 85px;
  height: auto;
`;

function HeaderLogo({ logo, logodark }) {
  const { themeMode } = useTheme();

  return (
    <HeaderLogoStyle>
      {themeMode === "light" ? (
        <a href="/" target="_self">
          <LogoImage src={logo} alt="logo" />
        </a>
      ) : (
        <a href="/" target="_self">
          <LogoImage src={logodark} alt="logo" />
        </a>
      )}
    </HeaderLogoStyle>
  );
}

HeaderLogo.propTypes = {
  logo: PropTypes.string.isRequired,
  logodark: PropTypes.string.isRequired,
};

export default HeaderLogo;
