import RNFetchBlob from 'rn-fetch-blob';
import {HTTP_CLIENT, BASE_URL, store} from '../exporter';
import {endPoints} from '../utils/endpoint';

const getUserRoutes = (params: any) => {
  return HTTP_CLIENT.get(`${BASE_URL}`);
};
// const updateUser = (id: any, params: any) => {
//   return HTTP_CLIENT.put(`${endPoints.updateUser}/${id}`, params);
// };

const updateUser = (id: any, obj: any, imageState: any) => {
  if (imageState) {
    console.log('obj.... thiiiiiiiiiiii............', obj);

    const {user} = store.getState().root;
    return RNFetchBlob.fetch(
      'PUT',
      `${BASE_URL + endPoints.updateUser}/${id}`,
      {
        'Content-Type': 'multipart/form-data,octet-stream',
        Authorization: `Bearer ${user?.user?.token}`,
      },
      obj,
    );
  } else {
    console.log('false.........hit');

    return HTTP_CLIENT.put(`${endPoints.updateUser}/${id}`, obj);
  }
};
const updateUserPassword = (params: any) => {
  return HTTP_CLIENT.put(endPoints.updateUserPassword, params);
};
const updateNotifications = (query: any) => {
  return HTTP_CLIENT.put(endPoints.updateNotification + query);
};
const favoriteBeachService = (params: any) => {
  return HTTP_CLIENT.post(endPoints.favBeach, params);
};

const getNoticationList = (id: any) => {
  return HTTP_CLIENT.get(`${endPoints.getNotificationList}/${id}`);
};

const handleAllAlerts = (body: any) => {
  return HTTP_CLIENT.put(endPoints.handleAllAlert, body);
};

const handlePerLocationAlerts = (body: any) => {
  return HTTP_CLIENT.put(endPoints.handlePerLocationAlert, body);
};

const handleConditionAlert = (body: any) => {
  return HTTP_CLIENT.put(endPoints.handleConditionAlert, body);
};

const handleBeachAlerts = (body: any) => {
  return HTTP_CLIENT.put(endPoints.handleBeachAlert, body);
};

const handleActiveHours = (body: any) => {
  return HTTP_CLIENT.put(`${endPoints.handleActiveHours}/${body.id}`, {
    activeDays: body.days,
    startTime: body.start,
    endTime: body.end,
  });
};

const handleDailyReporting = (id: any, params: any) => {
  return HTTP_CLIENT.put(`${endPoints.handleDailyReporting}/${id}`, params);
};

const handleLogOut = (userId: any) => {
  return HTTP_CLIENT.put(`${endPoints.handleLogout}/${userId}`);
};

export {
  getUserRoutes,
  updateUser,
  updateUserPassword,
  updateNotifications,
  favoriteBeachService,
  getNoticationList,
  handleAllAlerts,
  handlePerLocationAlerts,
  handleConditionAlert,
  handleBeachAlerts,
  handleActiveHours,
  handleDailyReporting,
  handleLogOut,
};
