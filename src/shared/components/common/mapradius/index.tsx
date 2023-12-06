import React, {Component, forwardRef, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Circle, Marker, Callout, Overlay} from 'react-native-maps';
import {styles} from './style';
import {getDistance} from 'geolib';
import {RF, THEME} from '../../../exporter';
import M from 'react-native-vector-icons/MaterialIcons';
import RangePicker from '../../rangePicker';
import Geolocation from 'react-native-geolocation-service';
import {
  androidLocationEnabler,
  checkLocationPermission,
  requestLocationPermission,
} from '../../../../shared/utils/locationHelper';
import {toastMessage} from '../../../../shared/utils/constants';
import LoadingAnimation from '../../../../shared/components/loadingAnimation';
import {ActivityIndicator} from 'react-native-paper';

// create a component
const coords = [
  {latitude: 37.758222, longitude: -122.443096},
  {latitude: 40.677747, longitude: -122.433269},
  {latitude: 37.471516, longitude: -122.223197},
  {latitude: 37.562808, longitude: -122.349517},
  {latitude: 37.793204, longitude: -122.22012},
];

const spinnerData = [
  {value: 0},
  {value: 1},
  {value: 2},
  {value: 3},
  {value: 4},
  {value: 5},
  {value: 6},
  {value: 7},
  {value: 8},
  {value: 9},
  {value: 10},
  {value: 11},
  {value: 12},
  {value: 13},
  {value: 14},
  {value: 15},
  {value: 16},
  {value: 17},
  {value: 18},
  {value: 19},
  {value: 20},
  {value: 21},
  {value: 22},
  {value: 23},
  {value: 24},
  {value: 25},
  {value: 26},
  {value: 27},
  {value: 28},
  {value: 29},
  {value: 30},
  {value: 31},
  {value: 32},
  {value: 33},
  {value: 34},
  {value: 35},
  {value: 36},
  {value: 37},
  {value: 38},
  {value: 39},
  {value: 40},
  {value: 41},
  {value: 42},
  {value: 43},
  {value: 44},
  {value: 45},
  {value: 46},
  {value: 47},
  {value: 48},
  {value: 49},
  {value: 50},
  {value: 51},
  {value: 52},
  {value: 53},
  {value: 54},
  {value: 55},
  {value: 56},
  {value: 57},
  {value: 58},
  {value: 59},
  {value: 60},
  {value: 61},
  {value: 62},
  {value: 63},
  {value: 64},
  {value: 65},
  {value: 66},
  {value: 67},
  {value: 68},
  {value: 69},
  {value: 70},
  {value: 71},
  {value: 72},
  {value: 73},
  {value: 74},
  {value: 75},
  {value: 76},
  {value: 77},
  {value: 78},
  {value: 79},
  {value: 80},
  {value: 81},
  {value: 82},
  {value: 83},
  {value: 84},
  {value: 85},
  {value: 86},
  {value: 87},
  {value: 88},
  {value: 89},
  {value: 90},
  {value: 91},
  {value: 92},
  {value: 93},
  {value: 94},
  {value: 95},
  {value: 96},
  {value: 97},
  {value: 98},
  {value: 99},
];

