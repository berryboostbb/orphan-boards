import { StyleSheet } from 'react-native'
import { RF, THEME } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
    },
    childContainer: {
        flex: 5,
        
        paddingHorizontal: RF(20),
    },
    inputContainer: { 
        
        flex:0.95,
    },
    
    signupMainCont:{
        alignItems:"center",
        paddingBottom:RF(30)
    },
    singupCont:{
        flexDirection:'row',
        alignItems:"baseline"
    },
    sginupTxt:{
        fontSize:RF(14),fontFamily:THEME.fonts.primary
    },
    signup:{fontSize:RF(16),fontFamily:THEME.fonts.primary,color:"#3282B8",fontWeight:"700"}




})