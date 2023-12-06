import {StyleSheet} from 'react-native';
import {RF, THEME} from '../../../shared/exporter';
import {styles} from '../homeDetail/style';
export const Styles = StyleSheet.create({
  ...styles,
  container: {
    flex: 1,
  },
  childCont: {
    flex: 2,
    backgroundColor: THEME.colors.white,
    height: '50%',
  },
  header: {
    flex: 0.4,
    backgroundColor: '#F4F4F4',
    paddingVertical: RF(30),
    // zIndex:1
  },
  sliderContnr: {
    height: '100%',
    width: RF(344),
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  content: {
    flex: 0.6,
    backgroundColor: THEME.colors.white,

    position: 'relative',
    top: RF(-20),
    borderRadius: RF(20),
    bottom: RF(0),
  },
  img: {
    height: '100%',
    width: RF(344),
  },
  wrapDot: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    margin: 3,
    color: 'transparent',
    borderRadius: 100,
    borderColor: THEME.colors.darkGrey,
    borderWidth: 1,
    width: RF(11),
    height: RF(11),
  },
  dotActive: {
    margin: 3,
    backgroundColor: THEME.colors.gray,
    borderRadius: 100,
    width: RF(11),
    height: RF(11),
  },
  soldOut: {
    backgroundColor: THEME.colors.lightPrimary,
    paddingHorizontal: RF(8),
    paddingVertical: RF(3),
    borderRadius: 5,
  },
});
