import { ClipLoader } from 'react-spinners';
import "./Spinner.css";

type Props = {
    isLoading?: boolean;
}

function Spinner({ isLoading =true }: Props) {
  return (<>
    <div id="loading-spinner">
        <ClipLoader
            color="#36db7"
            loading={isLoading}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
  </>)
}

export default Spinner