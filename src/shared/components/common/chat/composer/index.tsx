//import liraries
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { RF } from '../../../../exporter';
import {styles} from './style'
// create a component
const CustomComposer = () => {
    return (
        <View style={styles.container}>

        <TextInput placeholder={"Enter TExt"} multiline={true} style={styles.input} />
        </View>
    );
};

// define your styles

//make this component available to the app
export default CustomComposer;
