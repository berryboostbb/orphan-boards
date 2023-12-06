import { StyleSheet } from "react-native";
import { RF, THEME } from "../../../shared/exporter";


export const confirmationStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.colors.white,
    },
    childContainer: {
        flex: 2,
        // justifyContent:"center",
        paddingTop:RF(50),
        paddingHorizontal: RF(20),
    },
  
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: RF(50),
        height: RF(50),
        lineHeight: 38,
        fontSize: 24,
        paddingTop:RF(5),
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        
        marginRight:RF(10)

    },
    focusCell: {
        borderColor: '#000',
    },
});