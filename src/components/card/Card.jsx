import PropTypes from "prop-types";

import {
  CardWrapper,
  CardGroup,
  CardTheme,
  CardThemeText,
  CardButton,
  CardButtonDot,
  CardTitle,
  CardContent,
  CardDate,
  CardDateIcon,
  CardDateText,
  CardItem,
  CardSkeleton,
  CardSkeletonGroup,
  CardSkeletonContent,
  CardSkeletonTheme,
  CardSkeletonTitle,
  CardSkeletonDate,
  CardSkeletonButton,
} from "./Card.styled";

function Card({ theme, title, date, loading, id }) {
  if (loading) {
    return (
      <CardItem>
        <CardWrapper>
          <CardSkeleton className="loading">
            <CardSkeletonGroup>
              <CardSkeletonTheme />
              <CardSkeletonButton />
            </CardSkeletonGroup>
            <CardSkeletonTitle />
            <CardSkeletonContent>
              <CardSkeletonDate />
            </CardSkeletonContent>
          </CardSkeleton>
        </CardWrapper>
      </CardItem>
    );
  }

  return (
    <CardItem>
      <CardWrapper>
        <CardGroup>
          <CardTheme theme={theme}>
            <CardThemeText theme={theme}>{theme}</CardThemeText>
          </CardTheme>
          <CardButton
            onClick={() => {
              console.log("Click from CardButton!", { id });
              id; // Вызываем функцию из контекста с id
            }}
          >
            <CardButtonDot />
            <CardButtonDot />
            <CardButtonDot />
          </CardButton>
        </CardGroup>
        <CardTitle>{title}</CardTitle>
        <CardContent>
          <CardDate>
            <CardDateIcon>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_205)">
                  <path
                    d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                    stroke="#94A6BE"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                    stroke="#94A6BE"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_205">
                    <rect width="13" height="13" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </CardDateIcon>
            <CardDateText>{date}</CardDateText>
          </CardDate>
        </CardContent>
      </CardWrapper>
    </CardItem>
  );
}

Card.propTypes = {
  theme: PropTypes.oneOf(["Research", "Web Design", "Copywriting"]).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
