import { fetchData } from './linkApi'; 

export async function getDatasSection(uId) {
  const retrieveData = async (type) => {
    const data = await fetchData(uId, type);
    if (!data) {
      throw new Error(`L'utilisateur ${uId} n'est pas enregistré`);
    }
    return data;
  };

  const getDatasUserInfos = async () => {
    const { keyData, todayScore, score, userId, userInfos } = await retrieveData('');
    
    return {
      keyData: {
        calorieCount: keyData.calorieCount,
        proteinCount: keyData.proteinCount,
        carbohydrateCount: keyData.carbohydrateCount,
        lipidCount: keyData.lipidCount
      },
      score: todayScore || score,
      userId,
      userInfos: {
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        age: userInfos.age
      }
    };
  };

  const formatActivitiesSessions = sessions => sessions.map(({ day, kilogram, calories }) => ({ day: day.toString().slice(-1), kilogram, calories }));
  
  const getDatasActivities = async () => {
    const { userId, sessions } = await retrieveData('activity');
    return { userId, sessions: formatActivitiesSessions(sessions) };
  };

  const getDatasAverage = async () => {
    const { userId, sessions } = await retrieveData('average-sessions');
    const arrayDay = ["L", "M", "M", "J", "V", "S", "D"];
    return { userId, sessions: sessions.map(({ day, sessionLength }) => ({ day: arrayDay[day-1], sessionLength })) };
  };

  const getDatasUserPerformance = async () => {
    const { userId, kind, data } = await retrieveData('performance');
    const kindFrenchArray = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"];

    const kindFrench = (indexKind) => {
      if (indexKind >= 0 && indexKind < kindFrenchArray.length) {
        return kindFrenchArray[indexKind];
      } else {
        console.warn(`Invalid indexKind: ${indexKind}`);
        return "Unknown";
      }
    };

    return {
      userId,
      kind,
      dataPerformance: data.map(({ value, kind }) => ({ value, kind: kindFrench(kind-1) }))
    };
  };

  return {
    userDatas: await getDatasUserInfos(),
    activitiesDatas: await getDatasActivities(),
    averageDatas: await getDatasAverage(),
    performancesDatas: await getDatasUserPerformance()
  };
}
