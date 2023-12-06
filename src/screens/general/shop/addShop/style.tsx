import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../../shared/exporter';
export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: THEME.colors.white,
  },
  childCont: {
    paddingTop: RF(20),
    flex: 2,
    paddingHorizontal: RF(20),
  },
  mapInputStyles: {
    borderBottomWidth: 1,
    color: 'black',
    borderColor: 'rgba(0,0,0,0.3)',
  },
  validInputStyles: {
    color: 'black',
    borderBottomWidth: 1,

    borderColor: THEME.colors.red,
  },
  loctxt: {
    fontSize: RF(12),
    color: '#787878',
  },
  uploadCont: {
    position: 'relative',
    height: RF(50),
    width: RF(50),
    borderStyle: 'dotted',
    borderWidth: RF(2),
    borderColor: THEME.colors.secondary,
    borderRadius: RF(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: RF(2),
  },
  uploadItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    right: RF(-5),
    top: RF(-10),
    backgroundColor: THEME.colors.red,
    borderRadius: RF(10),
    zIndex: 1,
  },
  lstView: {
    flex: 1,
    position: 'absolute',
    top: 40,
    minHeight: 160,
    color: 'black',
  },
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
    fontSize: RF(18),
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.blck,
    fontWeight: 'bold',
  },
  actionSheet: {
    paddingVertical: RF(5),
  },
  actionSheetView: {
    flexDirection: 'row',
    paddingVertical: RF(10),
    alignItems: 'center',
    borderBottomWidth: RF(1),
    justifyContent: 'space-around',
    paddingHorizontal: RF(20),
    paddingBottom: RF(20),
  },
  miniAccView: {
    alignItems: 'center',
  },
});
