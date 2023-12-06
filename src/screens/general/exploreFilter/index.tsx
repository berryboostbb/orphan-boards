import React, {Component, useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Switch, Image} from 'react-native';
import MapView, {Circle, Marker, Callout, Overlay} from 'react-native-maps';
import {mapLocIcon} from '../../../assets';
import Header from '../../../shared/components/auth/header/header';
import {RF, THEME} from '../../../shared/exporter';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {styles} from './styles';
import {getDistance} from 'geolib';
import M from 'react-native-vector-icons/MaterialIcons';
import MapRadius from '../../../shared/components/common/mapradius';

const coords = [
  {latitude: 37.758222, longitude: -122.443096},
  {latitude: 40.677747, longitude: -122.433269},
  {latitude: 37.471516, longitude: -122.223197},
  {latitude: 37.562808, longitude: -122.349517},
  {latitude: 37.793204, longitude: -122.22012},
];

// latitude: 37.758913563255945
// longitude: -122.17694712450512
const ExploreFilter = ({navigation, route}: GenericNavigation) => {
  const mapRef: any = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [miletxt, setMilesTxt] = useState(0);
  const [onDgrEndLtlng, setOnDrgEndLtlng] = useState(0);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const animateToCurrentLocation = () => {
    mapRef?.current?.animateToRegion(
      {
        latitude: coords[0].latitude,
        longitude: coords[0].longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      1000,
    );
  };
  useEffect(() => {
    animateToCurrentLocation();
  }, [miletxt]);

  const handleSetMiles = (miles: any) => {
    setMilesTxt(miles);
    // updateNotificationsServ(miles);
  };

  const getDragableLat = (endLtlng: any) => {
    console.log(endLtlng);
    let val = getDistance(
      {latitude: coords[0].latitude, longitude: coords[0].longitude},
      {latitude: endLtlng.latitude, longitude: endLtlng.longitude},
    );
    console.log(val);
    setOnDrgEndLtlng(val);
    let resp = getDistance(
      {latitude: coords[0].latitude, longitude: coords[0].longitude},
      {latitude: endLtlng.latitude, longitude: endLtlng.longitude},
    );
    // first convert in km and then into miles
    let miles: any = ((resp / 1000) * 0.621371).toFixed(1);
    console.log('miles', miles);
    setMilesTxt(Number(miles));
  };

  return (
    <View style={styles.container}>
      <Header header={'Filters'} navigation={navigation} savBool={true} />

      <View style={styles.chilCont}>
        <Text style={[styles.text, {alignSelf: 'center'}]}>
          Display results only in specifi radius
        </Text>
        {/* <View style={styles.mapCon}> */}
        <MapRadius miles={miletxt} setMiles={handleSetMiles} />

        {/* </View> */}

        <View style={styles.bottom}>
          <Text style={styles.btmText}>Display favorite breaks only</Text>
          <Switch
            trackColor={{false: '#767577', true: THEME.colors.lightPrimary}}
            thumbColor={isEnabled ? THEME.colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
};

// const CustomFilterIcon = () => {
//   return (
//     <View style={styles.filCont}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           width: RF(14),
//         }}>
//         <M name="arrow-back-ios" size={15} color="white" />
//         <M name="arrow-forward-ios" size={15} color="white" />
//       </View>
//     </View>
//   );
// };

export default ExploreFilter;
