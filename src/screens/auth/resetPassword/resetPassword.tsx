import React, {useState} from 'react';
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
import Header from '../../../shared/components/auth/header/header';
import AuthInput from '../../../shared/components/auth/authInput/authInput';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import Spacer from '../../../shared/components/common/spacer';
import {
  forgotPasValidationSchema,
  forgotPaswordService,
  LoginValidationSchema,
  resetPasValidationSchema,
  resetPaswordService,
  RF,
  SignUpValidationSchema,
  THEME,
} from '../../../shared/exporter';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setUserEmailorCode} from '../../../shared/redux/reducers/resetReducer';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import Toast from 'react-native-toast-message';

const ResetPassword = ({navigation, route}: GenericNavigation) => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {resetpassword} = useSelector((state: any) => state.root);
  const initialValues = {
    password: '',
  };

  const handleForgostPassword = (values: any) => {
    let obj = {
      email: resetpassword.email,
      password: values?.password,
    };
    console.log(obj);

    setLoader(true);
    resetPaswordService(obj)
      .then(({data}) => {
        setLoader(false);
        navigation.navigate('Login');
        Toast.show({
          type: 'success',
          text1: data?.msg,
        });
      })
      .catch(err => {
        setLoader(false);
        console.log(err?.response);

        Toast.show({
          type: 'error',
          text1: err?.response?.data?.message,
        });
      });
  };

  console.log('reste', resetpassword);

  return (
    <View
      style={[
        STYLES.Container,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <Header header="Reset Password" navigation={navigation} />
      <View style={[STYLES.childContainer]}>
        <View style={STYLES.inputContainer}>
          <Spacer />
          {/* <Text style={STYLES.resetTxt}>Please enter your email address, password resent link will be sent to it</Text> */}
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasValidationSchema}
            onSubmit={values => {
              handleForgostPassword(values);
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
                <Spacer />

                <AuthInput
                  value={resetpassword.email}
                  inputTitle={'Email Address'}
                  keyboardType={'email-address'}
                  errorView={''}
                  selectTextOnFocus={false}
                  editable={false}
                />
                <Spacer />
                <AuthInput
                  placeholder="***********"
                  secureTextEntry={true}
                  value={values.password}
                  inputTitle={'Reset Password'}
                  onChangeText={handleChange('password')}
                  errorView={
                    errors.password && touched.password ? errors.password : ''
                  }
                />

                <Spacer />

                <GeneralButton
                  title="RESET PASSWORD"
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
        </View>
      </View>

      <LoadingAnimation visible={loader} />
    </View>
  );
};

export default ResetPassword;
