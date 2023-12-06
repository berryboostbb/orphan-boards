import React, {Component, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Switch, FlatList} from 'react-native';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';
import Header from '../../../../shared/components/auth/header/header';
import {Notstyles} from './style';
import CustomTitle from '../../../../shared/components/common/customTitle';
import {RF, THEME, updateNotifications} from '../../../../shared/exporter';
import {styles} from '../../homeDetail/style';
import MapRadius from '../../../../shared/components/common/mapradius';
import {useSelector, useDispatch} from 'react-redux';
import {toastMessage} from '../../../../shared/utils/constants';
import {setUser} from '../../../../shared/redux/reducers/userReducer';
import {format as prettyFormat} from 'pretty-format';

// create a component
const NotificationSettin = ({navigation}: GenericNavigation) => {
  const {
    user: {
      user: {user, token},
    },
  } = useSelector((state: any) => state.root);

  const dispatch = useDispatch();

  const [data, setData] = useState([
    {text: 'Enable Notifications', value: 'notify', isEnabled: false},
    {
      text: 'Notifiy me about favorite breaks activity',
      value: 'favBreaks',
      isEnabled: false,
    },
    {
      text: 'Notifiy me when i receive new PM',
      value: 'newMsg',
      isEnabled: false,
    },
    {
      text: 'Notify me when there is a new report in a location within range:',
      value: 'reportsInRange',
      isEnabled: false,
    },
  ]);
  const [index, setIndex] = useState(0);
  const [miletxt, setMilesTxt] = useState(user?.location?.miles);

  const handleSetMiles = (miles: any) => {
    setMilesTxt(miles);
    updateNotificationsServ(miles);
  };

  const toggleSwitch = (item: any, index: number) => {
    setIndex(index);
    let temp = [...data];

    if (item.value == 'notify') {
      if (temp[0].isEnabled == true) {
        temp[0].isEnabled = false;
        temp[1].isEnabled = false;
        temp[2].isEnabled = false;
        temp[3].isEnabled = false;
      } else {
        temp[0].isEnabled = true;
      }

      setData(temp);
    } else {
      temp[index].isEnabled = !temp[index].isEnabled;
      setData(temp);
    }
  };
  useEffect(() => {
    let temp = [...data];
    temp.map(d => {
      if (d.value === 'notify') {
        d.isEnabled = user.notificationSetting.notify;
      } else if (d.value === 'favBreaks') {
        d.isEnabled = user.notificationSetting.favBreaks;
      } else if (d.value === 'newMsg') {
        d.isEnabled = user.notificationSetting.newMsg;
      } else if (d.value === 'reportsInRange') {
        d.isEnabled = user.notificationSetting.reportsInRange;
      }
    });
    setData(temp);
  }, []);

  const prevAmount = useRef({data}).current;
  useEffect(() => {
    if (prevAmount.data !== data) {
      // process here
      updateNotificationsServ(miletxt);
    }

    return () => {
      prevAmount.data = data;
    };
  }, [data]);

  const updateNotificationsServ = (mile: any) => {
    let query = `/?id=${user?.id}&${data[index].value}=${data[index].isEnabled}&miles=${mile}`;
    updateNotifications(query)
      .then(({data}) => {
        console.log('update notify.......', prettyFormat(data?.data));

        const userToset = {
          token: token,
          user: data?.data,
        };

        dispatch(setUser(userToset));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  return (
    <View style={Notstyles.container}>
      <Header header="Notifications Settings" navigation={navigation} />
      <CustomTitle title="GENERAL SETTINGS" />
      <View style={Notstyles.childContainer}>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View style={Notstyles.notCont}>
                  <Text style={Notstyles.notfytxt} numberOfLines={2}>
                    {item.text}
                  </Text>
                  <Switch
                    disabled={
                      index !== 0 && data[0].isEnabled == false ? true : false
                    }
                    trackColor={{
                      false: '#767577',
                      true: THEME.colors.lightPrimary,
                    }}
                    thumbColor={item.isEnabled ? THEME.colors.white : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch(item, index)}
                    value={item.isEnabled}
                  />
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            marginTop: RF(10),
          }}>
          <MapRadius miles={miletxt} setMiles={handleSetMiles} />
        </View>
      </View>
    </View>
  );
};

export default NotificationSettin;
