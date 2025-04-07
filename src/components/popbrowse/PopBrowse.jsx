import "../../assets/App.css";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import * as S from "../popbrowse/PopBrowseStyled";
import { themePop } from "../../mock/data";

function PopBrowse({ task, onClose }) {
  if (!task) {
    return null;
  }

  const themeStyles = themePop[task.theme] || {};

  const { status } = task;
  return (
    <S.PopBrowseContainer>
      <S.PopBrowseWrapper>
        <S.PopBrowseBlock>
          <S.PopBrowseContent>
            <S.PopBrowseTopBlock>
              <S.PopBrowseTitle>Название задачи</S.PopBrowseTitle>
              <div
                className="categories__theme theme-top _active-category "
                style={{
                  backgroundColor: themeStyles.background,
                  color: themeStyles.text,
                }}
              >
                <p style={{ color: themeStyles.text }}>{task.theme}</p>
              </div>
            </S.PopBrowseTopBlock>

            <S.Status>
              <S.StatusP>Статус</S.StatusP>
              <S.StatusThemes>
                <S.StatusTheme $ishide={(status !== "noStatus").toString()}>
                  <p>Без статуса</p>
                </S.StatusTheme>
                <S.StatusTheme $ishide={(status !== "needToDo").toString()}>
                  <p>Нужно сделать</p>
                </S.StatusTheme>
                <S.StatusTheme $ishide={(status !== "inProcess").toString()}>
                  <p>В работе</p>
                </S.StatusTheme>
                <S.StatusTheme $ishide={(status !== "test").toString()}>
                  <p>Тестирование</p>
                </S.StatusTheme>
                <S.StatusTheme $ishide={(status !== "ready").toString()}>
                  <p>Готово</p>
                </S.StatusTheme>
              </S.StatusThemes>
            </S.Status>

            <S.PopBrowseWrap>
              <S.PopBrowseForm>
                <S.FormBrowseBlock>
                  <label htmlFor="textArea01">Описание задачи</label>
                  <S.FormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly
                    placeholder="Описание задачи"
                    value={task.description}
                  />
                </S.FormBrowseBlock>
              </S.PopBrowseForm>

              <Calendar />
            </S.PopBrowseWrap>

            <S.PopBrowseBtnBrowse>
              <div>
                <S.BtnBor>
                  <a href="#">Редактировать задачу</a>
                </S.BtnBor>
                <S.BtnBor>
                  <a href="#">Удалить задачу</a>
                </S.BtnBor>
              </div>
              <S.BtnBg
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                }}
              >
                <a href="#">Закрыть</a>
              </S.BtnBg>
            </S.PopBrowseBtnBrowse>
          </S.PopBrowseContent>
        </S.PopBrowseBlock>
      </S.PopBrowseWrapper>
    </S.PopBrowseContainer>
  );
}

PopBrowse.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(["Web Design", "Research", "Copywriting"])
      .isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.oneOf([
      "noStatus",
      "needToDo",
      "inProcess",
      "test",
      "ready",
    ]),
  }),
  onClose: PropTypes.func.isRequired,
};

export default PopBrowse;
