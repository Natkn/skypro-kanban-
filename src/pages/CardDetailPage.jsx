import PopBrowse from "../components/popbrowse/PopBrowse";
import { useParams } from "react-router-dom";

const CardDetailPage = () => {
  const { id } = useParams();
  return (
    <div>
      <p>ID карточки: {id}</p>
      <PopBrowse />
    </div>
  );
};

export default CardDetailPage;
