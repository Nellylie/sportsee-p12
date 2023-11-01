import iconCalories from '../../icones/energy.svg';
import iconCarbs from '../../icones/apple.svg';
import iconProtein from '../../icones/chicken.svg';
import iconFat from '../../icones/cheeseburger.svg';

// Liste pour la Sructure des proprietes des objets pour gerer le composant Cards.jsx
// prend en propriété les datas et les redistribue dans la propriete adéquate
export const cardData = (datas)=> [
  {
    icon: iconCalories,
    number: datas?.userDatas?.keyData?.calorieCount,
    type: "Calories",
    unit: "kCal",
    color: "#FF00001A"

  },
  {
    icon: iconProtein,
    number: datas?.userDatas?.keyData?.proteinCount,
    type: "Proteines",
    unit: "g",
    color: "#4AB8FF1A"
  },
  {
    icon: iconCarbs,
    number: datas?.userDatas?.keyData?.carbohydrateCount,
    type: "Glucides",
    unit: "g",
    color:"#F9CE231A"
  },
  {
    icon: iconFat,
    number: datas?.userDatas?.keyData?.lipidCount,
    type: "Lipides",
    unit: "g",
    color: "#FD51811A"
  },
];