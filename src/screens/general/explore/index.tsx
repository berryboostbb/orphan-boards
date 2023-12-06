//import liraries
import React, {Component, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  FlatList,
  RefreshControl,
} from 'react-native';
import Header from '../../../shared/components/auth/header/header';
import {getallBeaches, GST, RF, THEME} from '../../../shared/exporter';
import {styles} from './styles';

import MapList from './map';
import MapCard from '../../../shared/components/common/mapCard';
import {listViewIcon, mapViewIcon} from '../../../assets';
import ListView from './listview';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
// import Geolocation from 'react-native-geolocation-service';
import {toastMessage} from '../../../shared/utils/constants';
import {useSelector, useDispatch} from 'react-redux';
// import { androidLocationEnabler, checkLocationPermission, requestLocationPermission } from '../../../shared/utils/locationHelper';
import LoadingAnimation from '../../../shared/components/loadingAnimation';

// create a component
const Explore = ({navigation, route}: GenericNavigation) => {
  const [mapDet, setMapDet] = useState(null);

  const [beachData, setBeachData]: any = useState([]);
  const [text, setText] = useState('beaches');
  const [mapanimate, setmapanimate] = React.useState(false);
  const [Hiderender, serrender] = React.useState(true);
  const [swtchlayot, setSwtchLayout] = useState('map');
  const [loaction, setLoaction]: any = useState(null);
  const [loader, setLoader] = useState(false);
  const mapRef: any = useRef(null);

  const dispatch = useDispatch();
  // const [beachToken, setBeachToken] = useState({
  //     pageNo: 1,
  //     perPage: 10
  // })

  const getMapResp = (obj: any) => {
    console.log('obj', obj);
    setMapDet(obj);
  };
  // const getCurrentLocation = async () => {
  //     let permiss = await Geolocation.requestAuthorization('whenInUse');

  //     if (permiss == 'granted') {
  //         await Geolocation.getCurrentPosition(
  //             info => {
  //                 const { latitude, longitude } = info.coords;
  //                 let obj = {
  //                     lat: latitude,
  //                     lng: longitude,
  //                 };
  //                 getAllReports(obj)

  //             },
  //             err => console.log(err),
  //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  //         );
  //     } else {
  //         toastMessage('error', 'Location not Enabled')

  //     }
  // };
  const getAllReports = (obj?: any) => {
    // setLoader(true)

    // setLoaction(obj)
    let query = text ? `&query=${text}` : '';
    getallBeaches(query)
      .then(({data}) => {
        console.log('return..............', data?.results);

        if (data?.results && data?.results?.length > 0) {
          setBeachData(data?.results);
          setmapanimate(true);
        }

        setLoader(false);
      })
      .catch((err: any) => {
        setLoader(false);
        toastMessage('error', err?.response?.data?.message);
      });
  };

  useEffect(() => {
    Hiderender && getAllReports();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    // getDeviceLocation()
  }, []);

  function rep(txt: any) {
    var str = ' beaches';
    str = setCharAt(str, 0, txt.trim());
    setText(str);
  }

  function setCharAt(str: any, index: any, chr: any) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  const handleSearch = (txt: any) => {
    rep(txt);
  };

  return (
    <View style={styles.container}>
      <Header
        imgbool={true}
        filterbool={true}
        placeholder="Search for Location"
        onBlur={() => getAllReports()}
        onChangeText={txt => handleSearch(txt)}
        onCstmPress={() => navigation.navigate('ExploreFilter')}
      />
      <View style={[GST.wraper]}>
        <Text
          style={{
            marginTop: RF(20),
            paddingVertical: RF(10),
            paddingLeft: RF(20),
            fontSize: RF(15),
            fontFamily: THEME.fonts.primary,
            fontWeight: 'bold',
            color: THEME.colors.blck,
          }}>
          Explore Locations
        </Text>

        <View style={styles.switchMapCont}>
          <TouchableOpacity
            onPress={() => {
              serrender(false);
              setSwtchLayout('list');
            }}>
            <View style={[styles.item, {marginRight: RF(10)}]}>
              <Image
                source={listViewIcon}
                style={
                  swtchlayot == 'list' && {tintColor: THEME.colors.lightPrimary}
                }
              />
              {swtchlayot == 'list' && (
                <Text
                  style={[
                    styles.text,
                    swtchlayot == 'list' && {color: THEME.colors.lightPrimary},
                  ]}>
                  List View
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSwtchLayout('map');
            }}>
            <View style={styles.item}>
              <Image
                source={mapViewIcon}
                style={
                  swtchlayot == 'map' && {tintColor: THEME.colors.lightPrimary}
                }
              />
              {swtchlayot == 'map' && (
                <Text
                  style={[
                    styles.text,
                    swtchlayot == 'map' && {color: THEME.colors.lightPrimary},
                  ]}>
                  Map View
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {swtchlayot == 'map' ? (
          <MapList
            Hiderender={Hiderender}
            mapanimate={mapanimate}
            getMapResp={getMapResp}
            data={beachData}
          />
        ) : (
          <FlatList
            data={beachData}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingTop: RF(60), paddingBottom: RF(20)}}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={onRefresh}
            //     />
            // }
            renderItem={({item}: any) => {
              return <MapCard navigation={navigation} item={item} />;
            }}></FlatList>
        )}
      </View>

      {swtchlayot == 'map' && mapDet && (
        <MapCard
          item={mapDet}
          navigation={navigation}
          bottomPostition={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
      <LoadingAnimation visible={loader} />
    </View>
  );
};
export default Explore;
