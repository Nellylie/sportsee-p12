
import { Link } from "react-router-dom";

// le composant homePage, donne le choix entre deux profils,
// utilisé pour le mode développement de l'application
function HomePage() {
  
  return (
    <div className="buttons-container">
      <div>
        <Link to="/Profil/12"><button>Utilisateur 12</button></Link>  
        <Link to="/Profil/18"><button>Utilisateur 18</button></Link>
      </div>
    </div>
  );
}

export default HomePage;
