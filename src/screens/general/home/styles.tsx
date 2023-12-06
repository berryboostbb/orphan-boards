import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
export const STYLES = StyleSheet.create({
  Container: {
    flex: 1,
    // justifyContent: 'center',
  },
  latestReportCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: RF(10),
    alignItems: 'baseline',
  },
  latestText: {
    fontSize: RF(15),
    fontFamily: THEME.fonts.primary,
    fontWeight: 'bold',
    color: THEME.colors.blck,
  },
  latestMoreNews: {
    fontWeight: '700',
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.lightPrimary,
    fontSize: RF(12),
  },
  linearStyle: {
    width: '100%',
    height: '100%',
    borderRadius: RF(5),
    paddingVertical: RF(15),
    paddingHorizontal: RF(15),
  },
  headerChildCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.8,
  },
  textCont: {marginLeft: RF(10), paddingTop: RF(5)},
  usrname: {
    fontSize: RF(13),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.white,
  },
  timeAlignment: {
    fontSize: RF(10),
    fontWeight: '600',
    fontFamily: THEME.fonts.primary,
    paddingTop: RF(2),
    color: THEME.colors.white,
  },
  footerCont: {
    flex: 0.4,
  },
  footMain: {
    flexDirection: 'column',
  },
  footWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  footText: {
    fontFamily: THEME.fonts.primary,
    fontSize: RF(11),
    color: THEME.colors.white,
  },
  footDesMain: {
    width: RF(280),
    marginTop: RF(5),
  },
  footDescrptn: {
    fontSize: RF(17),
    fontWeight: 'bold',
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.white,
  },
  fotLocMain: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: RF(7),
  },
  footLocText: {
    fontSize: RF(14),
    color: THEME.colors.white,
    fontWeight: '400',
    fontFamily: THEME.fonts.primary,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
