import {StyleSheet} from 'react-native';
import {STYLES} from '../../../../screens/general/home/styles';
import {GST, RF, THEME} from '../../../exporter';
export const styles = StyleSheet.create({
  ...STYLES,
  ...GST,
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: THEME.colors.white,
    height: RF(170),
    marginHorizontal: RF(20),
    marginVertical: RF(5),
    borderRadius: RF(10),
    paddingHorizontal: RF(10),
    // paddingVertical:RF(20)
  },
  buttCont: {
    width: '100%',
    flex: 0.3,
    paddingTop: RF(20),
  },
  footWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  footText: {
    fontFamily: THEME.fonts.primary,
    fontSize: RF(11),
    color: THEME.colors.blck,
  },
});
