import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {Overlay} from 'react-native-elements'
import { chatAnimation, LoaderAnimation } from '../../../assets';


const LoadingAnimation = ({
  visible,
}: {
  visible: boolean;
}) => {
  
  return (
    // overlayStyle={styles.loadingContainer}
    <>
      {visible ? (
        <Overlay isVisible={visible}   overlayStyle={styles.loadingContainer} >
          <View style={styles.animationView}>
            <LottieView
              source={LoaderAnimation}
              autoPlay
              loop
            />
          </View>
        
        </Overlay>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: 'rgba(42, 67, 78,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:100,
    elevation:1,
    ...StyleSheet.absoluteFillObject,
  },
  animationView: {
    alignItems: 'center',
    height: '15%',
    width: '100%',
    
  },
});

export default LoadingAnimation;
