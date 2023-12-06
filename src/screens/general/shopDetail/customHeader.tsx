//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import M from 'react-native-vector-icons/MaterialIcons';
// create a component
const CustomHeader = ({navigation}: GenericNavigation) => {
  const [isTransparent, setIsTransparent] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {position: 'absolute', top: insets.top + RF(10)},
      ]}>
      <StatusBar
        barStyle={isTransparent ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.navCont}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <M
            name="arrow-back-ios"
            size={24}
            color={THEME.colors.lightPrimary}
          />
        </Pressable>
        {/* <Pressable style={styles.share}>
                    <M name="share" size={33} color={THEME.colors.blck} />
                </Pressable> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: RF(20),
    right: RF(0),
    left: RF(0),
    zIndex: 1,
  },
  navCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RF(20),
  },
  back: {
    backgroundColor: THEME.colors.white,
    height: RF(35),
    width: RF(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RF(5),
  },
  share: {
    height: RF(35),
    width: RF(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RF(5),
  },
});

//make this component available to the app
export default CustomHeader;
