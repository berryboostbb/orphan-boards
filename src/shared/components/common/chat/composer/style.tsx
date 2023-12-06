import {  StyleSheet } from 'react-native';
import { RF, THEME } from '../../../../exporter';
export const styles = StyleSheet.create({
    container: {
        
        backgroundColor: THEME.colors.red,
        paddingVertical:RF(20),
        width:RF(290)
    },
    input:{
        paddingTop:RF(20),
        paddingBottom:RF(20),
        // paddingVertical:RF(20),
        backgroundColor:THEME.colors.lightSecondary1,
        borderRadius:RF(5),
       paddingLeft:RF(10),
        fontSize:RF(14),
        color:THEME.colors.darkGrey,
        width:'100%'

    }
});
