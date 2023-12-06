import {View, Text, StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  childContainer: {
    flex: 2,
  },
  //     reprtCondtn:{
  //         height:RF(30),
  //         backgroundColor:THEME.colors.lightsecondary,
  //         justifyContent:'center',
  //         paddingHorizontal:RF(22)
  // },
  // rpttxt:{
  //     fontFamily:THEME.fonts.primary,
  //     fontSize:RF(10),
  //     color:'#787878',
  //     lineHeight:RF(14),
  //     textTransform:'uppercase'
  // },
  inpCont: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: RF(22),
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
