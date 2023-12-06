import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
} from 'react-native';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {STYLES} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Title from '../../../shared/components/auth/authTitle/title';
import AuthInput from '../../../shared/components/auth/authInput/authInput';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import Spacer from '../../../shared/components/common/spacer';
import {
  LoginValidationSchema,
  RF,
  signupService,
  SignUpValidationSchema,
  THEME,
} from '../../../shared/exporter';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import DeviceInfo from 'react-native-device-info';
import {setUser} from '../../../shared/redux/reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {toastMessage} from '../../../shared/utils/constants';
import {fcmService} from '../../../shared/services/FCMService';
import {localNotificationService} from '../../../shared/services/LocalNotifictionService';
const Signup = ({navigation, route}: GenericNavigation) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [devId, setdevId]: any = useState(null);
  const {coordinates}: any = route?.params;
  const [FCMToken, setFCMToken] = React.useState('');
  const {fcmToken} = useSelector((state: any) => state.root.user);

  const initialValues = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  console.log('cooorrr....', coordinates);

  const handleSubmit = (value: any) => {
    let obj = {
      firstName: value.fname,
      lastName: value.lname,
      email: value.email,
      password: value.password,
      // deviceId: devId,
      deviceId: fcmToken,
      location: {
        coordinates: coordinates,
      },
    };
    setLoading(true);
    signupService(obj)
      .then(({data}) => {
        console.log(data);
        let userobj = {
          user: data?.user,
          token: data?.token,
        };

        dispatch(setUser(userobj));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    let deviceid = DeviceInfo.getUniqueId();
    if (deviceid) {
      setdevId(deviceid);
    }
  });

  // function onRegister(FCMToken: any) {
  //   setFCMToken(FCMToken);
  //   // dispatch(isNotifications(true));
  // }
  // const onNotification = (notify: any, remoteMessage: any) => {
  //   localNotificationService.configure(onOpenNotification, remoteMessage);
  //   const options = {
  //     soundName: 'default',
  //     playSound: true,
  //   };
  //   localNotificationService.showNotification(
  //     0,
  //     notify?.title,
  //     notify?.body,
  //     notify,
  //     options,
  //   );
  // };
  // const onOpenNotification = async (notify: any, remoteMessage: any) => {
  //   if (remoteMessage) {
  //     const {type} = remoteMessage.data;
  //   }
  // };

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
              validationSchema={SignUpValidationSchema}
              onSubmit={values => {
                handleSubmit(values);
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
                  <Title title={'Signup'} />
                  <Spacer />
                  <AuthInput
                    placeholder="Eugene"
                    inputTitle={'First Name'}
                    value={values.fname}
                    keyboardType="default"
                    autoCapitalize={'none'}
                    onChangeText={handleChange('fname')}
                    errorView={
                      errors.fname && touched.fname ? errors.fname : ''
                    }
                  />

                  <Spacer />
                  <AuthInput
                    placeholder="Elliot"
                    value={values.lname}
                    inputTitle={'Last Name'}
                    onChangeText={handleChange('lname')}
                    secureTextEntry={false}
                    errorView={
                      errors.lname && touched.lname ? errors.lname : ''
                    }
                  />

                  <Spacer />
                  <AuthInput
                    placeholder="John@gmail.com"
                    value={values.email}
                    inputTitle={'Email Address'}
                    keyboardType={'email-address'}
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
                  <AuthInput
                    placeholder="*********"
                    value={values.confirmPassword}
                    inputTitle={'Confirm Password'}
                    onChangeText={handleChange('confirmPassword')}
                    secureTextEntry={true}
                    errorView={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : ''
                    }
                  />
                  {console.log(errors)}
                  <Spacer />

                  <GeneralButton
                    title="SIGNUP"
                    onPress={() => handleSubmit()}
                  />
                </>
              )}
            </Formik>
          </View>

          <View style={STYLES.signupMainCont}>
            <View style={STYLES.singupCont}>
              <Text style={STYLES.sginupTxt}>Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={STYLES.signup}> Login Now</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <LoadingAnimation visible={loading} />
    </View>
  );
};

export default Signup;
