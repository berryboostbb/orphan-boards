import { StyleSheet } from 'react-native';
import { RF, THEME } from '../../../shared/exporter';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: THEME.colors.white,
    },
    childCont:{
        flex:2
    },
    slectContnr:{
        flexDirection:"row"
    },
    slectActivity:{
        flexDirection:"row",
        width:"50%",
        // backgroundColor:"red",
        paddingVertical:RF(18),
        justifyContent:"center",
        borderBottomColor:THEME.colors.lightSecondary1,
        borderBottomWidth:RF(2)     
    },
    active:{
        width:"50%",
        
        paddingVertical:RF(18),
        justifyContent:"center",
        borderBottomColor:THEME.colors.lightPrimary,
        borderBottomWidth:RF(2)     
    },
    slecttxt:{
        fontSize:RF(14),
        fontFamily:THEME.fonts.primary,
        fontWeight:"bold",
        color:THEME.colors.blck
    },
    activetxt:{
        fontSize:RF(14),
        fontFamily:THEME.fonts.primary,
        fontWeight:"bold",
        color:THEME.colors.lightPrimary
    }
});