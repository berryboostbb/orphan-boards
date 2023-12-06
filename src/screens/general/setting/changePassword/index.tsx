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

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AuthInput from '../../../../shared/components/auth/authInput/authInput';
import GeneralButton from '../../../../shared/components/common/button/generalbutton';
import Spacer from '../../../../shared/components/common/spacer';
import {
  LoginValidationSchema,
  RF,
  changePasswordSchema,
  THEME,
  updateUserPassword,
} from '../../../../shared/exporter';
import {Formik} from 'formik';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';
import Header from '../../../../shared/components/auth/header/header';
import {styles} from '../style';
import Avatar from '../../../../shared/components/common/avatar';
import {toastMessage} from '../../../../shared/utils/constants';
import LoadingAnimation from '../../../../shared/components/loadingAnimation';

import {useSelector} from 'react-redux';
const ChangePasword = ({navigation, route}: GenericNavigation) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const {
    user: {
      user: {user, token},
    },
  } = useSelector((state: any) => state.root);
  const initialValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handlePasswordUpdate = (values: any) => {
    setLoading(true);

    const params = {
      userId: user.id,
      currentPassword: values.password,
      newPassword: values.newPassword,
    };
    console.log('param', params);

    updateUserPassword(params)
      .then(res => {
        toastMessage('success', (res.data as any)?.msg);
      })
      .catch(err => toastMessage('error', err.error))
      .finally(() => setLoading(false));
  };
  return (
    <View style={styles.container}>
      <Header header="Change Password" navigation={navigation} />
      <View
        style={[
          styles.childContainer,
          {
            //   paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingHorizontal: RF(10),
          },
        ]}>
        <Spacer />
        <Text style={{fontSize: RF(16), fontFamily: THEME.fonts.primary}}>
          Please enter your new password, it should be different from the
          previous one.
        </Text>
        <Spacer />
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={values => {
            handlePasswordUpdate(values);
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
              <AuthInput
                placeholder="Eugene"
                inputTitle={'Old Password'}
                value={values.password}
                keyboardType="default"
                autoCapitalize={'none'}
                onChangeText={handleChange('password')}
                errorView={
                  errors.password && touched.password ? errors.password : ''
                }
              />
              <Spacer />

              <AuthInput
                placeholder="Eugene"
                inputTitle={'New Password'}
                value={values.newPassword}
                keyboardType="default"
                autoCapitalize={'none'}
                onChangeText={handleChange('newPassword')}
                errorView={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : ''
                }
              />
              <Spacer />

              <AuthInput
                placeholder="Eugene"
                inputTitle={'Confirm Password'}
                value={values.confirmPassword}
                keyboardType="default"
                autoCapitalize={'none'}
                onChangeText={handleChange('confirmPassword')}
                errorView={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ''
                }
              />

              <Spacer />

              <GeneralButton
                title="CHANGE PASSWORD"
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
      </View>
      <LoadingAnimation visible={loading} />
    </View>
  );
};

//make this component available to the app
export default ChangePasword;
