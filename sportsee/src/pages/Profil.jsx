import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getDatasSection } from '../utilsData/formatData'; 
import { useParams } from "react-router-dom";
import Barschart from '../componentsRecharts/Barschart';
import Cards from "../components/Cards";
import Lineschart from "../componentsRecharts/Lineschart";
import ErrorMessageModal from "../componentsRecharts/ErrorMessage";
import Radarchart from "../componentsRecharts/Radarchart";
import Radialchart from "../componentsRecharts/Radialchart";
import { cardData } from "../components/utils/cardData";
import Loader from "../components/Loader";
import { useNavigate } from 'react-router-dom';


// Retourne le composant Profil de la page Profil, il organise les differents composants qui le compose:
// L'intro, les Cards, les graphiques Recharts. Gère aussi la distribution des données récupéréees du services API ou mocké
function Profil () {
  // initialise les states.
  const [datas, setDatas] = useState(null);
  const uId = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true); // informe si la page est entrain de charger ou a fini de charger
  const [errorMessage, setErrorMessage] = useState(null);// le contenu du message d'erreur
  const [statusApi, setStatusApi] = useState(false);// informe si l'API est hors services ou non
  const [tenLastDay, setTenLastDay]= useState(datas);// récupère les dix derniers jours
  const navigate = useNavigate(); // permettra la redirection vers le home en cas d'erreur 

  // fonction asynchrone géré par useEffect pour la récupération des données
  useEffect(() => {
    const fetchData = async () => {
      errorMessage?setStatusApi(false): setStatusApi(true);
      try {
        const fetchedData = await getDatasSection(uId, statusApi); // appel la fonction pour récuperer la donnée, communique l'id utilisateur et le statusApi
        // par défaut "true" pour essayer de suite l'appel API, et si cela échoue, le status API deviendra False
        setDatas(fetchedData); // récupère les données
        setTenLastDay(fetchedData?.activitiesDatas?.sessions?.slice(-10));// récupère les dix derniers jours
      } catch (err) {
        // quand une erreur est rencontrée
        setErrorMessage(err.message !== "Network Error" ? err.message : "  L'API est hors service, les données sont mockées" || "Une erreur a été rencontrée");
        setStatusApi(false);
      } finally {
        // le chargement n'est plus et la page est la
        setDataLoading(false);
      }
    };
    // lance la fonction fetchData
    fetchData();

    // si une erreur est présente et qu'elle ne contient pas le mot "utilisateur" (qui correspond à l'erreur id introuvable)
    // le state de l'erreur est mis à null au bout de 4 seconde
    const errorTimeout = setTimeout(() => {
      errorMessage && !errorMessage.includes('utilisateur')&&setErrorMessage(null);

    }, 4000);

    // cette fonction est executée au clean de useEffect
    return (() => clearTimeout(errorTimeout));
  
  }, [uId, statusApi]); // useEffect s'execute à chaque fois que l'id change ou le status de l'API
  
  // si l'erreur message correspond à l'erreur de l'id introuvable, une redirection est réalisée au bout de 4
  //secondes vers le home
  useEffect(() => {
    if (errorMessage && errorMessage.includes('utilisateur')) {
      setTimeout(()=>{ navigate('/');}, 4000);
    }
  }, [errorMessage, navigate]);

  // retourne la modale d'erreur avec en props l'erreur
  if (errorMessage) return <><ErrorMessageModal message = {errorMessage}/></>;
  // retourne le composant loader 
  if (isDataLoading) return <Loader/>; 

  return(
    <div>
      <Header/>
      <Sidebar/>
      {/* retourne le composant jsx s'il n'y a pas d'erreur*/}
      {!errorMessage &&
      <main>
        <div className = "home-welcome">
          <p className="home-welcome-p">Bonjour <span>{datas?.userDatas?.userInfos?.firstName}</span></p>
          <p>Félicitation ! Vous avez explosé vos objectifs hier <span>👏</span></p>
        </div>
        <div className="container-profil">
          <div className="main-left-container">
            <Barschart className ="barchart-container" data = {tenLastDay}/>{/*distribue la data récupérée dans le props data*/}
            <div className="container-line-radar-radial">
              <Lineschart className ="linechart-container" data = {datas?.averageDatas?.sessions}/>
              <Radarchart className ="radarchart-container" data = {datas?.performancesDatas?.dataPerformance}/>
              <Radialchart className="radialchart-container" data = {datas?.userDatas?.score}/>
            </div>
          </div>
          <div className = "cards">
            {/* parcours la liste cardData et la boucle pour executer le composant Cards autant de fois qu'il y a d'objet*/}
            {cardData(datas).map((card, index) => (
              <Cards
                key={index}
                icon={card.icon} 
                number={card.number} 
                type={card.type} 
                unit={card.unit} 
                color={card.color}
              />
            ))}
          </div>
        </div>
      </main>}
    </div>);
}
  
export default Profil;