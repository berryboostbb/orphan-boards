//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GeneralButton from '../button/generalbutton';
import {styles} from './style'
// create a component
interface Props{
    onPress:()=>void;
    title:string;
    cstyle:any,
    txtColor:any,
    repotContStyle:any
}
const FixedButton = ({title,onPress,repotContStyle}:Partial<Props>) => {
    return (
        <View style={[styles.container,repotContStyle && repotContStyle]}>
            <GeneralButton title={title} onPress={onPress} />
        </View>
    );
};

// define your styles


//make this component available to the app
export default FixedButton;
