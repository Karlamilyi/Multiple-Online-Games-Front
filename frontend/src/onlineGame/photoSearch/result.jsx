import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../style.css'

function ResultPhotoSearch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { points } = useParams();

  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate('/photoSearch'); 
  };

  return (
    <div>
      <h1>Résultats</h1>
      <p>Points : {points || 'N/A'}</p>
      <button onClick={handleGoBack}>Retour</button>
    </div>
  );
}

export default ResultPhotoSearch;