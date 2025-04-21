import styled from "styled-components";
import { useTheme } from "../../themecontent/themeContext";
import PropTypes from "prop-types";

const HeaderLogoStyle = styled.div`
  a {
  }
`;

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
