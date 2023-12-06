import { Alert, Dimensions, PermissionsAndroid } from 'react-native';


export const getWidth = () => {
  return Dimensions.get('window').width;
};
export const displayAlert = (
  title: string,
  message: string,
  isCancellable: Boolean,
  okAction: any,
) => {
  Alert.alert(
    title,
    message,

    isCancellable
      ? [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: okAction },
      ]
      : [{ text: 'OK', onPress: okAction }],
  );
};

export const checkLocationPermission = () => {
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};

export const requestLocationPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};
