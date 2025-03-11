import styled from "styled-components";

export const CardItem = styled.div`
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
`;

export const CardWrapper = styled.div`
  width: 220px;
  height: 130px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${({ theme }) =>
    ({
      Research: "#B4FDD1",
      "Web Design": "#FFE4C2",
      Copywriting: "#E9D4FF",
    }[theme] || "#FFFFFF")};
`;

export const CardThemeText = styled.p`
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  color: ${({ theme }) => {
    switch (theme) {
      case "Research":
        return "#06B16E";
      case "Web Design":
        return "#FF6D00";
      case "Copywriting":
        return "#9A48F1";
      default:
        return "#000000";
    }
  }};
`;
export const CardButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;
`;

export const CardButtonDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #94a6be;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const CardDateIcon = styled.svg`
  width: 13px;
  height: 13px;
  fill: none;
  stroke: #94a6be;
  stroke-width: 0.8px;
  stroke-linejoin: round;
  stroke-linecap: round;

  & g {
    clip-path: url(#clip0_1_205);
  }

  & path {
    stroke: #94a6be;
  }
`;

export const CardDateText = styled.p`
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: #94a6be;
  letter-spacing: 0.2px;
`;

export const CardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  &.loading {
  }
`;

export const CardSkeletonGroup = styled.div`
  width: 194px;
  height: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardSkeletonContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardSkeletonTheme = styled.div`
  background: linear-gradient(90deg, #c1cddc 0%, #e9eef7 45.83%, #c1cddc 97.4%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite linear;
  color: transparent;
  width: 82px;
  height: 20px;
  border-radius: 18px;

  @keyframes loading-animation {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const CardSkeletonTitle = styled.div`
  background: linear-gradient(90deg, #c1cddc 0%, #e9eef7 45.83%, #c1cddc 97.4%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite linear;
  color: transparent;
  width: 113px;
  height: 13px;
`;

export const CardSkeletonDate = styled.div`
  background: linear-gradient(90deg, #c1cddc 0%, #e9eef7 45.83%, #c1cddc 97.4%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite linear;
  color: transparent;
  width: 58px;
  height: 13px;
  margin-top: 20px;
`;

export const CardSkeletonButton = styled.div`
  background: linear-gradient(90deg, #c1cddc 0%, #e9eef7 45.83%, #c1cddc 97.4%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite linear;
  color: transparent;
  width: 18px;
  height: 4px;
`;
