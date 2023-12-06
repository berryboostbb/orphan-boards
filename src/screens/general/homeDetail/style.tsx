import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
import {STYLES} from '../home/styles';
export const styles = StyleSheet.create({
  ...STYLES,
  container: {
    paddingVertical: RF(24),
    paddingHorizontal: RF(15),
  },
  avastyle: {height: RF(30), width: RF(30)},
  insetContainpnding: {
    paddingHorizontal: RF(7),
  },
  descrtionContnr: {
    // backgroundColor:"red",
    padding: RF(5),
  },
  nstddescptnContr: {
    // borderBottomColor: THEME.colors.lightsecondary,
    // borderBottomWidth: RF(1),
    paddingBottom: RF(10),
  },
  descrtion: {
    fontSize: RF(13),
    fontFamily: THEME.fonts.primary,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: RF(20),
    flexWrap: 'wrap',
  },

  wthrPrcptnContnr: {
    paddingTop: RF(30),
    // backgroundColor: "red",
    marginRight: RF(22),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // -----perception one container
  prcptnOneContnr: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prcptn1Icon: {
    // height:RF(30),
    // width:RF(30),
    // backgroundColor:"red"
    fontSize: RF(45),
    color: '#DC9A59',
  },
  prcptn1text: {
    color: THEME.colors.blck,
    fontWeight: 'bold',
    fontFamily: THEME.fonts.primary,
    fontSize: RF(45),
    paddingLeft: RF(12),
  },
  prcptn1deg: {
    position: 'absolute',
    fontWeight: 'bold',
    fontFamily: THEME.fonts.primary,
    fontSize: RF(30),
    right: RF(-14),
    top: RF(-10),
    // paddingLeft:RF(12),
  },
  // -----perception one container
  prcptnSndContnr: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginVertical: RF(10),
    // backgroundColor:'red'
  },
  prcptn2Icon: {
    fontSize: RF(13),
    color: THEME.colors.blck,
    marginLeft: RF(25),
  },
  prcptn2text: {
    color: THEME.colors.blck,
    fontWeight: 'normal',
    fontFamily: THEME.fonts.primary,
    fontSize: RF(14),
    marginLeft: RF(2),
  },
  // -------preception desccription
  prcptnDescrptn: {
    color: THEME.colors.blck,
    fontWeight: 'normal',
    fontFamily: THEME.fonts.primary,
    fontSize: RF(13),
    marginLeft: RF(25),
    // backgroundColor:"red"
  },
  dtlTblCont: {
    marginTop: RF(20),
    flexDirection: 'row',
    // backgroundColor:"red",
    // alignItems:'center',
    justifyContent: 'space-between',
    borderBottomColor: THEME.colors.lightSecondary1,
    borderBottomWidth: RF(2),
  },
  dtlTitle: {
    fontSize: RF(12),
    color: THEME.colors.secondary,
    paddingBottom: RF(10),
    textTransform: 'capitalize',
  },
  dtlValue: {
    color: THEME.colors.blck,
    fontWeight: '500',
    fontSize: RF(18),
    fontFamily: THEME.fonts.primary,
  },
  wthrgrid: {
    flexDirection: 'row',
    marginTop: RF(20),
    // backgroundColor:"red",
  },
  ristme: {
    fontSize: RF(14),
    fontFamily: THEME.fonts.primary,
  },
  footerCont: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    height: RF(90),
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.0,
    elevation: 1,
  },
  footer: {
    position: 'absolute',
    left: RF(20),
    right: RF(20),
    top: RF(15),
  },
});
