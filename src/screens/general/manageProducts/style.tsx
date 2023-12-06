import {View, Text, StyleSheet} from 'react-native';
import {RF, THEME, GST} from '../../../shared/exporter';

export const styles = StyleSheet.create({
  ...GST,
  container: {
    flex: 1,
  },
  childCont: {
    flex: 2,
    marginTop: RF(2),
  },
  flatContainer: {
    // backgroundColor:THEME.colors,
    // flexWrap:"wrap",
    // height:"100%",
    // padding:RF(6),
    // paddingVertical:RF(5),
    // flexDirection:"row",
    // justifyContent: 'center',
    // paddingHorizontal: RF(20)
    alignItems: 'center',
  },
  addShop: {
    position: 'absolute',
    bottom: RF(20),
    right: RF(20),
    height: RF(54),
    width: RF(54),
    backgroundColor: THEME.colors.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RF(27),
  },
  MainContentContnr: {
    // flex: 1,
    paddingTop: 10,
    paddingBottom: 50,
  },
  filterCont: {
    flexDirection: 'column',
    paddingTop: RF(20),
  },
  filterText: {
    fontSize: RF(15),
    fontFamily: THEME.fonts.primary,
    fontWeight: 'bold',
    // paddingBottom: RF(20),
    color: THEME.colors.blck,
    paddingLeft: RF(20),
  },
  filterCondtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RF(10),
  },
  content: {
    paddingHorizontal: RF(10),
    paddingVertical: RF(20),
  },
  saveText: {
    fontSize: RF(13),
    fontFamily: THEME.fonts.primary,
    fontWeight: 'bold',
    color: THEME.colors.lightPrimary,
  },
  sheetTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: RF(20),
    paddingBottom: RF(20),
  },
  textGray: {
    fontSize: 14,
    // fontFamily: FontFamily.Regular,
    color: THEME.colors.gray,
  },
  textBold: {
    fontSize: 15,
    // fontFamily: FontFamily.Medium,
    color: THEME.colors.blck,
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
