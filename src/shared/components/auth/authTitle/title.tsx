import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RF } from '../../../exporter';
interface Props{
    title:string;
}

const Title = (props:Props) => {
    const {title} = props
    return (
        <Text style={styles.fontStyle}>{title}</Text>
      
    );
};

// define your styles
const styles = StyleSheet.create({
    fontStyle:{
        textAlign:"center",
        marginTop:RF(20),
        fontSize:RF(20),
        fontWeight:'600',
        color:'#3282B8'
    }
});

//make this component available to the app
export default Title;
