import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {STYLES} from './styles';
import Touch from '../../../shared/components/Touch/touch';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Title from '../../../shared/components/auth/authTitle/title';
import AuthInput from '../../../shared/components/auth/authInput/authInput';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import Spacer from '../../../shared/components/common/spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  loginService,
  LoginValidationSchema,
  RF,
  THEME,
} from '../../../shared/exporter';
import FastImage from 'react-native-fast-image';
import {facebookLogo, googleLogo} from '../../../assets';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../shared/redux/reducers/userReducer';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import DeviceInfo from 'react-native-device-info';
import {toastMessage} from '../../../shared/utils/constants';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import {onGoogleButtonPress} from '../GoogleAuth';
import {onFacebookButtonPress} from '../FacebookAuth';

export default function Login({navigation, route}: GenericNavigation) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [loader, setLoader] = useState(false);
  const [coordinates, setcoordinates] = useState(null);
  // let fcmToken = store.getState().root.user.fcmToken;

  const {fcmToken} = useSelector((state: any) => state.root.user);
  console.log('toooo...', fcmToken);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleGoogleLogin = () => {
    // console.log('handle Google login....');
    onGoogleButtonPress(setLoader);
  };
  const handleLogin = (obj: any) => {
    let loginObj = {
      ...obj,
      // deviceId: DeviceInfo.getUniqueId(),
      deviceId: fcmToken,
      location: {
        coordinates: coordinates,
      },
    };
    setLoader(true);
    loginService(loginObj)
      .then(({data}) => {
        let responData = {
          user: data?.user,
          token: data?.token,
        };
        dispatch(setUser(responData));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      let permiss = await Geolocation.requestAuthorization('whenInUse');
      if (permiss == 'granted') {
        getCurrentLocationApi();
      } else {
        toastMessage('error', 'Location not Enabled');
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message: 'Allow app to get your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocationApi();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getCurrentLocationApi = () => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        let arr = [];
        arr.push(longitude, latitude);
        console.log('login...', arr);

        setcoordinates(arr as any);
      },
      err => console.log(err),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  return (
    <View style={STYLES.Container}>
      <View
        style={[
          STYLES.childContainer,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={STYLES.inputContainer}>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginValidationSchema}
              onSubmit={values => {
                console.log('values', values);
                handleLogin(values);
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                isSubmitting,
                handleSubmit,
                setFieldValue,
              }) => (
                <>
                  <Title title={'Login'} />
                  <Spacer />
                  <AuthInput
                    placeholder="John@gmail.com"
                    inputTitle={'Email Address'}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize={'none'}
                    onChangeText={handleChange('email')}
                    errorView={
                      errors.email && touched.email ? errors.email : ''
                    }
                  />

                  <Spacer />
                  <AuthInput
                    placeholder="*********"
                    value={values.password}
                    inputTitle={'Password'}
                    onChangeText={handleChange('password')}
                    secureTextEntry={true}
                    errorView={
                      errors.password && touched.password ? errors.password : ''
                    }
                  />

                  <Spacer />
                  <View style={STYLES.forgot}>
                    <Pressable onPress={() => navigation.navigate('forgot')}>
                      <Text style={STYLES.forgottxt}>Forgot Password?</Text>
                    </Pressable>
                  </View>
                  <Spacer />
                  <GeneralButton title="LOGIN" onPress={() => handleSubmit()} />
                </>
              )}
            </Formik>
          </View>

          <View style={STYLES.socialContainer}>
            <View style={STYLES.socialContinue}>
              <View style={STYLES.letline}></View>
              <Text style={STYLES.continutxt}>or continue with</Text>
              <View style={STYLES.rightLine}></View>
            </View>
            <Spacer />

            <View style={STYLES.socailIconCon}>
              <Pressable
                style={STYLES.socialiconContainer}
                onPress={() => onFacebookButtonPress(setLoader)}>
                <FastImage source={facebookLogo} style={STYLES.iconSize} />
              </Pressable>
              <Pressable
                style={STYLES.socialiconContainer}
                onPress={handleGoogleLogin}>
                <FastImage source={googleLogo} style={STYLES.iconSize} />
              </Pressable>
            </View>
            <Spacer />
            <View style={STYLES.signupMainCont}>
              <View style={STYLES.singupCont}>
                <Text style={STYLES.sginupTxt}>Don't have an account?</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Signup', {coordinates: coordinates})
                  }>
                  <Text style={STYLES.signup}> Signup Now</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <LoadingAnimation visible={loader} />
    </View>
  );
}
