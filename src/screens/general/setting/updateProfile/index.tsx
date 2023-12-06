import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AuthInput from '../../../../shared/components/auth/authInput/authInput';
import GeneralButton from '../../../../shared/components/common/button/generalbutton';
import Spacer from '../../../../shared/components/common/spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  LoginValidationSchema,
  RF,
  SignUpValidationSchema,
  THEME,
  updateProfileSchema,
  updateUser,
} from '../../../../shared/exporter';
import {Formik} from 'formik';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';
import Header from '../../../../shared/components/auth/header/header';
import {styles} from '../style';
import Avatar from '../../../../shared/components/common/avatar';
import {useSelector, useDispatch} from 'react-redux';
import LoadingAnimation from '../../../../shared/components/loadingAnimation';
import {setUser} from '../../../../shared/redux/reducers/userReducer';
import {toastMessage} from '../../../../shared/utils/constants';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import PhoneInput from 'react-native-phone-number-input';

const UpdateProfile = ({navigation, route}: GenericNavigation) => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    // maxWidth: RF(200),
    // maxHeight: RF(200),
    quality: 1,
    selectionLimit: 1,
  };
  const {
    user: {
      user: {user, token},
    },
  } = useSelector((state: any) => state.root);

  const [value, setValue] = useState(
    user?.phoneNumber ? user?.phoneNumber?.value : '',
  );
  const [formattedValue, setFormattedValue] = useState('');
  const [country, setCountry] = useState(
    user?.phoneNumber
      ? user?.phoneNumber?.country
      : {
          callingCode: ['1'],
          cca2: 'US',
          currency: ['USD'],
          flag: 'flag-us',
          name: 'United States',
          region: 'Americas',
          subregion: 'North America',
        },
  );
  const [valid, setValid] = useState(true);
  console.log('vvvvvvv....', user?.profilePic);

  const phoneInput = useRef<PhoneInput>(null);

  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [updateLoading, setupdateLoading] = useState(false);
  const dispatch = useDispatch();
  const [imageState, setImageState] = useState(false);

  const insets = useSafeAreaInsets();
  const initialValues = {
    fname: user.firstName,
    lname: user.lastName,
    email: user.email,
    // phoneNumber: user?.phoneNumber ? user?.phoneNumber : '',
  };
  useEffect(() => {
    setUploadedPhotos({uri: user?.profilePic});
  }, []);

  const ImageUPload = () => {
    launchImageLibrary(
      options,
      (res: any) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else {
          console.log('imageressss..', res.assets);
          setUploadedPhotos(res?.assets[0]);
          setImageState(true);
        }
      },

      // console.log('dd......', res.assets),
    );
  };
  const handleUpdate = (values: any) => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    console.log('check', checkValid);

    const phone = {
      value,
      country,
    };
    let imageToSend = {};

    const params: any = [
      {name: 'firstName', data: values.fname},
      {name: 'lastName', data: values.lname},
      {name: 'phoneNumber', data: JSON.stringify(phone)},
    ];

    if (imageState) {
      imageToSend = {
        name: `images`,
        filename: `images[${0}]`,
        data: RNFetchBlob.wrap(
          decodeURIComponent(
            (uploadedPhotos as any)?.uri.toString().replace('file://', ''),
          ),
        ),
      };
      params.push(imageToSend);
    }

    const param2 = {
      firstName: values.fname,
      lastName: values.lname,
      phoneNumber: phone,
    };

    let paramToSend = null;

    if (imageState) {
      paramToSend = params;
    } else {
      paramToSend = param2;
    }

    // let params = {};
    // if (values.phoneNumber) {
    //   params = {
    //     firstName: values.fname,
    //     lastName: values.lname,
    //     phoneNumber: values.phoneNumber,
    //     image: imageToSend,
    //   };
    // } else {
    //   params = {
    //     firstName: values.fname,
    //     lastName: values.lname,
    //     image: imageToSend,
    //   };
    // }

    if (phone.value == '') {
      updateServe(paramToSend);
    } else {
      if (checkValid) {
        updateServe(paramToSend);
      } else {
        toastMessage('error', 'Invalid phone number');
      }
    }
  };

  const updateServe = (param: any) => {
    setupdateLoading(true);

    updateUser(user?.id, param, imageState)
      .then(res => {
        let userToset = {};
        if (imageState) {
          let resp = JSON.parse(res.data);
          toastMessage('success', resp.msg);

          userToset = {
            token: token,
            user: resp.user,
          };
        } else {
          userToset = {
            token: token,
            user: res.data.user,
          };
          toastMessage('success', 'Profile updated successfuly');
        }

        dispatch(setUser(userToset));

        setImageState(false);
      })
      .catch(err => console.log(err))
      .finally(() => setupdateLoading(false));
  };

  // console.log('upload...', uploadedPhotos);
  let source = {};

  if ((uploadedPhotos as any)?.uri) {
    source = {uri: (uploadedPhotos as any)?.uri + '?' + new Date().getTime()};
    // source = {};
  } else {
    source = {};
  }

  return (
    <View style={styles.container}>
      <Header header="Account Settings" navigation={navigation} />
      <KeyboardAwareScrollView
        style={[
          styles.childContainer,
          {
            //   paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingHorizontal: RF(10),
          },
        ]}>
        <Formik
          initialValues={initialValues}
          validationSchema={updateProfileSchema}
          onSubmit={values => {
            handleUpdate(values);
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
              <View style={styles.profleHeader}>
                <TouchableOpacity
                  onPress={ImageUPload}
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 50,
                    borderColor: 'gray',
                    elevation: 5,
                  }}>
                  <Avatar
                    style={styles.logo}
                    source={(source as any)?.uri && source}
                  />
                </TouchableOpacity>
                <Text style={styles.txt}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>

              <AuthInput
                placeholder="Eugene"
                inputTitle={'First Name'}
                value={values.fname}
                keyboardType="default"
                autoCapitalize={'none'}
                onChangeText={handleChange('fname')}
                errorView={errors.fname && touched.fname ? errors.fname : ''}
              />
              <Spacer />

              <AuthInput
                placeholder="Eugene"
                inputTitle={'Last Name'}
                value={values.lname}
                keyboardType="default"
                autoCapitalize={'none'}
                onChangeText={handleChange('lname')}
                errorView={errors.lname && touched.lname ? errors.lname : ''}
              />
              <Spacer />

              {/* <AuthInput
                placeholder="Eugene"
                inputTitle={'Email'}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize={'none'}
                onChangeText={handleChange('email')}
                errorView={errors.email && touched.email ? errors.email : ''}
              />
              <Spacer /> */}

              {/* <AuthInput
                placeholder="+912131231231"
                inputTitle={'Phone Number (Optional)'}
                value={values.phoneNumber}
                keyboardType="numeric"
                autoCapitalize={'none'}
                onChangeText={handleChange('phoneNumber')}
                errorView={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
              /> */}
              <Text style={style1.inputTitle}>Phone Number (Optional)</Text>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                textInputProps={{
                  // value,
                  // onKeyPress: e => setKeyPress(e.nativeEvent.key),
                  // placeholderTextColor: lightGray,
                  maxLength: 10,
                }}
                // defaultCode={form.country ? form.country.cca2 : 'PK'}
                // defaultCode="DM"
                defaultCode={country?.cca2}
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                // onChangeFormattedText={text => {
                //   setFormattedValue(text);
                // }}
                onChangeCountry={val => setCountry(val)}
                containerStyle={{
                  backgroundColor: THEME.colors.white,
                  width: '100%',
                  borderBottomColor: 'rgba(190, 190, 190, 0.69)',
                  borderBottomWidth: RF(2),
                  height: RF(80),
                }}
                textContainerStyle={{
                  backgroundColor: THEME.colors.white,
                }}
              />
              <Spacer />

              <GeneralButton
                title="UPDATE PROFILE"
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
        <LoadingAnimation visible={updateLoading} />
      </KeyboardAwareScrollView>
    </View>
  );
};

//make this component available to the app
export default UpdateProfile;

const style1 = StyleSheet.create({
  inputTitle: {
    fontFamily: THEME.fonts.primary,
    fontWeight: '400',
    fontSize: RF(12),
    color: '#787878',
    textTransform: 'capitalize',
    // paddingBottom: RF(10),
  },
});
