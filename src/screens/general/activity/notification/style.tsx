import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../../shared/exporter';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  notfctnItem: {
    paddingHorizontal: RF(20),
    paddingVertical: RF(10),
    flexDirection: 'row',
    borderBottomColor: THEME.colors.lightSecondary1,
    borderBottomWidth: RF(2),
  },
  descrptn: {
    paddingHorizontal: RF(10),
    justifyContent: 'center',
  },
  avtar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: RF(12),
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.darksecondary,
    paddingTop: RF(10),
  },
  txt: {
    fontSize: RF(14),
    fontFamily: THEME.fonts.primary,
    fontWeight: 'normal',
    paddingRight: RF(20),
  },
});
