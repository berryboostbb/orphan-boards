import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
// import {setAuthToken, setUser, socialLogin, store} from '../exporter';
import messaging from '@react-native-firebase/messaging';
import {
  GST,
  THEME,
  GOOGLE_MAPS_APIKEY,
  socialLogin,
  store,
} from '../../shared/exporter';
import {setUser} from '../../shared/redux/reducers/userReducer';

const onFacebookButtonPress = async (toggleLoading: any) => {
  LoginManager.logOut();
  toggleLoading(true);
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]);

    if (result.isCancelled) {
      toggleLoading(false);

      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // console.log('xc bbnxzvdnbxfbgn........', facebookCredential);

    const deviceId = store.getState().root.user.fcmToken;
    // const deviceId = await messaging().getToken();
    await auth()
      .signInWithCredential(facebookCredential)
      .then(async res => {
        const fbData = res?.additionalUserInfo?.profile;

        await socialLogin({
          firstName: fbData?.first_name,
          lastName: fbData?.last_name,
          email: fbData?.email,
          type: 'facebook',
          deviceId,
          location: {
            coordinates: [-122.406417, 37.785834],
          },
          profilePic: fbData?.picture.data.url,
        })
          .then(res => {
            console.log('sdbcvmnasdbvadbfgf', res.data);
            let responData = {
              user: res?.data?.user,
              token: res?.data?.token,
            };

            store.dispatch(setUser(responData));
            toggleLoading(false);
          })
          .catch(err => {
            toggleLoading(false);
          });
      })
      .catch(err => {
        console.log('---error----', err);
        // toggleLoading(false);
      });

    return true;
  } catch (err) {
    console.log('----facebook error----', err);
    // toggleLoading(false);
    return false;
  }
};

export {onFacebookButtonPress};
