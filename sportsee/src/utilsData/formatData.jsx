import {retrieveDataMock} from '../services/retrieveDataMock';
import {fetchData} from '../services/serviceApi';

// Selon le status de l'API, formate à la forme voulue les données récupérés à partir de l'API ou du mock et gère les erreurs
export async function getDatasSection(uId, statusApi) {

  // function asynchrone dans le cas ou une erreur serait rencontré lors de l'appel API à ce niveau
  const fetchDataErrorHandling = async (uId, endpoint) => {
    try {
      return await fetchData(uId, endpoint);
    } catch (error) {
      console.error(`An error occurred while fetching ${endpoint}:`, error);
      throw error;
    }
  };

  const getDatasUserInfos = async () => {
    const { keyData, todayScore, score, userId, userInfos } = statusApi // retourne les données après avoir verifie le statut de l'api pour savoir si nous appelons le service API ou la version mockée
      ? await fetchDataErrorHandling(uId, '') // version API
      : retrieveDataMock('userMainData', uId); // version mocké

    return {
      keyData: {
        calorieCount: keyData.calorieCount.toLocaleString('en-US'), // pour retourner les calories avec les milles séparés par une virgule
        proteinCount: keyData.proteinCount,
        carbohydrateCount: keyData.carbohydrateCount,
        lipidCount: keyData.lipidCount
      },
      score: todayScore || score, // gestion de la différence de nom de propriété pour les mêmes genre de valeur selon les utilisateurs
      userId,
      userInfos: {
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        age: userInfos.age
      }
    };
  };
  
  const formatActivitiesSessions = sessions => 
    sessions.map(({ day, kilogram, calories }) => ({
      day: Number( day.toString().slice(-2)), // retourne les deux dernier chiffre entier, sans le 0
      kilogram,
      calories
    }));

  const getDatasActivities = async () => {
    const { userId, sessions } = statusApi ? await fetchDataErrorHandling(uId, 'activity') : retrieveDataMock('userActivities', uId);
    return { userId, sessions: formatActivitiesSessions(sessions) };
  };

  const getDatasAverage = async () => {
    const { userId, sessions } = statusApi ? await fetchDataErrorHandling(uId, 'average-sessions') : retrieveDataMock('userAverageSession', uId);
    const arrayDay = ["L", "M", "M", "J", "V", "S", "D"]; // un tableau pour associer des lettres diminutifs des jours en français au tableau jour
    return { userId, sessions: sessions.map(({ day, sessionLength }) => ({ day: arrayDay[day-1], sessionLength })) };
  };

  const getDatasUserPerformance = async () => {
    const { userId, kind, data } = statusApi ? await fetchDataErrorHandling(uId, 'performance') : retrieveDataMock('userPerformances', uId);
    const kindFrenchArray = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"]; // pour associer un tableau traduit en français des types d'exercices

    const kindFrench = (indexKind) => kindFrenchArray[indexKind] || "Unknown";

    return {
      userId,
      kind,
      dataPerformance: data.map(({ value, kind }) => ({ value, kind: kindFrench(kind-1) }))
    };
  };

  return {
    userDatas: await getDatasUserInfos(), // retourne chaque objet avec le titre et la donnée adéquate
    activitiesDatas: await getDatasActivities(),
    averageDatas: await getDatasAverage(),
    performancesDatas: await getDatasUserPerformance()
  };
}
