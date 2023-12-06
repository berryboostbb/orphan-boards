import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {PermissionsAndroid, Platform} from 'react-native';
const checkLocationPermission = () => {
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};

const requestLocationPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};

const androidLocationEnabler = () => {
  return RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  });
};
export {
  androidLocationEnabler,
  requestLocationPermission,
  checkLocationPermission,
};
