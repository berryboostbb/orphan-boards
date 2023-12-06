//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {oceanLogo, profileAvatarIcon} from '../../../../assets';
import {RF, THEME} from '../../../exporter';

interface Props {
  source: any;
  style: any;
}
const Avatar = (props: Partial<Props>) => {
  const [imageLoading, setimageLoading] = useState(true);

  const {source, style} = props;

  const _onLoadEnd = () => {
    console.log('hittt....');

    setimageLoading(false);
  };

  return (
    // <>
    //   {imageLoading ? (
    //     <View>
    //       <ActivityIndicator size="small" color={THEME.colors.lightPrimary} />
    //     </View>
    //   ) : (
    <FastImage
      source={source?.uri ? source : profileAvatarIcon}
      style={[styles.container, style && style]}
      onLoadStart={() => setimageLoading(true)}
      onLoadEnd={() => setimageLoading(false)}
    />
    // )}
    // </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: RF(40),
    width: RF(40),

    borderRadius: RF(100),
  },
});

//make this component available to the app
export default Avatar;
