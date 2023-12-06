import React, {Component, useState, useRef} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AuthInput from '../../../shared/components/auth/authInput/authInput';
import Header from '../../../shared/components/auth/header/header';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import CustomBottomSheet from '../../../shared/components/common/customSheet';
import CustomTitle from '../../../shared/components/common/customTitle';
import {GST, THEME} from '../../../shared/exporter';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {allUStates, arr} from './data';
import {styles} from './style';

const Shopfilter = ({navigation, route}: GenericNavigation) => {
  const [slectCondtn, setSlectCondtn] = useState('New');
  let countryArr = [{name: 'USA'}, {name: 'Australia'}, {name: 'America'}];
  const {saveFilters} = route?.params;
  const [selectCntry, setContry] = useState(allUStates[0]);
  const [selectCity, setCity] = useState(arr[0]);
  const [swtch, setSwtch] = useState('country');
  console.log('filters...', swtch);

  const sheetRef: any = useRef(null);
  const sheetData = (res: any) => {
    console.log('rseponse', res);
    if (swtch == 'state') {
      setContry(res);
    } else {
      setCity(res);
    }
  };
  const handleSave = async () => {
    await saveFilters(slectCondtn, selectCntry, selectCity);
    navigation.navigate('Shop');
  };

  return (
    <View style={styles.container}>
      <Header
        header={'Filters'}
        navigation={navigation}
        savBool={true}
        handleSave={handleSave}
      />
      <View style={styles.MainContentContnr}>
        <View style={styles.filterCont}>
          <Text style={styles.filterText}>Select Conditions</Text>
          <View style={styles.filterCondtn}>
            <GeneralButton
              title="New"
              txtColor={[
                slectCondtn != 'New' && {color: THEME.colors.lightPrimary},
              ]}
              cstyle={[
                styles.filButon,
                slectCondtn == 'New' && styles.slectfilButon,
              ]}
              onPress={() => setSlectCondtn('New')}
            />
            <GeneralButton
              title="Like-New"
              txtColor={[
                slectCondtn != 'Like-New' && {color: THEME.colors.lightPrimary},
              ]}
              cstyle={[
                styles.filButon,
                slectCondtn == 'Like-New' && styles.slectfilButon,
              ]}
              onPress={() => setSlectCondtn('Like-New')}
            />
            <GeneralButton
              title="Used"
              txtColor={[
                slectCondtn != 'Used' && {color: THEME.colors.lightPrimary},
              ]}
              cstyle={[
                styles.filButon,
                slectCondtn == 'Used' && styles.slectfilButon,
              ]}
              onPress={() => setSlectCondtn('Used')}
            />
          </View>
        </View>
        <View style={styles.title}>
          <CustomTitle title="LOCATION" />
        </View>
        <View style={styles.content}>
          <View style={GST.marginY}>
            {/* <AuthInput  value={selectCntry.name} dropBoolean={true} onPress={()=>{
                setSwtch("country")
                sheetRef.current.show()}}  inputTitle={"Country"}  errorView={
                ""
            } /> */}
          </View>
          <View style={GST.marginY}>
            <AuthInput
              value={selectCntry?.name}
              dropBoolean={true}
              onPress={() => {
                setSwtch('state');
                sheetRef.current.show();
              }}
              inputTitle={'State'}
              errorView={''}
            />
          </View>
          <View style={GST.marginY}>
            <AuthInput
              value={selectCity?.name}
              dropBoolean={true}
              onPress={() => {
                setSwtch('city');
                sheetRef.current.show();
              }}
              inputTitle={'City'}
              errorView={''}
            />
          </View>
        </View>
      </View>
      <CustomBottomSheet
        data={swtch == 'state' ? allUStates : arr}
        ref={sheetRef}
        onSelect={sheetData}
      />
    </View>
  );
};

export default Shopfilter;
