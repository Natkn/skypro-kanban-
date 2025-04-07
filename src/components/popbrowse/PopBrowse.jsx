import "../../assets/App.css";
import Calendar from "../calendar/Calendar";
import PropTypes from "prop-types";
import * as S from "../popbrowse/PopBrowseStyled";

function PopBrowse({ task, onClose }) {
  console.log("PopBrowse received task:", task);

  if (!task) {
    return null;
  }
  const { status } = task;
  return (
    <S.PopBrowseContainer>
      <S.PopBrowseWrapper>
        <S.PopBrowseBlock>
          <S.PopBrowseContent>
            <S.PopBrowseTopBlock>
              <S.PopBrowseTitle>Название задачи</S.PopBrowseTitle>
              <div className="categories__theme theme-top _orange _active-category">
                <p className="_orange">{task.theme}</p>
              </div>
            </S.PopBrowseTopBlock>

            <S.Status>
              <S.StatusP>Статус</S.StatusP>
              <S.StatusThemes>
                <S.StatusTheme ishide={status !== "noStatus"}>
                  <p>Без статуса</p>
                </S.StatusTheme>
                <S.StatusTheme ishide={status !== "needToDo"}>
                  <p>Нужно сделать</p>
                </S.StatusTheme>
                <S.StatusTheme ishide={status !== "inProcess"}>
                  <p>В работе</p>
                </S.StatusTheme>
                <S.StatusTheme ishide={status !== "test"}>
                  <p>Тестирование</p>
                </S.StatusTheme>
                <S.StatusTheme ishide={status !== "ready"}>
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
                    placeholder="Введите описание задачи..."
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
    theme: PropTypes.oneOf(["Research", "Web Design", "Copywriting"])
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