const MapRadius = forwardRef(({miles, setMiles}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  //   console.log('refs', ref);

  const mapRef: any = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);
  //   const [miles, setMiles] = useState(0);
  const [onDgrEndLtlng, setOnDrgEndLtlng] = useState(0);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [currLocation, setcurrLocation] = useState({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    // if (permiss == 'granted') {
    await Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        let obj = {
          lat: latitude,
          lng: longitude,
        };
        animateToCurrentLocation(obj);
        setcurrLocation({
          lat: latitude,
          lng: longitude,
        });
        setLoading(false);
      },
      err => console.log(err),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // } else {
    //   toastMessage('error', 'Location not Enabled');
    // }
  };

  const animateToCurrentLocation = (obj: any) => {
    setTimeout(() => {
      mapRef?.current?.animateToRegion(
        {
          latitude: obj.lat,
          longitude: obj.lng,
          // latitudeDelta: 1,
          // longitudeDelta: 1,
          latitudeDelta: 0.00043,
          longitudeDelta: 0.00034,
        },
        1000,
      );
    }, 500);
  };
  // useEffect(() => {
  //   animateToCurrentLocation();
  // }, [miles]);

  useEffect(() => {
    const ind = spinnerData.findIndex(d => d.value === miles);

    getCurrentLocation();

    setSelectedIndex(ind);
  }, []);

  const getDragableLat = (endLtlng: any) => {
    console.log(endLtlng);
    let val = getDistance(
      {latitude: coords[0].latitude, longitude: coords[0].longitude},
      {latitude: endLtlng.latitude, longitude: endLtlng.longitude},
    );
    setOnDrgEndLtlng(val);
    let resp = getDistance(
      {latitude: coords[0].latitude, longitude: coords[0].longitude},
      {latitude: endLtlng.latitude, longitude: endLtlng.longitude},
    );

    let miles: any = ((resp / 1000) * 0.621371).toFixed(1);
    setMiles(Number(miles));
  };

  const radius = spinnerData[selectedIndex].value;

  return (
    <>
      {currLocation && // 👈 null and undefined check
      Object.keys(currLocation).length === 0 &&
      Object.getPrototypeOf(currLocation) === Object.prototype ? (
        <ActivityIndicator size="small" color={THEME.colors.lightPrimary} />
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            // initialRegion={{
            //   latitude: coords[0].latitude,
            //   longitude: coords[0].longitude,
            //   latitudeDelta: 0.00043,
            //   longitudeDelta: 0.00034,
            // }}
            showsUserLocation>
            <Circle
              key={(currLocation?.lat + currLocation?.lng).toString()}
              radius={radius}
              center={{
                latitude: currLocation?.lat,
                longitude: currLocation?.lng,
              }}
              strokeWidth={1}
              strokeColor={'white'}
              fillColor={'rgba(50, 130, 184, 0.5)'}></Circle>
            <Marker
              coordinate={{
                latitude: currLocation?.lat,
                longitude: currLocation?.lng,
              }}
            />
            {/* <View>
          <CustomFilterIcon />
        </View>
      </Marker> */}
          </MapView>
          <View>
            <RangePicker
              style={{marginTop: RF(30)}}
              data={spinnerData}
              onChange={res => {
                // res && calculateDelta(31.4847777, 74.313295, res * 7000);
                setSelectedIndex(res);
                setMiles(spinnerData[res].value);
              }}
              renderItem={({value}) => {
                return (
                  <View style={styles.fCOntainer}>
                    <View style={styles.lineContainer}>
                      {value % 5 == 0 ? (
                        <LargeLine
                          color={
                            value == selectedIndex
                              ? THEME.colors.lightPrimary
                              : 'rgba(0,0,0,0.2)'
                          }
                        />
                      ) : (
                        <SmallLine
                          color={
                            value == selectedIndex
                              ? THEME.colors.lightPrimary
                              : 'rgba(0,0,0,0.2)'
                          }
                        />
                      )}
                    </View>
                    {value % 5 == 0 && (
                      <Text
                        style={[
                          styles.milesText,
                          {
                            color:
                              value == selectedIndex
                                ? THEME.colors.lightPrimary
                                : 'rgba(0,0,0,0.2)',
                          },
                        ]}>
                        {value} miles
                      </Text>
                    )}
                  </View>
                );
              }}
              itemWidth={RF(14)}
            />
          </View>
        </>
      )}
    </>
  );
});
const CustomFilterIcon = () => {
  return (
    <View style={styles.filCont}>
      {/* <View
        style={{
          //   flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: RF(14),
          height: RF(14),
          borderRadius: RF(7),
        }}> */}
      {/* <M name="arrow-back-ios" size={15} color="white" />
        <M name="arrow-forward-ios" size={15} color="white" /> */}
      {/* </View> */}
    </View>
  );
};
// define your styles

//make this component available to the app
export default MapRadius;

const SmallLine = ({color}: any) => {
  return <View style={[styles.smallLine, {backgroundColor: color}]} />;
};
const LargeLine = ({color}: any) => {
  return <View style={[styles.largeLine, {backgroundColor: color}]} />;
};
