import {  StyleSheet } from 'react-native';
import { RF } from '../../../exporter';
export const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignItems: 'center',
        
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        height: RF(90),
        left: 0,
        right: 0,
    
        backgroundColor: "white",
        width: "100%",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2.00,
        elevation: 1,
        paddingHorizontal:RF(20)
    },
    
});