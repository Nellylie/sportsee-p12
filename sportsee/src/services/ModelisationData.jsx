import { fetchData } from './CallApi';
import datas from '../datas/datasMocked.json';

export async function getDatasSection(mock, userId, apiCall) {
  const API_URL = "http://localhost:3001";
  const fetchDataFromApi = endpoint => fetchData(API_URL, userId, endpoint);
  console.log("apDDDDDi", fetchDataFromApi(''));
  const retrieveData = (dataSrc, type) => apiCall ? dataSrc.data : datas[0][type].find(data => data.userId === userId);

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
