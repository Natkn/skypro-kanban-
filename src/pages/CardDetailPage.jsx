import PopBrowse from "../components/popbrowse/PopBrowse";
import { useParams } from "react-router-dom";

const CardDetailPage = () => {
  const { id } = useParams();
  return (
    <div>
      <p>
        {" "}
        {id}
        <PopBrowse />
      </p>
    </div>
  );
};

export default CardDetailPage;
