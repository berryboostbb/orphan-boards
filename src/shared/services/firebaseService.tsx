import messaging from '@react-native-firebase/messaging';
import {BASE_URL, store} from '../exporter';
import {setFCMToken} from '../../shared/redux/reducers/userReducer';

const checkNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken();
  } else {
    requestPermission();
  }
  // const enabled = await messaging().hasPermission();
  // if (enabled) {
  //   getToken();
  // } else {
  //   requestPermission();
  // }
};

const getToken = async () => {
  let fcmToken = store.getState().root.user.fcmToken;
  console.log('fcm....token....Old', fcmToken);

  if (!fcmToken) {
    const newToken = await messaging().getToken();
    console.log('fcm....token....New', newToken);

    if (newToken) {
      store.dispatch(setFCMToken(newToken));
    }
  }
};

const requestPermission = async () => {
  try {
    await messaging().requestPermission();
    // User has authorised
    getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
};

export {checkNotificationPermission};
