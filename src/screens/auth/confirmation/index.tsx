
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GenericNavigation } from '../../../shared/models/types/interfaces';
import { confirmationStyles } from './style'
import Header from '../../../shared/components/auth/header/header';
import Toast from 'react-native-toast-message';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useSelector,useDispatch} from 'react-redux'
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import { forgotPaswordService, RF } from '../../../shared/exporter';
import { setUserEmailorCode } from '../../../shared/redux/reducers/resetReducer';
import LoadingAnimation from '../../../shared/components/loadingAnimation';


const CELL_COUNT = 4;
const Confirmation = ({ navigation }: GenericNavigation) => {
    const {resetpassword} = useSelector((state: any)=>state.root);
    const dispatch =  useDispatch();
    const [value, setValue] = useState('');
    const [loader,setLoader] =  useState(false);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const handleChange = (txt:string)=>{
        setValue(txt)
        if(txt.length == 4){
            const {code} = resetpassword
            console.log(code);
            
            if(code == txt){
                navigation.navigate("resetPassword")
            }else{
                Toast.show({
                    type: 'error',
                    text1: "Invalid Confirmation code!!",
            
                  });
            }

        }
        
        
    }
    const generateRandomNumber = ()=>{
        return   Math.floor(1000 + Math.random() * 9000);
        }
    const againOtp =()=>{
        const {email} = resetpassword
        setLoader(true)
        let cod = generateRandomNumber()
        let obj = {
            email:email,
            code:String(cod)
          }
          forgotPaswordService(obj).then(({data})=>{
            setLoader(false);    
            Toast.show({
              type: 'success',
              text1: data?.msg,
      
            });
            dispatch(setUserEmailorCode(obj))
          }).catch(err=>{
            setLoader(false)
           Toast.show({
              type: 'error',
              text1: err?.response?.data?.msg,
      
            });
            
          })
          
          
    }
    return (
        <View style={confirmationStyles.container}>
            <Header header="Confirmation" navigation={navigation} />
            <View style={confirmationStyles.childContainer}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={(txt)=>handleChange(txt)}
                    cellCount={CELL_COUNT}
                    rootStyle={confirmationStyles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                    
                            key={index}
                            style={[confirmationStyles.cell, isFocused && confirmationStyles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <View style={{marginTop:RF(10)}}>
                <GeneralButton title="Resend Code" onPress={()=>againOtp()}  />

                </View>
            </View>
            <LoadingAnimation visible={loader} />
        </View>
    );
};



//make this component available to the app
export default Confirmation;
