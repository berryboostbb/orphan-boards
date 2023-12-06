import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import {
  GST,
  THEME,
  GOOGLE_MAPS_APIKEY,
  socialLogin,
  store,
} from '../../shared/exporter';
import {setUser} from '../../shared/redux/reducers/userReducer';

const onGoogleButtonPress = async (toggleLoading: any) => {
  GoogleSignin.signOut();
  console.log('hitt....');

  toggleLoading(true);
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();
    console.log('hittttt....', userInfo);

    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo?.idToken,
    );

    const deviceId = store.getState().root.user.fcmToken;

    await auth()
      .signInWithCredential(googleCredential)
      .then(res => {
        console.log('ress.....', res);

        const name = res?.user?.displayName;
        const splitName = name?.split(' ');

        socialLogin({
          firstName: splitName[0],
          lastName: splitName[1],
          email: res?.user?.email,
          type: 'google',
          deviceId,
          location: {
            coordinates: [-122.406417, 37.785834],
          },
          profilePic: res?.user?.photoURL,
        })
          .then(res => {
            let responData = {
              user: res?.data?.user,
              token: res?.data?.token,
            };

            store.dispatch(setUser(responData));
          })
          .catch(err => {
            console.log('err', err);
          })
          .finally(() => toggleLoading(false));
      })
      .catch(err => {
        console.log('err', err);
        toggleLoading(false);
      });
  } catch (error) {
    toggleLoading(false);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('user cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('operation (e.g. sign in) is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play services not available or outdated');
    } else {
      console.log(' some other error happened', error);
    }
  }
};

export {onGoogleButtonPress};
