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
  RF,
  SignUpValidationSchema,
  THEME,
} from '../../../shared/exporter';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {setUserEmailorCode} from '../../../shared/redux/reducers/resetReducer';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation, route}: GenericNavigation) => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const initialValues = {
    email: '',
  };
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  const handleForgostPassword = (values: any) => {
    let cod = generateRandomNumber();
    let obj = {
      email: values?.email,
      code: String(cod),
    };
    setLoader(true);
    forgotPaswordService(obj)
      .then(({data}) => {
        setLoader(false);
        navigation.navigate('confirmation');
        Toast.show({
          type: 'success',
          text1: data?.msg,
        });
        dispatch(setUserEmailorCode(obj));
      })
      .catch(err => {
        setLoader(false);
        Toast.show({
          type: 'error',
          text1: err?.response?.data?.msg,
        });
      });
  };

  return (
    <View
      style={[
        STYLES.Container,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <Header header="Forgot Password" navigation={navigation} />

      <View style={[STYLES.childContainer]}>
        <View style={STYLES.inputContainer}>
          <Spacer />
          <Text style={STYLES.resetTxt}>
            Please enter your email address, password resent link will be sent
            to it.
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasValidationSchema}
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
                  placeholder="John@gmail.com"
                  value={values.email}
                  inputTitle={'Email Address'}
                  keyboardType={'email-address'}
                  onChangeText={handleChange('email')}
                  errorView={errors.email && touched.email ? errors.email : ''}
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

export default ForgotPassword;
