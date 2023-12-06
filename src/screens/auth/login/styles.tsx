import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  childContainer: {
    flex: 12,

    paddingHorizontal: RF(20),
  },
  inputContainer: {flex: 0.7},
  forgot: {
    alignItems: 'flex-end',
  },
  forgottxt: {
    fontStyle: 'italic',
    paddingHorizontal: RF(10),
  },
  socialContainer: {flex: 0.3},
  socialContinue: {flexDirection: 'row', alignItems: 'center'},
  continutxt: {marginHorizontal: RF(10), fontSize: RF(14)},
  letline: {
    width: RF(90),
    height: RF(2),
    backgroundColor: THEME.colors.lightsecondary,
  },
  rightLine: {
    width: RF(90),
    height: RF(2),
    backgroundColor: THEME.colors.lightsecondary,
  },
  socailIconCon: {flexDirection: 'row', justifyContent: 'center'},
  socialiconContainer: {
    height: RF(50),
    width: RF(50),
    padding: RF(2),
    borderWidth: RF(1),
    borderRadius: RF(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RF(4),
  },
  iconSize: {height: RF(22), width: RF(22)},
  signupMainCont: {
    alignItems: 'center',
  },
  singupCont: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sginupTxt: {
    fontSize: RF(14),
    fontFamily: THEME.fonts.primary,
  },
  signup: {
    fontSize: RF(16),
    fontFamily: THEME.fonts.primary,
    color: '#3282B8',
    fontWeight: '700',
  },
});
