import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getDatasSection } from '../services/formatData'; 
import { useParams } from "react-router-dom";
import Barschart from '../componentsRecharts/Barschart';
import Cards from "../components/Cards";
import Lineschart from "../componentsRecharts/Lineschart";
import ErrorMessageModal from "../componentsRecharts/ErrorMessage";
import Radarchart from "../componentsRecharts/Radarchart";
import Radialchart from "../componentsRecharts/Radialchart";
import { cardData } from "../components/utils/cardData";

function Profil () {
  const [datas, setDatas] = useState(null);
  const idUser = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // eslint-disable-next-line no-unused-vars, no-undef
  const [kindData, setKindData] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDatasSection(idUser, kindData);
        setDatas(fetchedData);
      } catch (err) {
        setErrorMessage(err.message || "An unknown error occurred.");
      } finally {
        setDataLoading(false);
      }
    };
  
    fetchData();
  }, [idUser]);

  if (errorMessage) {
    return <ErrorMessageModal message= {errorMessage}/>;
  }

  if (isDataLoading) return null; 
  
  return (
    <div>
      <Header/>
      <Sidebar/>
      <main>
        <div className = "home-welcome">
          <p>Bonjour <span>{datas?.userDatas?.userInfos?.firstName}</span></p>
          <p>Félicitation ! Vous avez explosé vos objectifs hier <span>👏</span></p>
        </div>
        <div className="container-profil">
          <div className="main-left-container">
            <Barschart className ="barchart-container" data = {datas?.activitiesDatas?.sessions}/>
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
      </main>
    </div>
  );
}
  
export default Profil;