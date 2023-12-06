import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {heartIcon, locIcon} from '../../../assets';
import Avatar from '../../../shared/components/common/avatar';
import {format as prettyFormat} from 'pretty-format';
import {
  addFavouriteInRedux,
  addFavReportService,
  GST,
  RF,
  THEME,
  weatherDataService,
} from '../../../shared/exporter';
import {styles} from './style';
import F from 'react-native-vector-icons/Feather';
import S from 'react-native-vector-icons/SimpleLineIcons';
import I from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {toastMessage} from '../../../shared/utils/constants';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import {useSelector, useDispatch} from 'react-redux';
import {setReport} from '../../../shared/redux/reducers/reportReducer';
const Content = (props: any) => {
  const {contBool, item, scrollA, navigation} = props;
  const {
    user: {
      user: {user},
    },
    report: {report},
  }: any = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [weather, setWeather] = useState({});
  const [curntContn, setCurntCondtn]: any = useState([]);
  const [Fav, setFav] = useState(true);

  let arr1 = [
    {
      propty: 'Rise',
      value: '07:10',
    },
    {
      propty: 'Set',
      value: '07:10',
    },
  ];

  const getWeatherDta = () => {
    setLoader(true);
    // let obj = {lat: 31.469692, lng: 74.272842};
    let obj = {
      lat: item?.location?.coordinates[1],
      lng: item?.location?.coordinates[0],
    };
    weatherDataService(obj)
      .then(({data}) => {
        // console.log('...........d............', data.data);
        console.log('condition//........', prettyFormat(data?.data));

        setCurntCondtn(data?.data?.current_condition);
        setWeather(data?.data?.weather[0]);
        setLoader(false);
      })
      .catch(err => {
        console.log(err?.response);

        setLoader(false);
        console.log('error', err?.response?.data?.data?.error[0]?.msg);

        // toastMessage("error",err?.response?.data?.data?.error[0]?.msg)
      });
  };

  const navigateUserProfile = (obj: any) => {
    navigation?.navigate('Profile', {user: obj});
  };
  useEffect(() => {
    getWeatherDta();
  }, []);
  // console.log(weather);
  let windGustMilesArr: any[] = [];

  (weather as any)?.hourly?.map((i: any) => {
    if (i?.WindGustMiles !== null) {
      windGustMilesArr.push(i?.WindGustMiles);
    }
  });
  var maxGust = Math.max(...windGustMilesArr);

  let arr = [
    {
      propty: 'RealFeelHigh',
      value: curntContn[0]?.FeelsLikeF ? curntContn[0]?.FeelsLikeF : '--',
    },
    {
      propty: 'RealFeel shade High',
      value: '--',
    },
    {
      propty: 'Max UV Index',
      value: curntContn[0]?.uvIndex ? curntContn[0]?.uvIndex : '--',
    },
    {
      propty: 'Average Wind',
      value:
        curntContn[0]?.windspeedMiles && curntContn[0]?.weatherDesc[0]?.value
          ? curntContn[0]?.windspeedMiles +
            ` (${curntContn[0]?.weatherDesc[0]?.value})`
          : '--',
    },
    {
      propty: 'Max Wind Gusts',
      value: windGustMilesArr.length > 0 ? maxGust : '--',
    },
    {
      propty: 'Average Cloud Cover',
      value: curntContn[0]?.cloudcover,
    },
  ];

  const favouriteReports = (favObj: any) => {
    const userDetail = user?.user?.user;
    let apiObj = {
      user: userDetail?.id,
      report: favObj?._id,
    };
    addFavReportService(apiObj)
      .then(({data}) => {
        addFavouriteInRedux(favObj);
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  let source = {uri: item?.user?.profilePic};
  // curntContn[0]

  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.headerChildCon}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() =>
              item?.user?._id == user?.id
                ? console.log('profile hit')
                : navigateUserProfile(item?.user)
            }>
            <Avatar source={source} style={styles.avastyle} />
            <View
              style={[
                styles.textCont,
                {flexDirection: 'row', alignItems: 'baseline'},
              ]}>
              <Text
                style={[
                  styles.usrname,
                  {
                    color: THEME.colors.blck,
                  },
                ]}>
                {item?.user?.firstName?.charAt(0)?.toUpperCase() +
                  item?.user?.firstName?.slice(1)?.toLowerCase() +
                  ' ' +
                  item?.user?.lastName}{' '}
                -{' '}
              </Text>
              <Text
                style={[
                  styles.timeAlignment,
                  {color: THEME.colors.lightPrimary},
                ]}>
                {moment(item?.createdAt).fromNow()}
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              favouriteReports(item);
            }}>
            <FastImage
              tintColor={
                item?.favorites?.includes(user?.user?.user?.id)
                  ? THEME.colors.red
                  : THEME.colors.lightSecondary1
              }
              source={heartIcon}
              style={{height: RF(18), width: RF(20), marginTop: RF(8)}}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.insetContainpnding}>
          {!contBool && (
            <View style={{marginTop: RF(15)}}>
              <Text
                style={[
                  GST.cardDescrptm,
                  {color: THEME.colors.blck, textAlign: 'justify'},
                ]}>
                {item?.title}
              </Text>
            </View>
          )}
          <View style={[GST.cardLocCont, {alignItems: 'flex-start'}]}>
            <Image
              source={locIcon}
              style={{
                tintColor: THEME.colors.lightPrimary,
                marginTop: RF(3),
                marginRight: RF(5),
              }}
            />
            <Text style={[GST.cardLoctxt, {color: THEME.colors.lightPrimary}]}>
              {item?.locationTitle}
            </Text>
          </View>
        </View>
        <View style={styles.descrtionContnr}>
          <View style={styles.nstddescptnContr}>
            <Text style={styles.descrtion}>{item?.description}</Text>
          </View>
          {/* -------------weather------------  */}

          <View style={styles.wthrPrcptnContnr}>
            <View style={styles.prcptnOneContnr}>
              <FastImage
                style={{height: RF(50), width: RF(40)}}
                source={{uri: curntContn[0]?.weatherIconUrl[0]?.value}}
              />
              {/* <F name="sun"  /> */}
              <Text style={styles.prcptn1text}>{curntContn[0]?.temp_C}</Text>
              <Text style={styles.prcptn1deg}>o</Text>
            </View>
            <View style={styles.prcptnSndContnr}>
              <S name="drop" style={styles.prcptn2Icon} />
              <Text style={styles.prcptn2text}>Perceptions:</Text>
              <Text style={styles.prcptn2text}>0%</Text>
            </View>
            <Text style={styles.prcptnDescrptn}>
              {curntContn[0]?.weatherDesc[0]?.value}
            </Text>
          </View>
          {arr.map((res, inx) => {
            return <DetailTable key={inx} {...res} />;
          })}
          <View style={styles.wthrgrid}>
            <View
              style={{
                borderRightWidth: RF(1),
                borderRightColor: THEME.colors.lightsecondary,
                width: '50%',
                paddingRight: RF(20),
              }}>
              <View
                style={[
                  styles.dtlTblCont,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <F name="sun" style={styles.prcptn1Icon} />
                <View>
                  <Text style={styles.ristme}>10 hrs</Text>
                  <Text style={styles.ristme}>51 mins</Text>
                </View>
              </View>
              {arr1.map((res, inx) => {
                return <DetailTable key={inx} {...res} />;
              })}
            </View>
            <View style={{width: '50%', paddingLeft: RF(20)}}>
              <View
                style={[
                  styles.dtlTblCont,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <I
                  name="moon-outline"
                  style={[styles.prcptn1Icon, {color: THEME.colors.blck}]}
                />
                <View>
                  <Text style={styles.ristme}>10 hrs</Text>
                  <Text style={styles.ristme}>51 mins</Text>
                </View>
              </View>
              {arr1.map((res, inx) => {
                return <DetailTable key={inx} {...res} />;
              })}
            </View>
          </View>
        </View>
      </View>
      {/* <LoadingAnimation visible={true} /> */}
    </>
  );
};
const DetailTable = ({propty, value}: any) => {
  return (
    <>
      <View style={styles.dtlTblCont}>
        <Text style={styles.dtlTitle}>{propty}</Text>
        <Text style={styles.dtlValue}>{value}</Text>
      </View>
    </>
  );
};

export default Content;
