import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  Container: {
    flex: 1,
    // justifyContent: 'center',
  },
  childContainer: {
    flex: 2,

    paddingHorizontal: RF(20),
  },
  resetTxt: {
    fontSize: RF(16),
    fontFamily: THEME.fonts.primary,
    fontWeight: '400',
  },

  inputContainer: {
    flex: 0.95,
  },
});
