import {StyleSheet} from 'react-native';
import { RF, THEME } from '../../../../shared/exporter';
import {styles} from '../style'
export const reportStyle = StyleSheet.create({
...styles,
rpCont:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:RF(20),
    paddingVertical:RF(10),
    alignItems:"center"
},
rprtText:{
    paddingHorizontal:RF(20),
    width:RF(270),
    fontSize:RF(12),
    fontFamily:THEME.fonts.primary
    
}
})