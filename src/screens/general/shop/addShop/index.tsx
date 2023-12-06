import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Switch,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AuthInput from '../../../../shared/components/auth/authInput/authInput';
import Header from '../../../../shared/components/auth/header/header';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';
import A from 'react-native-vector-icons/AntDesign';
import Spacer from '../../../../shared/components/common/spacer';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {styles} from './style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import {
  addShopService,
  addShopValidationSchema,
  GOOGLE_MAPS_APIKEY,
  RF,
  THEME,
  updateUserProductService,
  deleteProductPic,
  uploadProductPic,
} from '../../../../shared/exporter';
import CustomBottomSheet from '../../../../shared/components/common/customSheet';
import FastImage from 'react-native-fast-image';
import {Formik} from 'formik';
import RNFetchBlob from 'rn-fetch-blob';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import FixedButton from '../../../../shared/components/common/fixedButton';
import LoadingAnimation from '../../../../shared/components/loadingAnimation';
import {toastMessage} from '../../../../shared/utils/constants';
import {useSelector, useDispatch} from 'react-redux';
import {setProduct} from '../../../../shared/redux/reducers/shopReducer';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Entypo';
import Camera from 'react-native-vector-icons/AntDesign';
import {setUserProduct} from '../../../../shared/redux/reducers/shopReducer';

