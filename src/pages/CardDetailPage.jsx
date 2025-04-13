import PopBrowse from "../components/popbrowse/PopBrowse";
import { useParams } from "react-router-dom";

const CardDetailPage = () => {
  const { _id } = useParams();
  return (
    <div>
      <p>
        {" "}
        {_id}
        <PopBrowse />
      </p>
    </div>
  );
};

export default CardDetailPage;
