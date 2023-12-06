import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {RF, THEME} from '../../../shared/exporter';
import {TOPNAVI_H, BANNER_H} from './constant';
import M from 'react-native-vector-icons/MaterialIcons';
const TopNavigation = (props: any) => {
  const safeArea = useSafeArea();

  const {title, scrollA, callback, navigation} = props;
  const isFloating = !!scrollA;
  const [isTransparent, setTransparent] = useState(isFloating);
  //   console.log("istransparent",isTransparent);

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener((a: any) => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top - 23;
      if (isTransparent !== a.value < topNaviOffset) {
        callback(!isTransparent);
        setTransparent(!isTransparent);
      } else {
        callback(!isTransparent);
      }
    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View
        style={(styles as any).container(safeArea, isFloating, isTransparent)}>
        <Pressable
          style={(styles as any).left}
          onPress={() => navigation.goBack()}>
          <Text>
            {' '}
            <M
              name="arrow-back-ios"
              size={24}
              color={THEME.colors.lightPrimary}
            />
          </Text>
        </Pressable>
        <Text
          style={(styles as any).title(isTransparent)}
          numberOfLines={1}
          ellipsizeMode="tail">
          {!isTransparent && title}
        </Text>
        {/* <Pressable style={[(styles as any).left,{backgroundColor:'transparent'}]} onPress={() => console.log("click")
      } ><Text> <M name="share" size={24} color={isTransparent ? THEME.colors.white:THEME.colors.lightPrimary} /></Text></Pressable> */}
      </View>
    </>
  );
};

const styles = {
  container: (safeArea: any, isFloating: any, isTransparent: any) => ({
    paddingTop: safeArea.top,
    marginBottom: isFloating ? -TOPNAVI_H - safeArea.top : 0,
    height: TOPNAVI_H + safeArea.top,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RF(18),
    shadowOffset: {y: 0},
    backgroundColor: isTransparent ? 'transparent' : THEME.colors.white,
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    zIndex: 100,
  }),
  title: (isTransparent: any) => ({
    textAlign: 'center',
    fontSize: RF(20),
    fontFamily: THEME.fonts.primary,
    fontWeight: '700',
    width: RF(190),
    color: isTransparent ? '#FFF' : THEME.colors.lightPrimary,
  }),
  left: {
    backgroundColor: THEME.colors.white,
    height: RF(35),
    width: RF(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RF(5),
  },
};

export default TopNavigation;
