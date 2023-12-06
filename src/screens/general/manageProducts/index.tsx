import React, {Component, useEffect, useState, createRef, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList,
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
import {setUserProduct} from '../../../shared/redux/reducers/shopReducer';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import {GST, THEME} from '../../../shared/exporter';

const ManageProducts = ({navigation, route}: GenericNavigation) => {
  const {product} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [txt, setText] = useState('');
  const [slectCondtn, setSlectCondtn] = useState('');
  const {
    user: {
      user: {user},
    },
  } = useSelector((state: any) => state.root);
  const [userProducts, setuserProducts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [pagetn, setPage] = useState({
    page: 1,
    perPage: 10,
  });

  const getAllProducts = (page: any, perPage: any) => {
    setLoader(true);
    let query = `${user.id}?pageNo=${page}&perPage=${perPage}`;

    getAllShopService(query)
      .then(({data}) => {
        setuserProducts(data?.report?.data);

        dispatch(setUserProduct(data?.report?.data));
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        toastMessage('error', err?.response?.data?.message);
      });
  };
  const loaderMore = () => {
    const clonePage = {...pagetn};
    let obj = {
      ...clonePage,
      page: clonePage?.page + 1,
    };
    setPage(obj);
    let query = `${user.id}?pageNo=${obj.page}&perPage=${obj.perPage}`;

    getAllShopService(query)
      .then(({data}) => {
        let cloneArr = [...product?.userProductList];

        if (data?.report?.data.length > 0) {
          data?.report?.data?.map((element: any) => {
            let findind = cloneArr?.findIndex(
              (i: any) => i?._id == element?._id,
            );
            if (findind < 0) {
              cloneArr = [...cloneArr, element];
            }
          });
          setuserProducts(cloneArr);

          dispatch(setUserProduct(cloneArr));
        }

        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        toastMessage('error', err?.response?.data?.message);
      });
    // Alert.alert("zain")
  };
  useEffect(() => {
    getAllProducts(pagetn.page, pagetn.perPage);
  }, []);
  const onRefresh = () => {
    getAllProducts(1, 10);
  };

  let respData = product?.userProductList?.filter((item: any) =>
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
  return (
    <View style={styles.container}>
      <Header
        header="Manage Products"
        filterbool={false}
        value={txt}
        placeholder="Search for model "
        onChangeText={val => setText(val)}
        navigation={navigation}
        // onCstmPress={() =>
        //   navigation.navigate('ShopFilter', {
        //     saveFilters: saveFilters,
        //   })
        // }
      />
      <View style={styles.childCont}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.flatContainer}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          onEndReached={loaderMore}
          ListEmptyComponent={renderEmptyContainer}
          data={product?.userProductList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <Surfingboard
                  item={item}
                  navigation={navigation}
                  flag={'edit'}
                />
              </View>
            );
          }}
        />
        {/* <TouchableOpacity
          style={styles.addShop}
          onPress={() => navigation.navigate('addshop')}>
          <Text>
            <F name="plus" size={32} color={'white'} />
          </Text>
        </TouchableOpacity> */}
      </View>
      <LoadingAnimation visible={loader} />
    </View>
  );
};

export default ManageProducts;
