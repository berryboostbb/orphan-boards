import {View, Text, StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  chilCont: {
    flex: 2,
    paddingHorizontal: RF(10),
    // flexDirection:"column"
  },
  text: {
    fontFamily: THEME.fonts.primary,
    fontSize: RF(16),
    color: THEME.colors.blck,
    paddingVertical: RF(20),
  },
  mapCon: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    // backgroundColor: "red"
  },
  map: {
    height: RF(200),
    width: RF(200),
    borderRadius: RF(100),
  },
  mapoverlay: {
    backgroundColor: 'red',
  },
  bottom: {
    borderTopWidth: RF(2),
    borderTopColor: THEME.colors.lightsecondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: RF(20),
  },
  btmText: {
    fontSize: RF(14),
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.blck,
  },
  mapTxt: {
    marginTop: RF(10),
    fontSize: RF(12),
    fontFamily: THEME.fonts.primary,
    fontWeight: '400',
    textAlign: 'center',
    color: '#979797',
    lineHeight: RF(12),
  },
  filCont: {
    backgroundColor: THEME.colors.lightPrimary,
    height: RF(20),
    width: RF(36),
    borderRadius: RF(10),
    justifyContent: 'center',
    paddingLeft: RF(7),
    zIndex: 1,
    // alignItems:"center"
  },
});
