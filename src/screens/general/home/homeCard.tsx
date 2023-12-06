import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  arrowIcon,
  heartIcon,
  locIcon,
  oceanLogo,
  waveIcon,
} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Avatar from '../../../shared/components/common/avatar';
import {GST, RF, THEME} from '../../../shared/exporter';
import {STYLES} from './styles';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {ActivityIndicator} from 'react-native-paper';
// create a component
interface Props extends GenericNavigation {
  favrt: any;
  navigateHomeDetail: any;
  item: any;
  toggleFav: any;
}
const HomeCard = (props: Partial<Props>) => {
  const {favrt, navigateHomeDetail, item, navigation, toggleFav} = props;
  const {user}: any = useSelector((state: any) => state.root);
  const [Fav, setFav] = useState(false);
  const [imageLoading, setimageLoading] = useState(true);

  const navigateUserProfile = (obj: any) => {
    navigation?.navigate('Profile', {user: obj, prevScreen: 'homeReport'});
  };

  const _onLoadEnd = () => {
    setimageLoading(false);
  };

  return (
    <ImageBackground
      source={{uri: item?.images[0]}}
      imageStyle={{borderRadius: RF(5)}}
      onLoadStart={() => setimageLoading(true)}
      onLoadEnd={_onLoadEnd}
      style={[
        STYLES.boxShadow,
        {
          marginVertical: RF(5),
          height: RF(270),
          // width: RF(200),
        },
      ]}>
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0.6)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0.6)',
          'rgba(0, 0, 0, 0.6)',
        ]}
        style={STYLES.linearStyle}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => navigateHomeDetail(item)}>
          <View style={STYLES.headerChildCon}>
            <View>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => navigateUserProfile(item?.user)}>
                <Avatar
                  source={
                    item?.user?.profilePic && {uri: item?.user?.profilePic}
                  }
                />
                <View style={STYLES.textCont}>
                  <Text style={STYLES.usrname}>
                    {item?.user?.firstName + ' ' + item?.user?.lastName}
                  </Text>
                  <Text style={STYLES.timeAlignment}>
                    {moment(item?.createdAt).fromNow()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              onPress={() => {
                toggleFav(item);
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
          {imageLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : null}

          <View style={STYLES.footerCont}>
            <View>
              <View style={STYLES.footMain}>
                <View style={[STYLES.footWrap, {alignItems: 'center'}]}>
                  <View
                    style={[
                      STYLES.footWrap,
                      {paddingRight: RF(10), alignItems: 'center'},
                    ]}>
                    <Image
                      source={arrowIcon}
                      style={{
                        height: RF(10),
                        width: RF(5),
                        tintColor: THEME.colors.white,
                        marginRight: RF(4),
                      }}
                    />
                    <Text style={STYLES.footText}>Wave Height:</Text>
                    <Text style={[STYLES.footText, {paddingLeft: RF(2)}]}>
                      {item?.waveSize}
                    </Text>
                  </View>
                  <View style={[STYLES.footWrap, {alignItems: 'center'}]}>
                    <Image
                      source={waveIcon}
                      style={{
                        height: RF(8),
                        width: RF(8),
                        tintColor: THEME.colors.white,
                        marginRight: RF(4),
                      }}
                    />

                    <Text style={STYLES.footText}>Wave Form:</Text>
                    <Text style={[STYLES.footText, {paddingLeft: RF(2)}]}>
                      {item?.waveForm}
                    </Text>
                  </View>
                </View>
                <View style={STYLES.footDesMain}>
                  <Text style={GST.cardDescrptm} numberOfLines={1}>
                    {item?.title}
                  </Text>
                </View>
                <View style={[GST.cardLocCont, {alignItems: 'center'}]}>
                  <Image source={locIcon} style={GST.cardLocImg} />
                  <Text style={GST.cardLoctxt} numberOfLines={1}>
                    {item?.locationTitle}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

export default HomeCard;
