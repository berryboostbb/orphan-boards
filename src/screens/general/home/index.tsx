import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Alert,
  Image,
  RefreshControl,
  Pressable,
} from 'react-native';
import Header from '../../../shared/components/auth/header/header';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {STYLES} from './styles';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  addFavouriteInRedux,
  addFavReportService,
  getLatestReportService,
  GST,
  RF,
  THEME,
} from '../../../shared/exporter';
import useDebounce from '../../../shared/services/useDebounce';
import {
  heartIcon,
  mountainIcon,
  oceanLogo,
  rightArrowIcon,
  actorIcon,
  capAvtarIcon,
  carAvtarIcon,
  chatAnimation,
  menAvtarIcon,
  tblAvtarIcon,
} from '../../../assets';

import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Avatar from '../../../shared/components/common/avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import HomeCard from './homeCard';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import {toastMessage} from '../../../shared/utils/constants';
import {setReport} from '../../../shared/redux/reducers/reportReducer';
import EmptyComponent from '../../../shared/components/listEmptyComponent';
import {format as prettyFormat} from 'pretty-format';

// const TodayData = [...Array(20).keys()].map((_, i) => {
// return
// });
export default function Home({navigation, route}: GenericNavigation) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {
    user,
    report: {report},
  }: any = useSelector((state: any) => state.root);
  const [homeArr, setHomeArr] = useState([]);
  const [text, setText]: any = useState('');
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const debouncedValue = useDebounce(text, 500); // this value will pick real time value, but will change it's result only when it's seattled for 500ms

  const [pagetn, setPage] = useState({
    page: 1,
    perPage: 10,
  });

  let onEndReachedCalledDuringMomentum = true;

  const navigateHomeDetail = (item: any) => {
    navigation.navigate('Detail', {
      item: item,
      type: 'home',
    });
  };
  const handleSearch = (val: any) => {
    setText(val);
  };
  const onSubmitSearch = async () => {
    // await setPage({
    //   page: 1,
    //   perPage: 10,
    // });
    getLatestReport();
  };
  // useEffect(() => {
  //   getLatestReport();
  // }, [debouncedValue]);

  const getLatestReport = () => {
    setLoader(true);
    let query = `?pageNo=${1}&perPage=${10}&search=${text}`;
    getLatestReportService(query)
      .then(({data}) => {
        // console.log('ressss.......', data?.data);

        dispatch(setReport(data?.data));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    getLatestReport();
  }, []);

  const loaderMore = () => {
    const clonePage = {...pagetn};
    if (text == '') {
      let obj = {
        ...clonePage,
        page: clonePage?.page + 1,
      };
      setPage(obj);
      console.log('ppp....', obj);

      let query = `?pageNo=${obj.page}&perPage=${obj.perPage}`;

      getLatestReportService(query)
        .then(({data}) => {
          let cloneArr: any = [...report];
          if (data?.data && data?.data?.length > 0) {
            data?.data?.forEach((element: any) => {
              let findind = cloneArr?.findIndex(
                (i: any) => i?._id == element?._id,
              );
              if (findind < 0) {
                cloneArr = [...cloneArr, element];
              }
            });

            // setHomeArr(cloneArr);
            dispatch(setReport(cloneArr));
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
  const favouriteReports = (favObj: any) => {
    let cloneHome: any = [...report];
    const userDetail = user?.user?.user;
    let apiObj = {
      user: userDetail?.id,
      report: favObj?._id,
    };
    addFavReportService(apiObj)
      .then(({data}) => {
        addFavouriteInRedux(favObj);

        // dispatch(setReport(cloneHome))
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  const onRefresh = React.useCallback(() => {
    getLatestReport();
  }, []);

  // console.log('report',report);
  let respData = report?.filter((item: any) =>
    text
      ? item?.title?.toLowerCase()?.match(text && text?.toLowerCase())
      : item,
  );
  return (
    <View style={[STYLES.Container]}>
      <Header
        imgbool={true}
        placeholder={'Search Reports'}
        value={text}
        navigation={navigation}
        onChangeText={val => handleSearch(val)}
        onSubmitEditing={() => onSubmitSearch()}
      />

      <View style={[GST.wraper, GST.genPadding]}>
        <View style={STYLES.latestReportCont}>
          <Text style={STYLES.latestText}>Latest Reports</Text>
          <Pressable
            onPress={() => navigation.navigate('SeeMore')}
            style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={STYLES.latestMoreNews}>See More News</Text>
            <Image source={rightArrowIcon} />
          </Pressable>
        </View>
        <View>
          <FlatList
            data={report}
            style={{marginBottom: RF(50)}}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
            ListEmptyComponent={() => (
              <EmptyComponent
                source={chatAnimation}
                message={'No latest reports found.'}
              />
            )}
            initialNumToRender={10}
            onEndReached={({distanceFromEnd}) => {
              if (!onEndReachedCalledDuringMomentum) {
                loaderMore();
                onEndReachedCalledDuringMomentum = true;
              }
            }}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <HomeCard
                  key={index}
                  item={item}
                  toggleFav={favouriteReports}
                  navigation={navigation}
                  navigateHomeDetail={navigateHomeDetail}
                />
              );
            }}
          />
        </View>
      </View>
      <LoadingAnimation visible={loader} />
    </View>
  );
}
