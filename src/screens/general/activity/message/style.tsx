import {styles} from '../notification/style'
import {  StyleSheet } from 'react-native';
import { RF, THEME } from '../../../../shared/exporter';
export const mStyle = StyleSheet.create({
    ...styles,
    msgtxt:{
        width:RF(150)
    },
    msgName:{
        fontSize:RF(14),
        fontWeight:"bold",
        fontFamily:THEME.fonts.primary,
        color:THEME.colors.blck
    },
    unreadMsg:{
        
        marginLeft:RF(40),
        justifyContent:"center",
        alignItems:'flex-end'
    },
    msgcount:{
        marginTop:RF(6),
        height:RF(16),
        width:RF(16),
        backgroundColor:THEME.colors.lightPrimary,
        borderRadius:RF(10),
        justifyContent:"center",
        alignItems:'center'
    },
    msgcounttxt:{
        color:THEME.colors.white,
        fontSize:RF(11)
    }
})