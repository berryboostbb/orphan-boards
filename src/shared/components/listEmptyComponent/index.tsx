import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {chatAnimation} from '../../../assets';
import {RF, THEME} from '../../exporter';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EmptyComponent = ({
  source,
  message,
}: Partial<{source: string; message: string}>) => {
  return (
    <>
      <View style={styles.loadingContainer}>
        <View style={styles.animationView}>
          <LottieView source={source} autoPlay loop />
        </View>
        <Text style={styles.notfound}>{message}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    // backgroundColor: 'rgba(42, 67, 78,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight / 2,
  },
  animationView: {
    width: '80%',
    height: '50%',
    // backgroundColor: 'red',
  },
  notfound: {
    fontSize: RF(15),
    fontFamily: THEME.fonts.primary,
    fontWeight: '500',
    color: THEME.colors.gray,
  },
});

export default EmptyComponent;
