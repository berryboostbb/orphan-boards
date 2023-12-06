import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../../shared/exporter';
import {styles} from '../style';
export const Notstyles = StyleSheet.create({
  ...styles,
  notCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RF(20),
    paddingVertical: RF(15),
    borderBottomWidth: RF(1),
    borderBottomColor: THEME.colors.lightsecondary,
  },
  notfytxt: {
    width: RF(210),
    fontSize: RF(14),
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.blck,
  },
});
