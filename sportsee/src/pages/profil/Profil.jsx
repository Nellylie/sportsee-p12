import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { getDatasSection } from '../../utilsData/formatData'; 
import { useParams } from "react-router-dom";
import Barschart from '../../componentsRecharts/Barschart';
import Cards from "../../components/cards/Cards";
import Lineschart from "../../componentsRecharts/Lineschart";
import ErrorMessageModal from "../../components/errormodal/ErrorMessage";
import Radarchart from "../../componentsRecharts/Radarchart";
import Radialchart from "../../componentsRecharts/Radialchart";
import { cardData } from "../../components/cards/utils/cardData";
import Loader from "../../components/loader/Loader";
import { useNavigate } from 'react-router-dom';


// Retourne le composant Profil de la page Profil, il organise les differents composants qui le compose:
// L'intro, les Cards, les graphiques Recharts. Gère aussi la distribution des données récupéréees du services API ou mocké
function Profil () {
  // initialise les states.
  const [datas, setDatas] = useState(null);
  const uId = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusApi, setStatusApi] = useState(true);
  const [tenLastDay, setTenLastDay]= useState(datas);
  const navigate = useNavigate(); 

  // Pour la récupération des données
  useEffect(() => {
    const fetchData = async () => {
      errorMessage?setStatusApi(false): setStatusApi(true);
      try {
        const fetchedData = await getDatasSection(uId, statusApi); 
        
        setDatas(fetchedData); 
        setTenLastDay(fetchedData?.activitiesDatas?.sessions?.slice(-10));
      } catch (err) {
        setErrorMessage(err.message !== "Network Error" ? err.message : "  L'API est hors service, les données sont mockées" );
        setStatusApi(false);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();

    const errorTimeout = setTimeout(() => {
      errorMessage && !errorMessage.includes('utilisateur')&&setErrorMessage(null);

    }, 4000);

    return (() => clearTimeout(errorTimeout));
  
  }, [uId, statusApi]); 

  // si l'erreur message correspond à l'erreur de l'id introuvable, une redirection est réalisée au bout de 4
  //secondes vers le home
  useEffect(() => {
    if (errorMessage && errorMessage.includes('utilisateur')) {
      setTimeout(()=>{ navigate('/');}, 4000);
    }
  }, [errorMessage, navigate]);

  if (errorMessage) return <><ErrorMessageModal message = {errorMessage}/></>;
  if (isDataLoading) return <Loader/>; 

  return(
    <div>
      <Header/>
      <Sidebar/>
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