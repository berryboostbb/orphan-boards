//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {arrowIcon, locIcon, waveIcon} from '../../../../assets';
import {GST, RF, THEME, favoriteBeachService} from '../../../exporter';
import GeneralButton from '../button/generalbutton';
import {styles} from './style';
import {getDistance} from 'geolib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {userReducer} from '../../../redux/reducers/resetReducer';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../../../shared/redux/reducers/userReducer';
import {colors} from 'react-native-elements';

// create a component
const MapCard = ({bottomPostition, navigation, item}: any) => {
  // console.log('iii...', item);
  const {
    user: {
      user: {user, token},
    },
  } = useSelector((state: any) => state.root);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  // console.log('token', user.favoritesBeaches);
  // console.log('beach', item.place_id);

  let places: any = [];

  console.log('ffff.......', user);

  if (user?.favoritesBeaches?.length > 0) {
    user?.favoritesBeaches?.map((b: any) => {
      places.push(b.place_id);
    });
  }

  const handleFavorite = () => {
    const params = {
      userInfo: user.id,
      payload: item,
    };
    setloading(true);
    favoriteBeachService(params)
      .then(res => {
        const userToset = {
          token: token,
          user: res.data.data.updatedUser,
        };
        dispatch(setUser(userToset));
      })
      .catch(err => {})
      .finally(() => setloading(false));
  };

  const getDragableLat = (endLtlng: any) => {
    //     console.log(endLtlng);
    //     let val = getDistance(
    //         { latitude: coords[0].latitude, longitude: coords[0].longitude },
    //         { latitude: endLtlng.latitude, longitude: endLtlng.longitude }
    //     );
    //     console.log(val);
    //     setOnDrgEndLtlng(val)
    //     let resp = getDistance({ latitude: coords[0].latitude, longitude: coords[0].longitude },{ latitude: endLtlng.latitude, longitude: endLtlng.longitude })
    //    let miles:any =   ((resp/1000)*0.621371).toFixed(1)
    //         console.log('miles',miles);
    //         setMilesTxt(Number(miles))
  };

  return (
    <View style={[styles.container, bottomPostition && bottomPostition]}>
      <View style={[styles.footMain, {flex: 0.5}]}>
        {/* <View style={{flexDirection:'row'}}>
                <View style={[styles.footWrap,{paddingRight:RF(10)}]}>
                <Image source={arrowIcon} style={{ height: RF(10), width: RF(5), tintColor: THEME.colors.lightPrimary,marginRight:RF(4) }} />
                <Text style={[styles.footText,{color:THEME.colors.blck}]}>Wave Height:</Text>
                <Text style={[styles.footText,{paddingLeft:RF(2),color:THEME.colors.blck}]}>{item?.waveSize}</Text>
                </View>
                <View style={[styles.footWrap]}>
                <Image source={waveIcon} style={{ height: RF(10), width: RF(8), tintColor: THEME.colors.lightPrimary,marginRight:RF(4) }} />
               
                <Text style={[styles.footText,{color:THEME.colors.blck}]}>Wave Form:</Text>
                <Text style={[styles.footText,{paddingLeft:RF(2),color:THEME.colors.blck}]}>{item?.waveForm}</Text>
                </View>
              </View> */}
        <View
          style={[
            styles.footDesMain,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <Text
            style={[styles.cardDescrptm, {color: THEME.colors.blck}]}
            numberOfLines={2}>
            {item?.formatted_address}
          </Text>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <TouchableOpacity onPress={handleFavorite}>
              <Ionicons
                name="heart"
                size={30}
                color={places.includes(item.place_id) ? 'red' : colors.black}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={GST.cardLocCont}>
          {/* <Image source={locIcon} style={[GST.cardLocImg,{tintColor:THEME.colors.lightPrimary}]} /> */}
          {/* <Text style={[GST.cardLoctxt,{color:THEME.colors.lightPrimary}]}>{item?.location?.miles} mi</Text> */}
        </View>
      </View>
      <View style={styles.buttCont}>
        <GeneralButton
          title="WRITE REPORT"
          onPress={() => navigation.navigate('AddReport', {item: item})}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default MapCard;
