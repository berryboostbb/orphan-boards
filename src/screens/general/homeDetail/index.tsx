import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Animated,
  StyleSheet,
  Text,
} from 'react-native';
import {BANNER_H} from './constant';
import TopNavigation from './topNavigation';
import Content from './content';
import {homeLogo, oceanLogo} from '../../../assets';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {addFavReportService, RF, THEME} from '../../../shared/exporter';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {styles} from './style';
import {toastMessage} from '../../../shared/utils/constants';
const HomeDetail = ({navigation, route}: GenericNavigation) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const {
    user: {
      user: {user},
    },
    report: {report, allReport},
  } = useSelector((state: any) => state.root);
  // console.log('aaalllllll......', allReport);

  const type = route?.params?.type;

  let item = {};

  if (type == 'home') {
    item = report?.find((i: any) => i?._id == route?.params?.item?._id);
  } else if (type == 'seemore') {
    item = allReport?.find((i: any) => i?._id == route?.params?.item?._id);
  }
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState(item?.title);
  const [contBool, setContBool] = useState(false);
  const callback = (val: boolean) => {
    setContBool(val);
  };

  return (
    <View style={{backgroundColor: THEME.colors.white}}>
      <TopNavigation
        title={title}
        scrollA={scrollA}
        navigation={navigation}
        callback={callback}
      />

      <Animated.ScrollView
        contentContainerStyle={{paddingBottom: RF(90)}}
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        nestedScrollEnabled={true}
        // scrollEventThrottle={16}
      >
        <View style={ustyles.bannerContainer}>
          <Animated.Image
            style={{
              height: BANNER_H,
              width: '200%',
              alignItems: 'center',
              justifyContent: 'center',

              transform: [
                {
                  translateY: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [
                      -BANNER_H / 2,
                      0,
                      BANNER_H * 0.75,
                      BANNER_H * 0.75,
                    ],
                  }),
                },
                {
                  scale: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [2, 1, 0.5, 0.5],
                  }),
                },
              ],
            }}
            source={{uri: item?.images[0]}}
          />
        </View>
        <View
          style={{
            backgroundColor: THEME.colors.white,
            borderRadius: RF(10),
            position: 'relative',
            top: RF(-9),
            minHeight: RF(455),
          }}>
          <Content
            contBool={contBool}
            item={item}
            scrollA={scrollA}
            navigation={navigation}
          />
        </View>
      </Animated.ScrollView>
      <View style={[styles.footerCont]}>
        <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
          <GeneralButton
            title="WRITE REPORT"
            onPress={() => navigation.navigate('AddReport', {item: item})}
          />
        </View>
      </View>
    </View>
  );
};

const ustyles = StyleSheet.create({
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default HomeDetail;