const AddShop = ({navigation, route}: GenericNavigation) => {
  const screenFlag: any = route?.params?.screenFlag;
  const ref = useRef<any>();

  const shopDetail: any = route?.params?.shopDetail;
  const productId: any = route?.params?.productId;
  const [imgLoading, setimgLoading] = useState(false);
  const [uploadLoading, setuploadLoading] = useState(false);

  const placesRef: any = useRef();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [errorfor, setErrorFor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [soldEnabled, setsoldEnable] = useState(shopDetail?.sold);
  const [img, setImg] = useState([]);
  const [imageState, setImageState] = useState(false);

  const {user, product} = useSelector((state: any) => state.root);
  // console.log('ssss....', shopDetail);
  const [delIndex, setdelIndex] = useState(null);

  let countryArr = [
    {name: 'New', type: 'new'},
    {name: 'Like New', type: 'like new'},
    {name: 'Used', type: 'used'},
  ];

  let cValueToSet = {};
  if (shopDetail !== undefined) {
    countryArr.map(c => {
      if (shopDetail.condition == c.type) {
        cValueToSet = c;
      }
    });
  } else {
    cValueToSet = countryArr[0];
  }

  const [country, setContry] = useState(cValueToSet);
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState({
    description: '',
    state: '',
    city: '',
  });

  const [loctin, setLoction]: any = useState(null);
  console.log('location', loctin);

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [imgState, setimgState] = React.useState(false);

  const initialValues = {
    prdtitle: shopDetail?.title,
    Loctn: shopDetail?.address.description,
    desrptn: shopDetail?.description,
    price: JSON.stringify(shopDetail?.price),
  };

  // console.log('shopDetailllll', shopDetail?.images);

  useEffect(() => {
    if (shopDetail) {
      setAddress({
        description: shopDetail?.address?.description,
        state: shopDetail?.address?.state,
        city: shopDetail?.address?.city,
      });
      setImg(shopDetail?.images);
    }
  }, []);

  const resetError = () => {
    setErrorMsg('');
    setErrorFor('');
  };
  React.useEffect(() => {
    // AddressRef?.current?.setAddressText(()=> user?.address)

    // "location": {"coordinates": [-74.0059728, 40.7127753], "miles": 10

    // {"lat": 36.1699412, "lng": -115.1398296}

    if (shopDetail?.address?.description) {
      setLoction({
        lat: shopDetail?.location?.coordinates[0],
        lng: shopDetail?.location?.coordinates[1],
      });
      placesRef?.current?.setAddressText(shopDetail?.address?.description);
    }
    // setAddress(S)
  }, []);

  const handleMapPress = (data: any, detail: any, field: any) => {
    const {geometry} = detail;

    setAddress({
      description: data?.description,
      state: data?.terms[data?.terms?.length - 1].value,
      city: data?.terms[data?.terms?.length - 2].value,
    });
    setLoction(geometry?.location);
    field('Loctn', data?.description);
  };

  const sheetRef: any = useRef(null);
  const sheetData = (res: any) => {
    console.log('rseponse', res);
    setContry(res);
  };
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    // maxWidth: RF(200),
    // maxHeight: RF(200),
    quality: 1,
    selectionLimit: 4,
  };
  const ImageUPload = () => {
    resetError();
    // launchImageLibrary(options, (res: any) => setUploadedPhotos(res.assets));
    ref.current?.show();
  };

  const cameraImageHandler = () => {
    launchCamera(options, (res: any) => {
      // setUploadedPhotos(res?.assets);
      // setimgState(true);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        // setUploadedPhotos(res?.assets);
        if (uploadedPhotos?.length < 4) {
          const temp = [...uploadedPhotos];
          const newArray = temp.concat(res?.assets);
          setUploadedPhotos(newArray);
        } else {
          toastMessage('error', 'You can upload 4 images only!');
        }
        setimgState(true);
        setImageState(true);
        if (screenFlag == 'edit') {
          uploadToServ(res?.assets);
        }
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
        if (uploadedPhotos?.length < 4) {
          const temp = [...uploadedPhotos];
          const newArray = temp.concat(res?.assets);
          console.log(res?.assets?.length);

          if (newArray?.length > 4) {
            const res = newArray.slice(0, 4);
            console.log('jksahhjda...', res.length);
            setUploadedPhotos(res);
          } else {
            setUploadedPhotos(newArray);
          }
        } else {
          toastMessage('error', `You can't upload more than 4 images.`);
        }

        setimgState(true);
        setImageState(true);
        if (screenFlag == 'edit') {
          if (img?.length < 4) {
            uploadToServ(res?.assets);
          } else {
            toastMessage('error', `You can't upload more than 4 images.`);
          }
        }
      }
      ref.current?.hide();
    });
  };

  const uploadToServ = (images: any) => {
    let cloneProducts = [...product?.userProductList];
    let param: any = [];
    images.forEach((img: any, inx: number) => {
      param.push({
        name: `images`,
        filename: `images[${inx}]`,
        data: RNFetchBlob.wrap(
          decodeURIComponent(img?.uri.toString().replace('file://', '')),
        ),
      });
    });

    setLoader(true);

    uploadProductPic(productId, param)
      .then((res: any) => {
        let resp = JSON.parse(res?.data);
        setImg(resp?.report?.data?.images);

        const pindex = cloneProducts.findIndex(
          f => f._id === resp?.report?.data?._id,
        );

        cloneProducts[pindex] = resp?.report?.data;

        dispatch(setUserProduct(cloneProducts));
        console.log('mmm....', res?.data?.report?.msg);
      })
      .catch(err => console.log('err', err))
      .finally(() => setLoader(false));
  };

  const delImage = (indx: number) => {
    let clonePhotos = [...uploadedPhotos];
    clonePhotos.splice(indx, 1);
    setUploadedPhotos(clonePhotos);
  };
  const renderPhotos = () =>
    uploadedPhotos?.length > 0 &&
    uploadedPhotos?.map((item: any, index: number) => (
      <View style={styles.uploadCont} key={index}>
        <TouchableOpacity style={styles.close} onPress={() => delImage(index)}>
          <A name="close" color="white" size={20} />
        </TouchableOpacity>
        <View style={styles.uploadItem} key={index.toString()}>
          <FastImage
            source={{uri: item.uri}}
            style={{height: RF(50), width: RF(50), borderRadius: RF(5)}}
          />
        </View>
      </View>
    ));
  const renderOldPhotos = () =>
    img?.length > 0 &&
    img?.map((item: any, index: number) => (
      <View style={styles.uploadCont} key={index}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => delOldImage(index)}>
          <A name="close" color="white" size={20} />
        </TouchableOpacity>
        <View style={styles.uploadItem} key={index.toString()}>
          <FastImage
            source={{uri: item}}
            style={{height: RF(50), width: RF(50), borderRadius: RF(5)}}>
            {imgLoading && delIndex == index && (
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  size="small"
                  color={THEME.colors.lightPrimary}
                />
              </View>
            )}
          </FastImage>
        </View>
      </View>
    ));
  const delOldImage = (index: any) => {
    let cloneProducts = [...product?.userProductList];

    setdelIndex(index);
    let param = {};
    if (img?.length > 0) {
      img?.map((p, ind) => {
        if (ind == index) {
          param = {
            url: p,
          };
        }
      });
    }

    Alert.alert('Confirm!', 'Do you want to delete this picture?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setimgLoading(true);
          deleteProductPic(productId, param)
            .then((res: any) => {
              setImg(res?.data?.report?.data?.images);
              setdelIndex(null);

              const pindex = cloneProducts.findIndex(
                f => f._id === res?.data?.report?.data?._id,
              );

              cloneProducts[pindex] = res?.data?.report?.data;

              dispatch(setUserProduct(cloneProducts));
            })
            .catch((err: any) => console.log('error', err))
            .finally(() => setimgLoading(false));
        },
      },
    ]);
  };
  const resetLoctnAll = () => {
    setAddress({
      description: '',
      state: '',
      city: '',
    });
    setLoction(null);
  };
  const handleApi = (values: any) => {
    const sol = soldEnabled?.toString();

    const params: any = [
      {name: 'title', data: values?.prdtitle},
      {name: 'description', data: values?.desrptn},
      {
        name: 'location',
        data: JSON.stringify({coordinates: [loctin?.lng, loctin?.lat]}),
      },
      {name: 'price', data: values?.price},

      {name: 'condition', data: country?.type},
      {name: 'address', data: JSON.stringify(address)},
      {name: 'user', data: user?.user?.user?.id},
      {name: '_id', data: productId},
      {name: 'sold', data: sol},
    ];

    uploadedPhotos.forEach((img: any, inx: number) => {
      params.push({
        name: `images`,
        filename: `images[${inx}]`,
        data: RNFetchBlob.wrap(
          decodeURIComponent(img?.uri.toString().replace('file://', '')),
        ),
      });
    });
    setLoader(true);

    const param2 = {
      title: values?.prdtitle,
      description: values?.desrptn,
      location: JSON.stringify({coordinates: [loctin?.lat, loctin?.lng]}),
      price: values?.price,
      condition: country?.type,
      address: JSON.stringify(address),
      user: user?.user?.user?.id,
      _id: productId,
      sold: sol,
    };

    let paramToSend = null;

    if (screenFlag == 'edit') {
      paramToSend = param2;
    } else {
      paramToSend = params;
    }

    addShopService(paramToSend, screenFlag)
      .then(({data}) => {
        let cloneProduct = [...product?.userProductList];

        if (screenFlag == 'edit') {
          toastMessage('success', data?.msg);
          navigation.navigate('ManageProducts');

          const pindex = cloneProduct.findIndex(
            f => f._id === data?.report?._id,
          );

          cloneProduct[pindex] = data?.report;

          dispatch(setUserProduct(cloneProduct));
        } else {
          console.log('update....', data);

          let resp = JSON.parse(data);
          toastMessage('success', resp?.msg);
          navigation.navigate('Shop');

          const img = [];
          img.push((uploadedPhotos as any)?.uri);
          const temp = resp?.report;
          temp.images = img;

          cloneProduct = [temp, ...cloneProduct];
          dispatch(setUserProduct(cloneProduct));

          // setImageState(false);
        }

        // cloneProduct = [resp?.report, ...cloneProduct];
        // dispatch(setProduct(cloneProduct));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setLoader(false));
  };

  const toggleSwitch = () =>
    setsoldEnable((previousState: any) => !previousState);
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={{height: RF(80)}}>
        <Header
          header={screenFlag == 'edit' ? 'Edit Product' : 'Add Products'}
          navigation={navigation}
          customStyle={{flex: 1}}
        />
      </View>

      {screenFlag == 'edit' ? (
        <View style={styles.notCont}>
          <Text style={styles.notfytxt} numberOfLines={2}>
            Sold Out
          </Text>
          <Switch
            trackColor={{
              false: '#767577',
              true: THEME.colors.lightPrimary,
            }}
            thumbColor={soldEnabled ? THEME.colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={soldEnabled}
          />
        </View>
      ) : null}

      <Formik
        initialValues={initialValues}
        validationSchema={addShopValidationSchema}
        onSubmit={values => {
          console.log('values', values);
          handleApi(values);
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
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.childCont}>
                  <AuthInput
                    placeholder="New XYZ"
                    value={values.prdtitle}
                    inputTitle={'Product Title'}
                    onChangeText={handleChange('prdtitle')}
                    keyboardType="default"
                    autoCapitalize={'none'}
                    errorView={
                      errors.prdtitle && touched.prdtitle ? errors.prdtitle : ''
                    }
                  />
                  <Spacer />
                  <AuthInput
                    value={country.name}
                    dropBoolean={true}
                    onPress={() => sheetRef.current.show()}
                    inputTitle={'Condition'}
                    errorView={''}
                  />
                  <Spacer />
                  <AuthInput
                    placeholder="$230"
                    value={values.price}
                    inputTitle={'Product Price'}
                    onChangeText={handleChange('price')}
                    keyboardType="numeric"
                    autoCapitalize={'none'}
                    errorView={
                      errors.price && touched.price ? errors.price : ''
                    }
                  />
                  <Spacer />

                  <Text style={styles.loctxt}>Location</Text>

                  <GooglePlacesAutocomplete
                    enablePoweredByContainer={false}
                    listViewDisplayed={true}
                    keyboardShouldPersistTaps="always"
                    textInputProps={{
                      clearButtonMode: 'never',
                      placeholderTextColor: 'black',
                      // value: values.addressToShow,
                      // onChangeText: () => {
                      //   handleChange('addressToShow');
                      // },

                      //   onChangeText: text => {
                      //     handleAddressOnKeyUp(text);
                      //   },
                    }}
                    fetchDetails={true}
                    placeholder="Address"
                    ref={placesRef}
                    styles={{
                      container: {
                        zIndex: 1,
                        flex: 0,
                      },
                      textInput: {
                        color: 'black',
                      },
                      listView: styles.lstView,

                      textInputContainer: [
                        styles.mapInputStyles,
                        errors.Loctn &&
                          touched.Loctn &&
                          styles.validInputStyles,
                      ],
                    }}
                    renderRightButton={() => {
                      return (
                        <TouchableOpacity
                          style={{justifyContent: 'center'}}
                          onPress={() => {
                            placesRef.current.clear();
                            resetLoctnAll();
                            setFieldValue('Loctn', '');
                          }}>
                          <Text>
                            {' '}
                            {values.Loctn && (
                              <A
                                name="close"
                                color={THEME.colors.gray}
                                size={20}
                              />
                            )}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    onPress={(valu: any, details = null) => {
                      handleMapPress(valu, details, setFieldValue);
                    }}
                    autoFillOnNotFound={true}
                    debounce={200}
                    query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: 'en',
                    }}
                  />
                  {errors.Loctn && touched.Loctn && (
                    <Text style={{color: 'red'}}>{errors.Loctn}</Text>
                  )}

                  <Spacer />
                  <AuthInput
                    placeholder=""
                    value={values.desrptn}
                    descrptn={true}
                    multiline={true}
                    onChangeText={handleChange('desrptn')}
                    inputTitle={'Description'}
                    numberOfLines={4}
                    errorView={
                      errors.desrptn && touched.desrptn ? errors.desrptn : ''
                    }
                  />

                  <Spacer />
                  {errorfor == 'image' && errorMsg != '' && (
                    <Text style={{color: 'red', fontSize: RF(13)}}>
                      {errorMsg}
                    </Text>
                  )}
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {screenFlag == 'edit' ? renderOldPhotos() : renderPhotos()}

                    <TouchableOpacity
                      style={styles.uploadCont}
                      onPress={ImageUPload}>
                      <View style={styles.uploadItem}>
                        <A name="upload" size={24} />
                        <Text>Upload</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
            <FixedButton
              title={screenFlag == 'edit' ? 'Update Product' : 'ADD PRODUCT'}
              repotContStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
              onPress={() => {
                if (screenFlag == 'edit') {
                  handleSubmit();
                } else {
                  if (uploadedPhotos.length == 0) {
                    setErrorFor('image');
                    setErrorMsg('Photo is required for the Product!!');
                  } else {
                    handleSubmit();
                  }
                }
              }}
            />
          </>
        )}
      </Formik>
      <CustomBottomSheet
        data={countryArr}
        ref={sheetRef}
        onSelect={sheetData}
      />
      <LoadingAnimation visible={loader} />

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
export default AddShop;
