//import liraries
import React, {Component, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapLocIcon} from '../../../../assets';
import {RF, THEME} from '../../../../shared/exporter';
import {styles} from '../styles';
import Geolocation from 'react-native-geolocation-service';
import {toastMessage} from '../../../../shared/utils/constants';
import {
  androidLocationEnabler,
  checkLocationPermission,
  requestLocationPermission,
} from '../../../../shared/utils/locationHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const coords = [
  {latitude: 37.758222, longitude: -122.443096},
  {latitude: 37.677747, longitude: -122.433269},
  {latitude: 37.471516, longitude: -122.223197},
  {latitude: 37.562808, longitude: -122.349517},
  {latitude: 37.793204, longitude: -122.22012},
];
const MapList = ({
  getMapResp,
  data,
  mapanimate,
  Hiderender,
}: {
  getMapResp: any;
  data: Array<any>;
  mapanimate: any;
  Hiderender: any;
}) => {
  const [curr, setcurr] = useState({});
  const [currFlag, setcurrFlag] = useState(true);
  const mapRef: any = useRef(null);
  // const [cordLoc,setCorLoc] = useState([])
  const animateToCurrentLocation = (obj: any) => {
    console.log('obj...', obj);

    if (obj) {
      mapRef?.current?.animateToRegion(
        {
          latitude: Number(obj?.lat),
          longitude: Number(obj?.lng),
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
        1000,
      );
    }

    // setTimeout(() => {

    // }, 500);
  };

  useEffect(() => {
    mapanimate &&
      setTimeout(() => {
        console.log('......', data[0]?.geometry?.location);

        animateToCurrentLocation(data[0]?.geometry?.location);
      }, 500);
    console.log('test render ');
  }, [data, Hiderender]);

  useEffect(() => {
    Hiderender &&
      mapRef?.current?.fitToSuppliedMarkers(
        data?.map(({place_id}: any) => place_id),
      );
    Hiderender && getDeviceLocation();
  }, []);
  //   useEffect(()=>{
  //     let cloneCor:any =[...cordLoc]
  //     if(data?.length > 0){
  //       data?.forEach((res)=>{
  //         let obj:any = {
  //           ...res,
  //           latitude:res.location?.coordinates[1],
  //           longitude:res.location?.coordinates[0]
  //         }
  //         console.log("object",obj);

  //         cloneCor.push(obj)
  //       })
  //     }
  //     setCorLoc(cloneCor)

  //   },[data])
  const getDeviceLocation = async () => {
    console.log('get devices locate......');

    if (Platform.OS === 'android') {
      const granted = await checkLocationPermission();

      if (granted) {
        try {
          const location = await androidLocationEnabler();
          if (location === 'enabled' || location === 'already-enabled') {
            getCurrentLocation();
          }
        } catch (err) {
          toastMessage(
            'error',
            'Location not Enabled',
            'Location must be enabled to proceed!',
          );
        }
      } else {
        const granted = await requestLocationPermission();
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          toastMessage(
            'error',
            'Permission not Granted',
            'Location Permission must be granted in order to proceed!',
          );
        }
      }
    } else if (Platform.OS === 'ios') {
      try {
        await getCurrentLocation();
      } catch (err) {
        toastMessage(
          'error',
          'Location not Enabled',
          'Location must be enabled to proceed!',
        );
      }

      // Do your success logic here
    }
  };
  const getCurrentLocation = async () => {
    // let permiss = await Geolocation.requestAuthorization('whenInUse');

    // if (permiss == 'granted') {
    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        let obj = {
          lat: latitude,
          lng: longitude,
        };

        animateToCurrentLocation(obj);
        setcurr(obj);
      },
      err => console.log(err),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // } else {
    //   toastMessage('error', 'Location not Enabled');
    // }
  };

  return (
    <View style={styles.mapContList}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={false}
        // region={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        <>
          {data.map((res: any, inx) => {
            console.log(res);

            return (
              <Marker
                key={inx}
                coordinate={{
                  latitude: res?.geometry?.location?.lat,
                  longitude: res?.geometry?.location?.lng,
                }}
                identifier={res?.place_id}
                onPress={() => getMapResp(res)}>
                <Image
                  source={mapLocIcon}
                  style={{height: RF(36), width: RF(24)}}
                />
              </Marker>
            );
          })}
        </>
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 35,
          right: 20,
          padding: 10,
          backgroundColor: THEME.colors.white,
          borderRadius: 5,
          elevation: 5,
        }}
        onPress={getDeviceLocation}>
        <Icon name="my-location" size={20} color={THEME.colors.lightPrimary} />
      </TouchableOpacity>
    </View>
  );
};

export default MapList;
