import axios, {AxiosInstance} from 'axios';
import {BASE_URL, store} from '../exporter';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const initialConfig = () => {
  HTTP_CLIENT.interceptors.request.use(
    config => {
      const {user} = store.getState().root;
      console.log('user token', user?.user?.token);

      if (user && user?.user?.token && config.headers) {
        config.headers.Authorization = `Bearer ${user?.user?.token}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
};
// HTTP_CLIENT.interceptors.request.use(
//   config => {
//     const { user } = store.getState().root;
//     console.log('user token',user?.user?.token);

//     if (user && user?.user?.token && config.headers) {

//       config.headers.Authorization = `Bearer ${user?.user?.token}`;
//     }
//     return config;
//   },
//   err => Promise.reject(err),
// );
export const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    config => {
      const {user} = store.getState().root;

      if (user && user?.user?.token && config.headers) {
        debugger;
        config.headers.Authorization = `Bearer ${user?.user?.token}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
};

export const googleConfig = () => {
  GoogleSignin.configure({
    scopes: ['email', 'profile'], // [Android] what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '773021967532-9ftbalnrauesjnfd65a4nuqqp3vpe7n4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId:
      '773021967532-541lf89lmembrq1pv9j8qv1kvi8is0kh.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
};
