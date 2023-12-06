import React, {Component, useEffect, useState, createRef, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  surf1Icon,
  surf2Icon,
  surf3Icon,
  surf4Icon,
  surfIcon,
} from '../../../assets';
import Header from '../../../shared/components/auth/header/header';
// import ShopModal from '../../../shared/components/modal';
import Surfingboard from '../../../shared/components/shop';
import F from 'react-native-vector-icons/Feather';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {styles} from './style';
import {getAllShopService, RF} from '../../../shared/exporter';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import {toastMessage} from '../../../shared/utils/constants';
import {useSelector, useDispatch} from 'react-redux';
import {setProduct} from '../../../shared/redux/reducers/shopReducer';
import ActionSheet from 'react-native-actions-sheet';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import {GST, THEME, GOOGLE_MAPS_APIKEY} from '../../../shared/exporter';
import useDebounce from '../../../shared/services/useDebounce';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import A from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Entypo from 'react-native-vector-icons/Entypo';

const Shop = ({navigation, route}: GenericNavigation) => {
  const {product} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [txt, setText] = useState('');
  const [slectCondtn, setSlectCondtn] = useState('');
  const [address, setAddress] = useState({
    description: '',
    state: '',
    city: '',
  });

  const [loctin, setLoction]: any = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [pagetn, setPage] = useState({
    page: 1,
    perPage: 20,
  });
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);
  const debouncedValue = useDebounce(txt, 500); // this value will pick real time value, but will change it's result only when it's seattled for 500ms

  const actionSheetRef = useRef(null);

  const saveFilters = () => {
    let valueToSend = '';
    if (slectCondtn == 'New') {
      valueToSend = 'new';
    } else if (slectCondtn == 'Like-New') {
      valueToSend = 'like new';
    } else if (slectCondtn == 'Used') {
      valueToSend = 'used';
    } else {
      valueToSend = '';
    }
    const filters = {
      condition: valueToSend,
    };
    getAllProducts(filters, loctin);
    (actionSheetRef as any)?.current?.hide();
  };
  const openFilterSheet = () => {
    (actionSheetRef as any)?.current?.show();
  };
  const setFilterSelection = (value: any) => {
    setSlectCondtn(value);
  };

  const handleSearch = (val: any) => {
    setText(val);
  };

  const getAllProducts = (filter: any, location: any) => {
    console.log('location....', location);

    setLoader(true);

    let query = null;

    if (txt !== '' || filter?.condition !== '' || loctin !== undefined) {
      query = `?pageNo=${1}&perPage=${20}&condition=${
        filter.condition
      }&search=${txt}&long=${loctin?.lng}&lat=${loctin?.lat}`;
    } else {
      query = `?pageNo=${pagetn.page}&perPage=${pagetn.perPage}&condition=${filter.condition}&search=${txt}&long=${loctin?.lng}&lat=${loctin?.lat}`;
    }

    getAllShopService(query)
      .then(({data}) => {
        // console.log('resss.....', data.report.data);

        dispatch(setProduct(data?.report?.data));
        setLoader(false);
        // setLoction(null);
        setText('');
        // setSlectCondtn('');
      })
      .catch(err => {
        setLoader(false);
        toastMessage('error', err?.response?.data?.message);
      });
  };
  const loaderMore = () => {
    console.log('hitting again');

    let valueToSend = '';
    if (slectCondtn == 'New') {
      valueToSend = 'new';
    } else if (slectCondtn == 'Like-New') {
      valueToSend = 'like new';
    } else if (slectCondtn == 'Used') {
      valueToSend = 'used';
    } else {
      valueToSend = '';
    }
    const filters = {
      condition: valueToSend,
    };

    if (txt == '' && slectCondtn == '' && loctin == null) {
      const clonePage = {...pagetn};
      let obj = {
        ...clonePage,
        page: clonePage?.page + 1,
      };
      setPage(obj);
      console.log('.....', obj);

      let query = `?pageNo=${obj.page}&perPage=${obj.perPage}&condition=${filters.condition}`;

      getAllShopService(query)
        .then(({data}) => {
          let cloneArr = [...product?.productList];

          if (data?.report?.data.length > 0) {
            data?.report?.data?.map((element: any) => {
              let findind = cloneArr?.findIndex(
                (i: any) => i?._id == element?._id,
              );
              if (findind < 0) {
                cloneArr = [...cloneArr, element];
              }
            });
            dispatch(setProduct(cloneArr));
          }

          setLoader(false);
        })
        .catch(err => {
          setLoader(false);
          toastMessage('error', err?.response?.data?.message);
        });
    }

    // Alert.alert("zain")
  };
  useEffect(() => {
    const filters = {
      condition: '',
    };
    getAllProducts(filters, null);
  }, []);
  const onSubmitSearch = () => {
    let valueToSend = '';
    if (slectCondtn == 'New') {
      valueToSend = 'new';
    } else if (slectCondtn == 'Like-New') {
      valueToSend = 'like new';
    } else if (slectCondtn == 'Used') {
      valueToSend = 'used';
    } else {
      valueToSend = '';
    }
    const filters = {
      condition: valueToSend,
    };
    getAllProducts(filters, loctin);
  };

  const onRefresh = React.useCallback(() => {
    setSlectCondtn('');
    const filters = {
      condition: '',
    };
    getAllProducts(filters, null);
    setLoction(null);
    setPage({
      page: 1,
      perPage: 20,
    });
  }, []);

  let respData = product?.productList?.filter((item: any) =>
    item?.title?.toLowerCase()?.match(txt && txt?.toLowerCase()),
  );
  const renderEmptyContainer = () => {
    if (!loader) {
      return (
        <View style={[styles.container, {marginTop: '25%', padding: 20}]}>
          <View style={styles.emptyList}>
            <Text style={styles.textBold}>No available Products</Text>
            <Text
              style={[styles.textGray, {textAlign: 'center', marginTop: 5}]}>
              Sorry no product found for this category. Please choose other
              categories.
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };
  const handleAddress = (detail: any, data: any) => {
    console.log('pressed', detail);

    const {geometry} = detail;

    setAddress({
      description: data?.description,
      state: data?.terms[data?.terms?.length - 1].value,
      city: data?.terms[data?.terms?.length - 2].value,
    });
    setLoction(geometry?.location);
    // field('Loctn', data?.description);
  };
  const clearFilters = () => {
    setLoction(null);
    setSlectCondtn('');
    const filters = {
      condition: '',
    };
    setPage({
      page: 1,
      perPage: 20,
    });
    getAllProducts(filters, null);
  };
  return (
    <View style={styles.container}>
      <Header
        imgbool={true}
        filterbool={true}
        value={txt}
        placeholder="Search for brand, model, shaper"
        // onChangeText={val => setText(val)}
        onChangeText={val => handleSearch(val)}
        onSubmitEditing={onSubmitSearch}
        // onCstmPress={() =>
        //   navigation.navigate('ShopFilter', {
        //     saveFilters: saveFilters,
        //   })
        // }
        onCstmPress={openFilterSheet}
      />

      <View style={styles.childCont}>
        <View style={[styles.inline, {justifyContent: 'space-between'}]}>
          <Text
            style={{
              marginLeft: RF(20),
              paddingVertical: RF(10),
              fontSize: RF(15),
              fontFamily: THEME.fonts.primary,
              fontWeight: 'bold',
              color: THEME.colors.blck,
            }}>
            Explore Products
          </Text>
          {(slectCondtn !== '' || loctin !== null) && (
            <TouchableOpacity
              style={[styles.inline, {marginRight: RF(20)}]}
              onPress={clearFilters}>
              <Entypo name="cross" size={16} />
              <Text style={{fontSize: 10}}>Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.flatContainer}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          // onEndReached={loaderMore}

          onMomentumScrollBegin={() => {
            setonEndReachedCalledDuringMomentum(false);
          }}
          onEndReached={() => {
            console.log('end...', onEndReachedCalledDuringMomentum);

            if (!onEndReachedCalledDuringMomentum) {
              loaderMore(); // LOAD MORE DATA
              setonEndReachedCalledDuringMomentum(true);
            }
          }}
          ListEmptyComponent={renderEmptyContainer}
          data={product.productList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <Surfingboard item={item} navigation={navigation} />
              </View>
            );
          }}
        />
        <TouchableOpacity
          style={styles.addShop}
          onPress={() => navigation.navigate('addshop')}>
          <Text>
            <F name="plus" size={32} color={'white'} />
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingAnimation visible={loader} />
      <FilterSheet
        ref={actionSheetRef}
        slectCondtn={slectCondtn}
        setFilterSelection={setFilterSelection}
        saveFilters={saveFilters}
        handleMapPress={handleAddress}
        address={address}
      />
    </View>
  );
};

