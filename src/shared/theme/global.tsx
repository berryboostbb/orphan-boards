import {StyleSheet} from 'react-native';
import {THEME} from './colors';
import {RF} from './responsive';
import {spacing} from './spacing';

export const GST = StyleSheet.create({
  ...spacing,
  wraper: {
    flex: 2,
  },
  genPadding: {
    paddingHorizontal: RF(20),
    // marginTop:RF(5)
  },
  marginY: {
    marginVertical: RF(10),
  },
  cardLocCont: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: RF(7),
  },
  cardLocImg: {
    height: RF(10),
    width: RF(9),
    tintColor: THEME.colors.white,
    marginRight: RF(4),
  },
  cardLoctxt: {
    fontSize: RF(14),
    color: THEME.colors.white,
    fontWeight: '400',
    fontFamily: THEME.fonts.primary,
  },
  cardDescrptm: {
    fontSize: RF(17),
    fontWeight: 'bold',
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.white,
    width: RF(200),
  },
  filButon: {
    width: RF(103),
    backgroundColor: THEME.colors.lightsky,
  },
  slectfilButon: {
    width: RF(103),
    backgroundColor: THEME.colors.darksky,
  },
});
