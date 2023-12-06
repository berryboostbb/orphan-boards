import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {RF, THEME} from '../../../exporter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import M from 'react-native-vector-icons/MaterialIcons';
import {GenericNavigation} from '../../../models/types/interfaces';
import FastImage from 'react-native-fast-image';
import {boardLogo, filterIcon, searchLogo} from '../../../../assets';
// import { TextInput } from 'react-native-gesture-handler';
import AuthInput from '../authInput/authInput';
import GeneralButton from '../../common/button/generalbutton';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
interface Props extends GenericNavigation, TextInputProps {
  header: string;
  imgbool: boolean;
  filterbool: boolean;
  onCstmPress: () => void;
  savBool: boolean;
  modal: boolean;
  customStyle: any;
  modalPress: () => void;
  handleSave: () => void;
}

const Header = (props: Partial<Props>) => {
  const insets = useSafeAreaInsets();
  const {
    header,
    navigation,
    customStyle,
    imgbool,
    handleSave,
    filterbool,
    onCstmPress,
    savBool,
    modal,
    modalPress,
  }: any = props;
  return (
    <View
      style={[
        styles.headerStyle,
        customStyle && customStyle,
        imgbool && {
          flex: 0.4,
          paddingBottom: RF(10),
          zIndex: 1,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.0,
          elevation: 1,
        },
        {
          paddingTop: insets.top,
          paddingHorizontal: RF(10),
        },
      ]}>
      <View style={styles.headerLeft}>
        <View
          style={[
            {
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              width: '10%',
            },
          ]}>
          {modal ? (
            <Pressable onPress={modalPress}>
              <Text>
                {' '}
                <M name="arrow-back-ios" size={24} color="black" />
              </Text>
            </Pressable>
          ) : !imgbool ? (
            <Pressable onPress={() => navigation.goBack()}>
              <Text>
                {' '}
                <M
                  name="arrow-back-ios"
                  size={24}
                  color={THEME.colors.lightPrimary}
                />
              </Text>
            </Pressable>
          ) : (
            <></>
          )}
        </View>

        <View
          style={[
            {
              width: '80%',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          {imgbool ? (
            <FastImage
              source={boardLogo}
              style={styles.logo}
              resizeMode={'contain'}
            />
          ) : (
            <Text style={styles.fontStyle}>{header}</Text>
          )}
        </View>
        <View
          style={[
            {justifyContent: 'flex-end', alignItems: 'flex-end', width: '10%'},
          ]}>
          {savBool && (
            <GeneralButton
              title="Save"
              cstyle={{
                backgroundColor: THEME.colors.lightPrimary,
                borderRadius: RF(5),
                width: RF(60),
                justifyContent: 'center',
                alignItems: 'center',
                height: RF(35),
              }}
              onPress={handleSave}
            />
          )}
          {/*                             
                             <TouchableOpacity style={{}>
                        <Text style={{color:THEME.colors.white}}>Save</Text>
                    </TouchableOpacity> */}
        </View>

        {/* <Text style={{justifyContent:"center",backgroundColor:"red"}}>askdfj</Text> */}
      </View>
      {imgbool && (
        <View
          style={{
            paddingBottom: RF(10),
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={[styles.serachContainer, !filterbool && {width: '95%'}]}>
            <Image source={searchLogo} style={styles.srchLogo} />
            <TextInput
              placeholderTextColor={THEME.colors.blck}
              style={styles.srchInp}
              {...props}
            />
          </View>
          {!!filterbool && (
            <TouchableOpacity style={styles.filCont} onPress={onCstmPress}>
              <Image source={filterIcon} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  centerView: {
    // justifyContent: "center",
    // alignItems:"center",
    // backgroundColor:"yellow",
    width: '33%',

    // marginLeft: RF(67)
  },
  fontStyle: {
    textAlign: 'center',
    fontSize: RF(20),
    fontWeight: '600',
    color: '#3282B8',
    flexWrap: 'nowrap',
    // backgroundColor:"greenyellow"
  },
  headerStyle: {
    flex: 0.2,
    backgroundColor: 'white',
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.0,
    elevation: 1,
  },
  logo: {
    height: RF(90),
    width: RF(150),
    marginLeft: RF(17),
    marginTop: RF(30),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // backgroundColor:"red",
    // justifyContent:'space-between'
  },
  serachContainer: {
    // marginHorizontal: RF(10),
    flexDirection: 'row',
    backgroundColor: THEME.colors.lightSecondary1,
    alignItems: 'center',
    borderRadius: RF(5),
    paddingHorizontal: RF(10),
    width: '90%',
  },
  srchLogo: {
    height: RF(15),
    width: RF(15),
  },
  srchInp: {
    color: 'black',
    paddingVertical: RF(10),
    paddingHorizontal: RF(10),
    fontWeight: '400',
    fontFamily: THEME.fonts.primary,
    fontSize: RF(14),
    width: '98%',
  },
  filCont: {
    width: '10%',
    padding: RF(10),
    borderRadius: RF(5),
    marginLeft: RF(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.lightPrimary,
  },
});

//make this component available to the app
export default Header;
