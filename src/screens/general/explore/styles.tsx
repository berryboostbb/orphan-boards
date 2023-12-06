import { StyleSheet } from 'react-native';
import { RF, THEME } from '../../../shared/exporter';
export const styles = StyleSheet.create({
  container:{
      flex:1,   
  },
  mapContList:{
    flex:1,
    //   marginTop:RF(10),
    
      
      justifyContent:"center",
      alignItems:"center",
      ...StyleSheet.absoluteFillObject,
  } ,
  map:{
      height:"100%",
      width:"100%",
      
  },
  switchMapCont:{
      flexDirection:"row",
    position:"absolute",
  top:RF(20),
  zIndex:1,
  right:RF(20),
},
item:{
    flexDirection:"row",
    backgroundColor:THEME.colors.white,
    minWidth:RF(35),
    height:RF(35),
    borderRadius:RF(5),
    padding:RF(4),
    justifyContent:"center",
    alignItems:"center"


},
text:{
    fontSize:RF(11),
    fontFamily:THEME.fonts.primary,
    fontWeight:"bold",
    marginLeft:RF(4)
}
})