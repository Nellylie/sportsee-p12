import { useContext } from "react";
import { StatutApiContext } from "../getRoutes/GetRoutes";
import { Link } from "react-router-dom";

function HomePage() {
  const { apiStatut, statutApiModifiable } = useContext(StatutApiContext);
  
  const turnStatutApi = () => {
    statutApiModifiable(!apiStatut);
  };

  return (
    <div className="buttons-container">
      <button className="button-api" onClick={turnStatutApi}>
        {apiStatut ? "API" : "Version Mocké"}
      </button>
      <div>
        <Link to="/Profil/12"><button>Utilisateur 12</button></Link>  
        <Link to="/Profil/18"><button>Utilisateur 18</button></Link>
      </div>
    </div>
  );
}

export default HomePage;
