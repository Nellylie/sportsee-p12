import { fetchData } from './CallApi';
import datas from '../datas/datasMocked.json';

export async function getDatasSection(userId, apiCall) {
  const API_URL = "http://localhost:3001";
  
  const fetchDataFromApi = async endpoint => {
    try {
      const data = await fetchData(API_URL, userId, endpoint);
      return data;
    } catch (error) {
      if (!error.response) {
        throw new Error(`Il n'y a pas de réponse provenant du server`);
      } else {
        throw new Error(`Il y a eu une erreur avec le server du type : ${error.response ? error.response.status : 'unknown'}`);
      }}
  };

  const retrieveData = (dataSrc, type) => {
    if (apiCall) {
      return dataSrc.data;
    } else {
      const data = datas[0][type].find(data => data.userId === userId);
      if (!data) {
        throw new Error(`L'utilisateur ${userId} n'est pas enregistré`);
      }
      return data;
    }
  };
    
  const userDatasSrc = apiCall ? await fetchDataFromApi('') : datas[0].userMainData;
  const activitiesDatasSrc = apiCall ? await fetchDataFromApi('activity') : datas[0].userActivities;
  const averageDatasSrc = apiCall ? await fetchDataFromApi('average-sessions') : datas[0].userAverageSession;
  const performancesDatasSrc = apiCall ? await fetchDataFromApi('performance') : datas[0].userPerformances;

  const getDatasUserInfos = () => {
    const { keyData, todayScore, userId, userInfos } = retrieveData(userDatasSrc, 'userMainData');
    return {
      keyData: (({ calorieCount, proteinCount, carbohydrateCount, lipidCount }) => ({ calorieCount, proteinCount, carbohydrateCount, lipidCount }))(keyData),
      todayScore,
      userId,
      userInfos: (({ firstName, lastName, age }) => ({ firstName, lastName, age }))(userInfos)
    };
  };

  const formatActivitiesSessions = sessions => sessions.map(({ day, kilogram, calories }) => ({ day: day.toString().slice(-1), kilogram, calories }));
  const getDatasActivities = () => {
    const { userId, sessions } = retrieveData(activitiesDatasSrc, 'userActivities');
    return { userId, sessions: formatActivitiesSessions(sessions) };
  };

  const getDatasAverage = () => {
    const { userId, sessions } = retrieveData(averageDatasSrc, 'userAverageSession');
    return { userId, sessions: sessions.map(({ day, sessionLength }) => ({ day, sessionLength })) };
  };

  const getDatasUserPerformance = () => {
    const { userId, kind, data } = retrieveData(performancesDatasSrc, 'userPerformances');
    return {
      userId,
      kind,
      dataPerformance: data.map(({ value, kind }) => ({ value, kind }))
    };
  };

  return {
    userDatas: getDatasUserInfos(),
    activitiesDatas: getDatasActivities(),
    averageDatas: getDatasAverage(),
    performancesDatas: getDatasUserPerformance()
  };
}
