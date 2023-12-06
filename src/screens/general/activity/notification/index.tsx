//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  actorIcon,
  capAvtarIcon,
  carAvtarIcon,
  menAvtarIcon,
  tblAvtarIcon,
  chatAnimation,
} from '../../../../assets';
import Avatar from '../../../../shared/components/common/avatar';
import {
  GST,
  RF,
  THEME,
  getNoticationList,
  navigationRef,
} from '../../../../shared/exporter';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {toastMessage} from '../../../../shared/utils/constants';
import LoadingAnimation from '../../../../shared/components/loadingAnimation';
import EmptyComponent from '../../../../shared/components/listEmptyComponent';
import moment from 'moment';

// create a component
const Notfication = props => {
  const [notificationList, setnotificationList] = useState([]);
  const [loader, setLoader] = useState(false);
  const {navigation} = props;

  const {
    user: {
      user: {user},
    },
  } = useSelector((state: any) => state.root);

  useEffect(() => {
    getAllNotificationServe();
  }, []);

  const getAllNotificationServe = () => {
    setLoader(true);

    getNoticationList(user?.id)
      .then(({data}) => {
        setnotificationList(data?.data);
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const onRefresh = React.useCallback(() => {
    getAllNotificationServe();
  }, []);

  const navigateToScreen = (item: any) => {
    if (item?.type == 'ProductsUpload') {
      navigation.navigate('shopDetail', {shopDetail: item?.content});
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <LoadingAnimation visible={loader} />
      ) : (
        <FlatList
          data={notificationList}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <EmptyComponent
              source={chatAnimation}
              message={'No notification found.'}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.notfctnItem}
                onPress={() => navigateToScreen(item)}>
                <View style={styles.avtar}>
                  <Avatar source={{uri: item?.content?.images[0]}} />
                </View>
                <View style={styles.descrptn}>
                  <Text numberOfLines={2} style={styles.txt}>
                    {item.text}
                  </Text>
                  <Text style={styles.time}>
                    {moment(item?.createdAt).fromNow()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

// define your styles

//make this component available to the app
export default Notfication;
