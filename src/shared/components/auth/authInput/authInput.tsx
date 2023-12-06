import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RF, THEME} from '../../../exporter';
import {TextInputInterface} from '../../../models/types/interfaces';
import M from 'react-native-vector-icons/MaterialIcons';
// create a component
interface Props extends TextInputInterface {
  inputTitle: string;
  errorView: string;
  descrptn: boolean;
  dropBoolean: boolean;
  value: any;
  onPress: any;
}
const AuthInput = (Props: Partial<Props>) => {
  const {inputTitle, errorView, descrptn, dropBoolean, value, onPress} = Props;

  return (
    <>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      {dropBoolean ? (
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.input, errorView != '' && styles.err]}>
            <View style={styles.cont}>
              <Text style={styles.txt}>{value}</Text>
              <M name="arrow-drop-down" size={34} style={{color: '#D2D1D1'}} />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TextInput
          placeholderTextColor={THEME.colors.gray}
          {...Props}
          style={[
            inputTitle == 'Description'
              ? [styles.input, {textAlignVertical: 'top'}]
              : styles.input,
            descrptn && styles.plcholdDescrptn,
            errorView != '' && styles.err,
            errorView != '' && styles.blackColr,
          ]}
        />
      )}
      {errorView != '' ? (
        <Text style={styles.errText}>{errorView}</Text>
      ) : (
        <></>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  plcholdDescrptn: {
    height: RF(100),
    borderWidth: RF(1),
    borderColor: 'rgba(190, 190, 190, 0.69)',
    borderRadius: RF(4),
  },
  inputTitle: {
    fontFamily: THEME.fonts.primary,
    fontWeight: '400',
    fontSize: RF(12),
    color: '#787878',
    textTransform: 'capitalize',
    paddingBottom: RF(10),
  },
  blackColr: {
    color: 'black',
  },
  input: {
    paddingLeft: RF(8),
    // height: RF(20),
    // marginTop: RF(5),
    borderBottomColor: 'rgba(190, 190, 190, 0.69)',
    borderBottomWidth: RF(2),
    fontWeight: 'bold',
    fontSize: RF(16),
    fontFamily: THEME.fonts.primary,
    color: 'black',
  },
  err: {
    color: 'red',
    borderBottomColor: 'red',
    borderBottomWidth: RF(2),
  },
  errText: {
    color: 'red',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: RF(16),
    fontFamily: THEME.fonts.primary,
    color: 'black',
    position: 'relative',
    bottom: RF(3),
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default AuthInput;
