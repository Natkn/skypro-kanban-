import PropTypes from "prop-types";

function ThemeContent({ children }) {
  return <>{children}</>;
}

ThemeContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContent;
