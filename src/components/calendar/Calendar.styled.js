import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 182px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const CalendarTitle = styled.p`
  margin-bottom: 14px;
  padding: 0 7px;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
`;

export const CalendarPeriod = styled.div`
  padding: 0 7px;
`;

export const CalendarText = styled.p`
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
`;

export const CalendarSpan = styled.span`
  color: #000000;
`;

export const CalendarBlock = styled.div`
  display: block;
`;

export const CalendarMonth = styled.div`
  color: #94a6be;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
  font-family: Roboto, sans-serif;
  letter-spacing: 0px;
`;

export const CalendarContent = styled.div`
  margin-bottom: 12px;
`;

export const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
`;

export const CalendarDayName = styled.div`
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
`;

export const CalendarCells = styled.div`
  width: 182px;
  display: flex;
  flex-wrap: wrap;
`;

export const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;

  &:hover {
    color: #94a6be;
    background-color: #eaeef6;
  }

  &._active-day {
    background-color: #94a6be;
    color: #ffffff;
  }

  &._other-month {
    opacity: 0;
  }
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #94a6be;
  }
`;
