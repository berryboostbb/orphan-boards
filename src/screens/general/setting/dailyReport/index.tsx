//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, Switch, TouchableOpacity} from 'react-native';
import Header from '../../../../shared/components/auth/header/header';
import CustomTitle from '../../../../shared/components/common/customTitle';
import {RF, THEME, handleDailyReporting} from '../../../../shared/exporter';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';
import {reportStyle} from './style';
import M from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {setUser} from '../../../../shared/redux/reducers/userReducer';

const DailyReport = ({navigation, route}: GenericNavigation) => {
  const {
    user: {
      user: {user, token},
    },
  } = useSelector((state: any) => state.root);
  const [isEnabled, setIsEnabled] = useState(user?.emailHours?.alert);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reportTime, setreportTime] = useState(
    moment(user?.emailHours?.time).format('hh:mm A'),
  );
  const dispatch = useDispatch();

  const toggleSwitch = () =>
    setIsEnabled((previousState: any) => !previousState);

  const handleDailyReport = (type: any, value: any) => {
    let params = {};

    if (type == 'switch') {
      params = {
        alert: value !== null && typeof value == 'boolean' ? value : isEnabled,
      };
    } else {
      params = {
        time: value,
      };
    }

    // let query = ``;
    // if (type == 'switch') {
    //   query = `?alert=${value}`;
    // } else {
    //   console.log('vvvv...', value);

    //   query = `?time=${value}`;
    //   console.log('else.........', query);
    // }

    console.log('...param....', params);

    handleDailyReporting(user?.id, params)
      .then(res => {
        const userToset = {
          token: token,
          user: res.data.data,
        };

        dispatch(setUser(userToset));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    handleDailyReport('switch', isEnabled);
  }, [isEnabled]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    let convertedTime = moment.utc(date);

    setreportTime(moment(date).format('hh:mm A'));
    handleDailyReport('time', convertedTime);

    hideDatePicker();
  };
  return (
    <View style={reportStyle.container}>
      <Header header="Daily Reports" navigation={navigation} />
      <CustomTitle title="REPORT SETTINGS" />
      <View style={reportStyle.childContainer}>
        <View style={reportStyle.rpCont}>
          <Text>Enable Daily Reporting</Text>
          <Switch
            trackColor={{false: '#767577', true: THEME.colors.lightPrimary}}
            thumbColor={isEnabled ? THEME.colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text style={reportStyle.rprtText}>
          We’ll send you a daily report to your email with current weather
          conditions and all recent activity in you area.
        </Text>
        <View
          style={[
            reportStyle.rpCont,
            {
              borderTopColor: THEME.colors.lightSecondary1,
              borderTopWidth: RF(2),
              marginTop: RF(20),
            },
          ]}>
          <Text style={{marginTop: RF(2)}}>Report Time</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text>
              Every day at {reportTime}{' '}
              <M
                name="arrow-forward-ios"
                size={10}
                color={THEME.colors.lightPrimary}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        minuteInterval={30}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DailyReport;
