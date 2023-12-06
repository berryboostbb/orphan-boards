import React, {ReactChild} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GenericNavigation} from '../../models/types/interfaces';
import {THEME} from '../../theme/colors';
import {RF} from '../../theme/responsive';
import HeaderLeft from '../HeaderLeft';

interface Props {
  navigation?: GenericNavigation | any;
  headerTitle?: string;
  children: ReactChild;
}

const Wrapper = ({navigation, headerTitle, children}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}>
        {headerTitle ? (
          <HeaderLeft navigation={navigation} title={headerTitle} />
        ) : null}
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: RF(10),
  },
});

export default Wrapper;
