import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
export const ProflieStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  header: {
    // backgroundColor:"red",
    borderBottomWidth: RF(2),
    borderBottomColor: THEME.colors.lightSecondary1,
    flex: 0.4,
    // paddingTop:RF(40),
    flexDirection: 'row',
  },
  left: {
    paddingTop: RF(40),
    paddingLeft: RF(20),
  },
  center: {
    width: '70%',
    alignItems: 'center',
    paddingTop: RF(15),
  },
  logo: {
    height: RF(80),
    width: RF(80),
  },
  content: {
    // backgroundColor:"yellow",
    flex: 1,
  },
  name: {
    paddingVertical: RF(10),
    fontSize: RF(17),
    fontFamily: THEME.fonts.primary,
    fontWeight: 'bold',
    color: THEME.colors.blck,
  },
  email: {
    fontSize: RF(14),
    fontFamily: THEME.fonts.primary,
    color: THEME.colors.blck,
  },
  item: {
    height: RF(110),
    width: RF(100),
  },
  itemCon: {
    height: RF(140),
    width: RF(105),
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
  flatContainer: {
    // backgroundColor:THEME.colors,
    // flexWrap:"wrap",
    // height:"100%",
    // padding:RF(6),
    // paddingVertical:RF(5),
    // flexDirection:"row",
    justifyContent: 'center',
    // paddingHorizontal: RF(50),
    alignItems: 'center',
  },
});
