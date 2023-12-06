//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RF, THEME } from '../../../exporter';

// create a component
const CustomTitle = ({title}:{title:string}) => {
    return (
        <View style={styles.reprtCondtn}>
            <Text style={styles.rpttxt}>{title}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    reprtCondtn:{
        height:RF(30),
        backgroundColor:THEME.colors.lightsecondary,
        justifyContent:'center',
        paddingHorizontal:RF(22)
},
rpttxt:{
    fontFamily:THEME.fonts.primary,
    fontSize:RF(10),
    color:'#787878',
    lineHeight:RF(14),
    textTransform:'uppercase'
}
});

//make this component available to the app
export default CustomTitle;
