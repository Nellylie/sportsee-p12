import datas from "../datas/datasMocked.json";

export const retrieveDataMock = (type, uId) => {
  const data = datas[0][type].find(data =>data.userId === parseInt(uId));
  if (!data) {
    throw new Error(`L'utilisateur ${uId} n'est pas enregistré`);
  }
  return data;
};

