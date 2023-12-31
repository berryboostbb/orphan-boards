import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../exporter';
export const styles = StyleSheet.create({
  itemCont: {
    height: RF(230),
    width: RF(160),
    padding: RF(5),
    marginVertical: RF(5),
    alignItems: 'center',
    marginHorizontal: RF(5),
    backgroundColor: THEME.colors.white,
    borderRadius: 6,
  },
  itemImg: {
    // backgroundColor:"#F4F4F4",
    height: RF(214),
    width: RF(143),
    paddingVertical: RF(2),
  },
  txt: {
    // marginTop: RF(10),
    paddingTop: RF(10),
    color: THEME.colors.blck,
    fontFamily: THEME.fonts.primary,
    fontSize: RF(14),
    lineHeight: RF(13),
  },
  editView: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: THEME.colors.white,
    // borderWidth: 1,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: THEME.colors.blck,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
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
  loadingContainer: {
    backgroundColor: 'rgba(42, 67, 78,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
