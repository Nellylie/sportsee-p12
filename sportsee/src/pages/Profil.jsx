import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getDatasSection } from '../services/ModelisationData'; 
import { useParams } from "react-router-dom";
import Barschart from '../componentsRecharts/Barschart';
import iconCalories from '../icones/energy.svg';
import iconCarbs from '../icones/apple.svg';
import iconProtein from '../icones/chicken.svg';
import iconFat from '../icones/cheeseburger.svg';
import Cards from "../components/Cards";
import Lineschart from "../componentsRecharts/Lineschart";
import ErrorMessageModal from "../componentsRecharts/ErrorMessage";
import Radarchart from "../componentsRecharts/Radarchart";

function Profil () {
  const [datas, setDatas] = useState(null);
  const idUser = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDatasSection(idUser);
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
  
  const cardData = [
    {
      icon: iconCalories,
      number: datas?.userDatas?.keyData?.calorieCount,
      type: "Calories",
      unit: "kCal",
    },
    {
      icon: iconProtein,
      number: datas?.userDatas?.keyData?.proteinCount,
      type: "Proteines",
      unit: "g",
    },
    {
      icon: iconCarbs,
      number: datas?.userDatas?.keyData?.carbohydrateCount,
      type: "Glucides",
      unit: "g",
    },
    {
      icon: iconFat,
      number: datas?.userDatas?.keyData?.lipidCount,
      type: "Lipides",
      unit: "g",
    },
  ];
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
            <Lineschart data = {datas?.averageDatas?.sessions}/>
            <Radarchart data = {datas?.performancesDatas?.dataPerformance}/>
          </div>
          <div className = "cards">
            {cardData.map((card, index) => (
              <Cards
                key={index}
                icon={card.icon} 
                number={card.number} 
                type={card.type} 
                unit={card.unit} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
  
export default Profil;