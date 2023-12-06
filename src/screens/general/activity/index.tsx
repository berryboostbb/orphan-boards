import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Header from '../../../shared/components/auth/header/header';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import Message from './message';
import Notfication from './notification';
import {styles} from './style';
// create a component
const Activity = ({navigation, route}: GenericNavigation) => {
  const [selctActvty, setSelctActvy] = useState('Message');
  return (
    <View style={styles.container}>
      <Header header="Activity" navigation={navigation} />
      <View style={styles.childCont}>
        <View style={styles.slectContnr}>
          <Pressable
            style={[
              styles.slectActivity,
              selctActvty == 'Message' && styles.active,
            ]}
            onPress={() => setSelctActvy('Message')}>
            <Text
              style={[
                styles.slecttxt,
                selctActvty == 'Message' && styles.activetxt,
              ]}>
              Messages
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.slectActivity,
              selctActvty == 'Notification' && styles.active,
            ]}
            onPress={() => setSelctActvy('Notification')}>
            <Text
              style={[
                styles.slecttxt,
                selctActvty == 'Notification' && styles.activetxt,
              ]}>
              Notification
            </Text>
          </Pressable>
        </View>
        {selctActvty == 'Notification' ? (
          <Notfication navigation={navigation} />
        ) : (
          <Message navigation={navigation} />
        )}
      </View>
    </View>
  );
};

// define your styles

//make this component available to the app
export default Activity;