export default Shop;

const FilterSheet = React.forwardRef(
  (
    {
      slectCondtn,
      setFilterSelection,
      saveFilters,
      handleMapPress,
      address,
    }: any,
    ref: any,
  ) => {
    const placesRef: any = useRef();
    console.log('addres...', address);

    return (
      <ActionSheet ref={ref} keyboardShouldPersistTaps="always">
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
          <View style={styles.MainContentContnr}>
            <View style={styles.filterCont}>
              <View style={styles.sheetTitleView}>
                <Text style={styles.filterText}>Select Conditions</Text>
                <TouchableOpacity onPress={saveFilters}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterCondtn}>
                <GeneralButton
                  title="New"
                  txtColor={[
                    slectCondtn != 'New' && {color: THEME.colors.lightPrimary},
                  ]}
                  cstyle={[
                    styles.filButon,
                    slectCondtn == 'New' && styles.slectfilButon,
                  ]}
                  onPress={() => setFilterSelection('New')}
                />
                <GeneralButton
                  title="Like-New"
                  txtColor={[
                    slectCondtn != 'Like-New' && {
                      color: THEME.colors.lightPrimary,
                    },
                  ]}
                  cstyle={[
                    styles.filButon,
                    slectCondtn == 'Like-New' && styles.slectfilButon,
                  ]}
                  onPress={() => setFilterSelection('Like-New')}
                />
                <GeneralButton
                  title="Used"
                  txtColor={[
                    slectCondtn != 'Used' && {color: THEME.colors.lightPrimary},
                  ]}
                  cstyle={[
                    styles.filButon,
                    slectCondtn == 'Used' && styles.slectfilButon,
                  ]}
                  onPress={() => setFilterSelection('Used')}
                />
              </View>
              <ScrollView
                keyboardShouldPersistTaps="always"
                scrollEnabled={false}>
                <Text style={[styles.filterText, {marginBottom: RF(20)}]}>
                  Select Address
                </Text>
                <GooglePlacesAutocomplete
                  keyboardShouldPersistTaps="handled"
                  // ref={placesRef}

                  // disableScroll={false}
                  fetchDetails
                  // disableScroll
                  filterReverseGeocodingByTypes={[
                    'locality',
                    'administrative_area_level_3',
                  ]}
                  placeholder="Address"
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                  }}
                  listViewDisplayed
                  renderDescription={row => row.description}
                  enableHighAccuracyLocation
                  onPress={(data, details) => handleMapPress(details, data)}
                  // onPress={(data, details = null) => {
                  //   let coordinates = details.geometry.location;
                  //   console.log(JSON.stringify(details)); //display details in console!
                  //   //sendCoordinates(coordinates, {data, details});
                  // }}
                  enablePoweredByContainer={false}
                  textInputProps={{
                    backgroundColor: THEME.colors.lightGray,
                    borderRadius: RF(15),
                    paddingLeft: RF(15),
                    marginHorizontal: RF(10),
                    placeholderTextColor: 'gray',
                    clearButtonMode: 'never',
                  }}
                  styles={{
                    // container: {flex: 0, zIndex: 1},
                    textInput: {
                      color: '#000',
                      width: RF(320),
                      backgroundColor: 'red',
                    },
                    listView: {
                      backgroundColor: 'red',
                      color: 'black',
                      zIndex: 10,
                    },
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ActionSheet>
    );
  },
);
