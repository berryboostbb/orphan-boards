import {StyleSheet } from 'react-native';
import { GST, RF, THEME } from '../../../shared/exporter';
export const styles = StyleSheet.create({
...GST,
    container: {
        flex: 1,
    },
    MainContentContnr:{
        flex: 2,
    },
    filterCont:{
        flexDirection:'column',
        
        paddingTop:RF(20)
    },
    filterText:{
        fontSize:RF(15),
        fontFamily:THEME.fonts.primary,
        fontWeight:"bold",
        paddingBottom:RF(20),
        color:THEME.colors.blck,
        paddingLeft:RF(20)
    },
    filterCondtn:{
        flexDirection:'row',
        justifyContent:"space-between",
        paddingHorizontal:RF(10),
    },
    title:{
        marginTop:RF(15),
    },
    content:{
        paddingHorizontal:RF(10),
        paddingVertical:RF(20)

    }
   
    
});