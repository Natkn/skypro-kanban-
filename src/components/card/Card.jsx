import PropTypes from "prop-types";
import { useContext } from "react";
import * as S from "./Card.styled";
import { CardContext } from "../context/CardContext";
import { ThemeContext } from "../../components/themecontent/themeContext";
import { useDraggable } from "@dnd-kit/core";

function Card({ title, date, loading, id, topic, cardtheme, description }) {
  const { handleCardButtonClick } = useContext(CardContext);
  const { theme } = useContext(ThemeContext);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: isDragging ? "relative" : "static",
    zIndex: isDragging ? 999 : 1,
    opacity: isDragging ? 0.8 : 1,
    transition: "box-shadow 0.2s ease",
    boxShadow: isDragging ? "0 0 10px rgba(0,0,0,0.2)" : "none",
  };

  if (!handleCardButtonClick) {
    return null;
  }

  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  if (loading) {
    return (
      <S.CardItem>
        <S.CardWrapper>
          <S.CardSkeleton className="loading">
            <S.CardSkeletonGroup>
              <S.CardSkeletonTheme />
              <S.CardSkeletonButton />
            </S.CardSkeletonGroup>
            <S.CardSkeletonTitle />
            <S.CardSkeletonContent>
              <S.CardSkeletonDate />
            </S.CardSkeletonContent>
          </S.CardSkeleton>
        </S.CardWrapper>
      </S.CardItem>
    );
  }

  return (
    <S.CardItem
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      theme={theme}
      cardtheme={cardtheme}
    >
      <S.CardWrapper>
        <S.CardGroup>
          <S.CardTheme theme={theme} cardtheme={cardtheme}>
            <S.CardThemeText theme={theme} cardtheme={cardtheme}>
              {cardtheme}
              {topic}
            </S.CardThemeText>
          </S.CardTheme>
          <S.CardButton
            onClick={(event) => {
              event.preventDefault();
              handleCardButtonClick(id);
            }}
          >
            <S.CardButtonDot />
            <S.CardButtonDot />
            <S.CardButtonDot />
          </S.CardButton>
        </S.CardGroup>
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardContent>
          <S.CardContentAdd>{description}</S.CardContentAdd>
          <S.CardDate>
            <S.CardDateIcon>
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
            </S.CardDateIcon>
            <S.CardDateText>{formattedDate}</S.CardDateText>
          </S.CardDate>
        </S.CardContent>
      </S.CardWrapper>
    </S.CardItem>
  );
}

Card.propTypes = {
  theme: PropTypes.oneOf(["Research", "Web Design", "Copywriting"]).isRequired,
  cardtheme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};

export default Card;
