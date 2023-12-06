import {  StyleSheet } from 'react-native';
import { RF, THEME } from '../../../shared/exporter';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:THEME.colors.white,
       
        // alignItems: 'center',
        
    },
    childContainer:{
        flex:2,
        paddingBottom:RF(120)
    
    },
    profleHeader:{
        paddingTop:RF(20),
        justifyContent:"center",
        alignItems:"center",

    },
    logo:{
        height:RF(80),
        width:RF(80)
    },
    txt:{
        fontSize:RF(17),
        fontWeight:"bold",
        fontFamily:THEME.fonts.primary,
        textAlign:"center",
        paddingVertical:RF(10)

    },
    btn:{
        height:RF(34),
        width:RF(150)
    },
    stngItemcont:{
        paddingHorizontal:RF(20),
        paddingVertical:RF(5),
        borderBottomColor:THEME.colors.lightSecondary1,
        borderBottomWidth:RF(2)

    },
    item:{
        flexDirection:"row",
        alignItems:"center"
    },
    image:{
        height:RF(17),
        width:RF(18),
        marginRight:RF(10)
    }
});