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

function Profil () {
  const [datas, setDatas] = useState(null);
  const uId = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line no-unused-vars, no-undef
  const [statusApi, setStatusApi] = useState(false);
  const [tenLastDay, setTenLastDay]= useState(datas);
  
  useEffect(() => {
    const fetchData = async () => {
      errorMessage?setStatusApi(false): setStatusApi(true);
      try {
        const fetchedData = await getDatasSection(uId, statusApi);
        setDatas(fetchedData);
        setTenLastDay(fetchedData?.activitiesDatas?.sessions?.slice(-10));
      } catch (err) {
        console.log('Error caught:', err.message);
        setErrorMessage(err.message !== "Network Error" ? err.message : "  L'API est hors service, les données sont mockées" || "Une erreur a été rencontrée");
        setStatusApi(false);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();

    const errorTimeout = setTimeout(() => {
      setErrorMessage(null);
    }, 4000);

    return (() => clearTimeout(errorTimeout));
  
  }, [uId, statusApi]); 



  if (errorMessage) return <ErrorMessageModal message = {errorMessage}/>;

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
            <Barschart className ="barchart-container" data = {tenLastDay}/>
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