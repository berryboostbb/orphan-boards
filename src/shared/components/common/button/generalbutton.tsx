//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RF, THEME} from '../../../exporter';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// create a component
interface Props {
  onPress: () => void;
  title: string;
  cstyle: any;
  txtColor: any;
  left: Boolean;
}
const GeneralButton = (props: Partial<Props>) => {
  const {title, onPress, cstyle, txtColor, left} = props;
  return (
    <TouchableOpacity
      style={[styles.container, cstyle && cstyle]}
      onPress={onPress}>
      <Text style={[styles.buttonTxt, txtColor && txtColor]}>
        {left && <MaterialIcons name="edit" size={16} />} {title}
      </Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(100),
    backgroundColor: '#3282B8',
    borderRadius: RF(5),
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: RF(50),
  },
  buttonTxt: {
    color: THEME.colors.white,
    fontSize: RF(15),
    fontFamily: 'Lato-Regular',
  },
});

//make this component available to the app
export default GeneralButton;
