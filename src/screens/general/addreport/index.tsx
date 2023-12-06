import React, {Component, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import A from 'react-native-vector-icons/AntDesign';
import AuthInput from '../../../shared/components/auth/authInput/authInput';
import Header from '../../../shared/components/auth/header/header';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {styles} from './styles';
import Spacer from '../../../shared/components/common/spacer';
import {Formik} from 'formik';
import ActionSheet from 'react-native-actions-sheet';
import {
  addReportService,
  addReportValidationSchema,
  RF,
  THEME,
} from '../../../shared/exporter';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import FastImage from 'react-native-fast-image';
import CustomTitle from '../../../shared/components/common/customTitle';
import FixedButton from '../../../shared/components/common/fixedButton';
import CustomBottomSheet from '../../../shared/components/common/customSheet';
import Geolocation from 'react-native-geolocation-service';
import {waveData, wveCondition} from './data';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector, useDispatch} from 'react-redux';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import {toastMessage} from '../../../shared/utils/constants';
import {setReport} from '../../../shared/redux/reducers/reportReducer';
import Icon from 'react-native-vector-icons/Entypo';
import Camera from 'react-native-vector-icons/AntDesign';
const initialValues = {
  rpTitle: '',
  rprtDesrptn: '',
};
const AddReport = ({navigation, route}: GenericNavigation) => {
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const ref = useRef<any>();

  const [errorfor, setErrorFor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [wveSize, setWveSize] = useState(waveData[0]);
  const [wveCondtn, setWveCondtn] = useState(wveCondition[0]);
  const [select, setSlectedConditionOrSize] = useState('');
  const [loader, setLoader] = useState(false);
  const {
    user,
    report: {report},
  } = useSelector((state: any) => state.root);
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    // maxWidth: RF(1000),
    // maxHeight: RF(1000),
    quality: 1,
    selectionLimit: 1,
  };
  const ImageUPload = () => {
    resetError();
    // launchImageLibrary(options, (res: any) => setUploadedPhotos(res.assets));
    ref.current?.show();
  };

  const cameraImageHandler = () => {
    launchCamera(options, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        console.log('imageressss..', res);
        setUploadedPhotos(res?.assets[0]);
      }
      ref.current?.hide();
    });
  };

  const galleryImageHandler = () => {
    launchImageLibrary(options, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        console.log('imageressss..', res);
        setUploadedPhotos(res?.assets[0]);
      }
      ref.current?.hide();
    });
  };

  const resetError = () => {
    setErrorMsg('');
    setErrorFor('');
  };
  const delImage = () => {
    // let clonePhotos = [...uploadedPhotos];
    // clonePhotos.splice(indx, 1);
    setUploadedPhotos({});
  };

  const renderPhotos = () => {
    console.log(uploadedPhotos);

    if (
      uploadedPhotos && // 👈 null and undefined check
      Object.keys(uploadedPhotos).length === 0 &&
      Object.getPrototypeOf(uploadedPhotos) === Object.prototype
    ) {
      return null;
    } else {
      return (
        <View style={styles.uploadCont}>
          <TouchableOpacity style={styles.close} onPress={() => delImage()}>
            <A name="close" color="white" size={20} />
          </TouchableOpacity>
          <View style={styles.uploadItem}>
            <FastImage
              source={{uri: (uploadedPhotos as any)?.uri}}
              style={{height: RF(50), width: RF(50), borderRadius: RF(5)}}
            />
          </View>
        </View>
      );
    }
  };
  // uploadedPhotos?.length > 0 &&
  // uploadedPhotos?.map((item: any, index: number) => (

  // ));
  const sheetRef: any = useRef(null);
  const handleSubmit = (values: any) => {
    console.log(values, wveCondtn, wveSize);
    getCurrentLocation(values);
  };
  const selectData = (res: any) => {
    if (select == 'waveSize') {
      setWveSize(res);
    } else {
      setWveCondtn(res);
    }
    console.log('res', res);
  };

  const getCurrentLocation = async (values: any) => {
    apiCall(values);
    // let permiss = await Geolocation.requestAuthorization('whenInUse');

    // if (permiss == 'granted') {
    //   await Geolocation.getCurrentPosition(
    //     info => {
    //       const { latitude, longitude } = info.coords;
    //       let obj = {
    //         lat: latitude,
    //         lng: longitude,
    //       };

    //     },
    //     err => console.log(err),
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    //   );
    // } else {
    //   Toast.show({
    //     text1: 'Location not Enabled',
    //     type: 'error',
    //   });
    // }
  };
  const apiCall = (val: any) => {
    // if(item?.location?.coordinates){

    // }
    setLoader(true);
    let obj: any = {
      title: val?.rpTitle,
      description: val?.rprtDesrptn,
      waveSize: wveSize.name,
      waveForm: wveCondtn.type,
      location: {
        coordinates: [
          item?.location?.coordinates
            ? item?.location?.coordinates[0]
            : item?.geometry?.location?.lng,
          item?.location?.coordinates
            ? item?.location?.coordinates[1]
            : item?.geometry?.location?.lat,
        ],
      },
      locationId: item?.locationId ? item?.locationId : item?.place_id,
      locationTitle: item?.locationTitle
        ? item?.locationTitle
        : item?.formatted_address,
      user: user?.user?.user?.id,
    };
    const params: any = [];
    Object.keys(obj).forEach((key: any) => {
      if (key == 'location') {
        params.push({
          name: key,
          data: JSON.stringify(obj[key]),
        });
      } else {
        params.push({
          name: key,
          data: obj[key],
        });
      }
    });
    // uploadedPhotos.forEach((img: any, inx: number) => {
    params.push({
      name: `images`,
      filename: `images[${0}]`,
      data: RNFetchBlob.wrap(
        decodeURIComponent(
          (uploadedPhotos as any)?.uri.toString().replace('file://', ''),
        ),
      ),
    });
    // });

    addReportService(params)
      .then(res => {
        let data = JSON.parse(res.data);

        const img = [];
        img.push((uploadedPhotos as any)?.uri);
        const temp = data?.data;
        temp.images = img;

        let cloneArr: any = [...report];
        cloneArr = [temp, ...cloneArr];
        dispatch(setReport(cloneArr));
        navigation.navigate('Home');
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log('error', err);
        toastMessage('error', err?.response?.data?.message);
      });
  };
  return (
    <View style={styles.container}>
      <Header header={'Post Report'} navigation={navigation} />
      <Formik
        initialValues={initialValues}
        validationSchema={addReportValidationSchema}
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
            <KeyboardAwareScrollView style={styles.childContainer}>
              {console.log('errors', errors)}

              <View>
                <CustomTitle title={'Report conditions'} />
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View style={styles.inpCont}>
                    <Spacer />
                    <AuthInput
                      placeholder="Post Title"
                      value={values.rpTitle}
                      inputTitle={'Post Title'}
                      onChangeText={handleChange('rpTitle')}
                      errorView={
                        errors.rpTitle && touched.rpTitle ? errors.rpTitle : ''
                      }
                    />
                    <Spacer />
                    <AuthInput
                      value={wveSize.name}
                      inputTitle={'Wave Size'}
                      dropBoolean={true}
                      onPress={() => {
                        sheetRef.current.show();
                        setSlectedConditionOrSize('waveSize');
                      }}
                      errorView={''}
                    />
                    <Spacer />
                    <AuthInput
                      placeholder="Excellent"
                      value={wveCondtn.name}
                      inputTitle={'Wave Form'}
                      dropBoolean={true}
                      onPress={() => {
                        sheetRef.current.show();
                        setSlectedConditionOrSize('wveCondition');
                      }}
                      errorView={''}
                    />
                    <Spacer />
                    <AuthInput
                      placeholder="Are coniditons good? What can the other fellow surfers expect. Let them know"
                      descrptn={true}
                      value={values.rprtDesrptn}
                      multiline={true}
                      inputTitle={'Description'}
                      onChangeText={handleChange('rprtDesrptn')}
                      errorView={
                        errors.rprtDesrptn && touched.rprtDesrptn
                          ? errors.rprtDesrptn
                          : ''
                      }
                    />
                    <Spacer />
                    <ScrollView
                      nestedScrollEnabled
                      showsHorizontalScrollIndicator
                      horizontal
                      persistentScrollbar
                      contentContainerStyle={{
                        width: '100%',
                        flexWrap: 'wrap',
                        paddingTop: RF(10),
                      }}>
                      {renderPhotos()}
                      <TouchableOpacity
                        style={styles.uploadCont}
                        onPress={ImageUPload}>
                        <View style={styles.uploadItem}>
                          <A name="upload" size={24} />
                          <Text>Upload</Text>
                        </View>
                      </TouchableOpacity>
                    </ScrollView>
                    {errorfor == 'image' && errorMsg != '' && (
                      <Text style={{color: 'red', fontSize: RF(13)}}>
                        {errorMsg}
                      </Text>
                    )}
                    <Spacer />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <FixedButton
                repotContStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
                title="POST REPORT"
                onPress={() => {
                  if (
                    uploadedPhotos && // 👈 null and undefined check
                    Object.keys(uploadedPhotos).length === 0 &&
                    Object.getPrototypeOf(uploadedPhotos) === Object.prototype
                  ) {
                    setErrorFor('image');
                    setErrorMsg('Photo is required for the Reports!!');
                  } else {
                    handleSubmit();
                  }
                }}
              />
            </KeyboardAwareScrollView>
          </>
        )}
      </Formik>
      <LoadingAnimation visible={loader} />
      <CustomBottomSheet
        data={select == 'waveSize' ? waveData : wveCondition}
        onSelect={selectData}
        ref={sheetRef}
      />
      {ref && (
        <ActionSheet ref={ref} containerStyle={styles.actionSheet}>
          <Pressable
            onPress={() => ref.current?.hide()}
            style={styles.actionSheetView}>
            <Pressable onPress={cameraImageHandler} style={styles.miniAccView}>
              <Camera
                name="camera"
                size={20}
                color={THEME.colors.lightPrimary}
              />
              <Text style={{fontSize: RF(14), color: THEME.colors.gray}}>
                Open Camera
              </Text>
            </Pressable>
            <Pressable onPress={galleryImageHandler} style={styles.miniAccView}>
              <Icon name="images" size={20} color={THEME.colors.lightPrimary} />
              <Text style={{fontSize: RF(14), color: THEME.colors.gray}}>
                Open Gallery
              </Text>
            </Pressable>
          </Pressable>
        </ActionSheet>
      )}
    </View>
  );
};

// define your styles

//make this component available to the app
export default AddReport;
