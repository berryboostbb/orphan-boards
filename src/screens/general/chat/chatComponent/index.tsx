import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Bubble,
  Composer,
  Day,
  MessageText,
  Send,
  InputToolbar,
} from 'react-native-gifted-chat';

import Icon from 'react-native-vector-icons/Ionicons';
import {RF, THEME, WP} from '../../../../shared/exporter';
import FastImage from 'react-native-fast-image';

import {chatIcon, menAvtarIcon} from '../../../../assets';

export const renderBubble = (props: any) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: THEME.colors.lightPrimary,
        padding: 6,
      },
      left: {backgroundColor: THEME.colors.lightsky, padding: 6},
    }}
  />
);

export const renderAvatar = (props: any) => (
  <Avatar
    {...props}
    containerStyle={{left: {}, right: {}}}
    imageStyle={{left: {height: WP(7), width: WP(7)}, right: {}}}
  />
);

export const renderMessageText = (props: any) => (
  <MessageText
    {...props}
    textStyle={{
      right: {
        color: THEME.colors.white,
        fontSize: RF(12),
        fontWeight: '300',
      },
      left: {
        color: THEME.colors.blck,
        fontSize: RF(12),
        fontWeight: '300',
      },
    }}
    customTextStyle={{fontSize: WP(3.3), lineHeight: WP(5)}}
  />
);

export const renderComposer = (props: any) => {
  return (
    <Composer
      {...props}
      multiline
      placeholderTextColor={THEME.colors.blck}
      textInputStyle={{
        textAlignVertical: 'center',
        color: THEME.colors.blck,
        fontSize: RF(12),
        fontWeight: '400',
      }}
    />
  );
};

export const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={styles.sendContainer}>
      <View style={styles.iconContainer}>
        <FastImage source={chatIcon} style={styles.icon} />
      </View>
    </Send>
  );
};

export const renderDay = (props: any) => (
  <Day
    {...props}
    wrapperStyle={{}}
    textStyle={{
      fontSize: RF(11),
      fontWeight: '300',
    }}
  />
);

export const renderInputToolbar = (props: any) => (
  <InputToolbar
    {...props}
    containerStyle={styles.inputContainer}
    primaryStyle={{}}
    accessoryStyle={{
      backgroundColor: 'green',
    }}
  />
);

const styles = StyleSheet.create({
  icon: {
    height: RF(20),
    width: RF(20),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: RF(40),
  },
  middleIcon: {
    marginHorizontal: RF(10),
  },
  sendContainer: {
    // alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: THEME.colors.lightPrimary,

    borderRadius: RF(5),
  },
  inputContainer: {
    backgroundColor: '#ECECEC',
    marginHorizontal: RF(10),
    borderRadius: RF(5),
    width: '95%',
  },
});
