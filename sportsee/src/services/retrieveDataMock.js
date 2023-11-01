import datas from "../datas/datasMocked.json";


// le service pour recuperer dans le fichier mocké les données de l'utilisateur correspondante à l'id 
// communiqué en argument : uId
export const retrieveDataMock = (type, uId) => {
  const data = datas[0][type].find(data =>data.userId === parseInt(uId));
  if (!data) {
    throw new Error(`L'utilisateur ${uId} n'est pas enregistré`);
  }
  return data;
};

