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
  getAllReportService,
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
  chatAnimation,
} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Avatar from '../../../shared/components/common/avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import HomeCard from './homeCard';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import {toastMessage} from '../../../shared/utils/constants';
import {
  setReport,
  setAllReport,
} from '../../../shared/redux/reducers/reportReducer';
import EmptyComponent from '../../../shared/components/listEmptyComponent';

// const TodayData = [...Array(20).keys()].map((_, i) => {
// return
// });
export default function SeeMore({navigation, route}: GenericNavigation) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {
    user,
    report: {allReport},
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
      type: 'seemore',
    });
  };
  const handleSearch = (val: any) => {
    setText(val);
  };
  const onSubmitSearch = () => {
    getLatestReport();
  };
  // useEffect(() => {
  //   getLatestReport();
  // }, [debouncedValue]);

  const getLatestReport = () => {
    setLoader(true);

    let query = `?pageNo=${1}&perPage=${10}&search=${text}`;
    getAllReportService(query)
      .then(({data}) => {
        // console.log('first....ddd....', data?.data);

        dispatch(setAllReport(data?.data));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    getLatestReport();
  }, []);
  console.log();

  const loaderMore = () => {
    const clonePage = {...pagetn};
    let obj = {
      ...clonePage,
      page: clonePage?.page + 1,
    };

    setPage(obj);
    let query = `?pageNo=${obj.page}&perPage=${obj.perPage}`;
    if (text == '') {
      getAllReportService(query)
        .then(({data}) => {
          // console.log('more.....ddd....', data?.data);
          let cloneArr: any = [...allReport];
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
            dispatch(setAllReport(cloneArr));
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
    let cloneHome: any = [...allReport];
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
  let respData = allReport?.filter((item: any) =>
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
          <Text style={STYLES.latestText}>All Reports</Text>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={STYLES.latestMoreNews}>Latest Reports</Text>
            <Image source={rightArrowIcon} />
          </Pressable>
        </View>
        <View>
          <FlatList
            data={allReport}
            style={{marginBottom: RF(50)}}
            ListEmptyComponent={() => (
              <EmptyComponent
                source={chatAnimation}
                message={'No reports found.'}
              />
            )}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
            onEndReachedThreshold={0.5}
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
