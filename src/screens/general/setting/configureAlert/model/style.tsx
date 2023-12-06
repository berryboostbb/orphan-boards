import { StyleSheet } from 'react-native';
import { RF, THEME,GST } from '../../../../../shared/exporter';
export const styles = StyleSheet.create({
    ...GST,
    container: {
      flex: 1,
      backgroundColor:THEME.colors.white
     
    },
    childContainer:{
        flex: 2,
        
        padding:RF(20)
    },
    acttxt:{
        fontSize:RF(15),
        fontFamily:THEME.fonts.primary,
        fontWeight:'bold'
    },
    actveHour:{
        flexDirection:'row',
        flexWrap:"wrap",
        marginTop:RF(10)

    },
    btn:{
        marginVertical:RF(2),
        height:RF(40),
        width:RF(70),
        marginRight:RF(4)
    },
    buttonstyle:{
        backgroundColor:THEME.colors.lightsky,
        borderRadius:RF(5),
        marginVertical:RF(3)
    },
    btncont:{
        height:RF(60),
        
        paddingHorizontal:RF(3),
        // backgroundColor:'red',
        borderColor:THEME.colors.lightsky,
        borderStyle:"dotted",
        borderWidth:RF(2),
        marginBottom:RF(10)
    }
  });