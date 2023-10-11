import datas from '../datas/datasMocked.json';

export async function getDatasSection(uId) {
  const retrieveData = (type) => {
    const data = datas[0][type].find(data =>data.userId === parseInt(uId));
    if (!data) {
      throw new Error(`L'utilisateur ${uId} n'est pas enregistré`);
    }
    return data;
  };

  const getDatasUserInfos = () => {
    const { keyData, todayScore, userId, userInfos } = retrieveData('userMainData');
    
    return {
      keyData: {
        calorieCount: keyData.calorieCount,
        proteinCount: keyData.proteinCount,
        carbohydrateCount: keyData.carbohydrateCount,
        lipidCount: keyData.lipidCount
      },
      todayScore,
      userId,
      userInfos: {
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        age: userInfos.age
      }
    };
  };

  const formatActivitiesSessions = sessions => sessions.map(({ day, kilogram, calories }) => ({ day: day.toString().slice(-1), kilogram, calories }));
  const getDatasActivities = () => {
    const { userId, sessions } = retrieveData('userActivities');
    return { userId, sessions: formatActivitiesSessions(sessions) };
  };

  const getDatasAverage = () => {
    const { userId, sessions } = retrieveData('userAverageSession');
    return { userId, sessions: sessions.map(({ day, sessionLength }) => ({ day, sessionLength })) };
  };

  const getDatasUserPerformance = () => {
    const { userId, kind, data } = retrieveData('userPerformances');
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
    userDatas: getDatasUserInfos(),
    activitiesDatas: getDatasActivities(),
    averageDatas: getDatasAverage(),
    performancesDatas: getDatasUserPerformance()
  };
}
