import React, {Component, useState} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {locIcon, surf1Icon, surf4Icon} from '../../../assets';
import {GST, RF, THEME} from '../../../shared/exporter';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import CustomHeader from './customHeader';
import {Styles} from './style';
import Avatar from '../../../shared/components/common/avatar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FixedButton from '../../../shared/components/common/fixedButton';
import {Image} from 'react-native-elements/dist/image/Image';
import {useSelector} from 'react-redux';
import {colors} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from '../homeDetail/style';
const ShopDetail = ({navigation, route}: GenericNavigation) => {
  const [isTransparent, setIsTransparent] = useState(false);
  const shopDetail = route?.params?.shopDetail;
  const screenFlag = route?.params?.flag;

  const {
    user: {
      user: {user},
    },
  }: any = useSelector((state: any) => state.root);

  const [active, setActive] = useState(0);
  const insets = useSafeAreaInsets();
  const change = (nativeEvent: any) => {
    console.log(nativeEvent);

    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== active) {
        setActive(slide);
      }
    }
  };
  console.log('ssssshhhhhh....deeeeeee.......', shopDetail);
  let source = {uri: shopDetail?.user?.profilePic};

  let imgAar = [{img: surf4Icon}, {img: surf1Icon}, {img: surf1Icon}];

  return (
    <View style={Styles.container}>
      <CustomHeader navigation={navigation} />
      <View style={Styles.childCont}>
        <View style={Styles.header}>
          <ScrollView
            onScroll={({nativeEvent}) => change(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal={true}
            scrollEventThrottle={200}>
            <View
              style={[
                {
                  paddingTop: insets.top,
                  paddingBottom: RF(5),
                  flexDirection: 'row',
                },
              ]}>
              {shopDetail?.images?.map((imgs: any, inx: number) => {
                return (
                  <FastImage
                    source={imgs && {uri: imgs}}
                    style={Styles.img}
                    resizeMode={'contain'}
                    key={inx + '1'}
                  />
                );
              })}
            </View>
          </ScrollView>
          <View style={Styles.wrapDot}>
            {shopDetail?.images?.length > 1 &&
              imgAar?.map((e: any, index: number) => (
                <View
                  key={e.id}
                  style={active === index ? Styles.dotActive : Styles.dot}
                />
              ))}
          </View>
        </View>
        <View style={Styles.content}>
          <ScrollView contentContainerStyle={{paddingBottom: RF(42)}}>
            <View
              style={{
                paddingVertical: RF(24),
                paddingHorizontal: RF(15),
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    shopDetail?.user?._id == user?.id
                      ? console.log('ownProfile')
                      : navigation.navigate('Profile', {
                          user: shopDetail?.user,
                        });
                  }}
                  style={{flexDirection: 'row'}}>
                  <Avatar source={source} style={Styles.avastyle} />
                  <View
                    style={[
                      Styles.textCont,
                      {
                        flexDirection: 'row',
                        alignItems: 'baseline',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      style={[
                        {
                          color: THEME.colors.blck,
                          fontSize: RF(14),
                          fontFamily: THEME.fonts.primary,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {shopDetail?.user?.firstName?.charAt(0)?.toUpperCase() +
                        shopDetail?.user?.firstName?.slice(1)?.toLowerCase() +
                        ' ' +
                        shopDetail?.user?.lastName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={Styles.insetContainpnding}>
                {
                  <View style={{marginTop: RF(15)}}>
                    <Text
                      style={[
                        GST.cardDescrptm,
                        {color: THEME.colors.blck, textAlign: 'justify'},
                      ]}>
                      {shopDetail?.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontWeight: '500'}}>
                        ${shopDetail?.price}
                      </Text>
                      {shopDetail?.sold && (
                        <View style={Styles.soldOut}>
                          <Text style={{color: THEME.colors.white}}>
                            Sold Out
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                }
                <View style={[GST.cardLocCont, {alignItems: 'flex-start'}]}>
                  <Image
                    source={locIcon}
                    style={[
                      GST.cardLocImg,
                      {
                        tintColor: THEME.colors.lightPrimary,
                        marginTop: RF(5),
                        marginRight: RF(5),
                      },
                    ]}
                  />
                  <Text
                    style={[
                      GST.cardLoctxt,
                      {color: THEME.colors.lightPrimary},
                    ]}>
                    {shopDetail?.address?.description}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingHorizontal: RF(6),
                  paddingTop: RF(6),
                  marginTop: RF(15),
                }}>
                Condition:{' '}
                <Text
                  style={{
                    fontWeight: 'normal',
                  }}>
                  {shopDetail?.condition}
                </Text>
              </Text>
              <View style={Styles.descrtionContnr}>
                <View style={Styles.nstddescptnContr}>
                  <Text style={[Styles.descrtion]}>
                    {shopDetail?.description}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      {shopDetail?.user?._id == user?.id ? null : (
        <FixedButton
          title="SEND MESSAGE"
          onPress={() => navigation.navigate('chat', {item: shopDetail?.user})}
        />
      )}
    </View>
  );
};
export default ShopDetail;
