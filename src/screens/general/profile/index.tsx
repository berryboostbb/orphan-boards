import React, {Component, useState, useEffect} from 'react';
import {View, Text, Pressable, RefreshControl} from 'react-native';
import {ProflieStyles} from './style';
import M from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RF, THEME, getAllShopService} from '../../../shared/exporter';
import Avatar from '../../../shared/components/common/avatar';
import FixedButton from '../../../shared/components/common/fixedButton';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {FlatList} from 'react-native-gesture-handler';
import {surf2Icon, surfIcon} from '../../../assets';
import Surfingboard from '../../../shared/components/shop';

import {setUserProduct} from '../../../shared/redux/reducers/shopReducer';
import {toastMessage} from '../../../shared/utils/constants';
import {useDispatch, useSelector} from 'react-redux';

// create a component
const Profile = ({navigation, route}: GenericNavigation) => {
  const insets = useSafeAreaInsets();
  const reportUser = route?.params?.user;
  const prevScreen = route?.params?.prevScreen;
  const {
    user: {
      user: {user},
    },
  }: any = useSelector((state: any) => state.root);
  console.log('uu...', user);
  const dispatch = useDispatch();
  const [pagetn, setPage] = useState({
    page: 1,
    perPage: 10,
  });
  const [loader, setLoader] = useState(false);
  const {product} = useSelector((state: any) => state.root);

  const getAllProducts = () => {
    setLoader(true);
    let query = `${reportUser?._id}?pageNo=${pagetn.page}&perPage=${pagetn.perPage}`;

    getAllShopService(query)
      .then(({data}) => {
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
    let query = `${reportUser._id}?pageNo=${obj.page}&perPage=${obj.perPage}`;

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
    getAllProducts();
  }, []);
  const onRefresh = () => {
    getAllProducts();
  };
  const renderEmptyContainer = () => {
    if (!loader) {
      return (
        <View
          style={[ProflieStyles.container, {marginTop: '25%', padding: 20}]}>
          <View style={ProflieStyles.emptyList}>
            <Text style={ProflieStyles.textBold}>No available Products</Text>
            <Text
              style={[
                ProflieStyles.textGray,
                {textAlign: 'center', marginTop: 5},
              ]}>
              Sorry no product found for this category. Please choose other
              categories.
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const source = {uri: reportUser?.profilePic};
  return (
    <View style={[ProflieStyles.container, {paddingTop: insets.top}]}>
      <View style={ProflieStyles.header}>
        <View style={ProflieStyles.left}>
          <Pressable onPress={() => navigation.goBack()}>
            <M
              name="arrow-back-ios"
              size={25}
              color={THEME.colors.lightPrimary}
            />
          </Pressable>
        </View>
        <View style={ProflieStyles.center}>
          <Avatar style={ProflieStyles.logo} source={source} />
          <Text style={ProflieStyles.name}>
            {reportUser?.firstName?.charAt(0)?.toUpperCase() +
              reportUser?.firstName?.slice(1)?.toLowerCase() +
              ' ' +
              reportUser?.lastName}
          </Text>
          <Text style={ProflieStyles.email}>{reportUser?.email}</Text>
        </View>
      </View>
      <View style={ProflieStyles.content}>
        <Text
          style={[ProflieStyles.name, {marginLeft: RF(10), paddingBottom: 0}]}>
          {reportUser?.firstName}'s Products
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={product?.userProductList}
          contentContainerStyle={ProflieStyles.flatContainer}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={renderEmptyContainer}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          onEndReached={loaderMore}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            return (
              <Surfingboard
                item={item}
                navigation={navigation}
                contStyle={ProflieStyles.itemCon}
                cusstyle={ProflieStyles.item}
              />
            );
          }}
        />
      </View>
      {/* {prevScreen == 'homeReport' ? null : ( */}
      {reportUser?._id == user?.id ? null : (
        <FixedButton
          title="SEND MESSAGE"
          onPress={() => navigation.navigate('chat', {item: reportUser})}
        />
      )}

      {/* )} */}
    </View>
  );
};

// define your styles

//make this component available to the app
export default Profile;
