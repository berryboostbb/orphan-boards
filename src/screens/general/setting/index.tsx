import React, {Component, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../shared/components/auth/header/header';
import Avatar from '../../../shared/components/common/avatar';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import GeneralButton from '../../../shared/components/common/button/generalbutton';
import CustomTitle from '../../../shared/components/common/customTitle';
import {GST, handleLogOut} from '../../../shared/exporter';
import {
  alertIcon,
  boxIcon,
  lockIcon,
  logoutIcon,
  notifyIcon,
  reportIcon,
} from '../../../assets';
import FastImage from 'react-native-fast-image';
import {resetUser} from '../../../shared/redux/reducers/userReducer';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import {toastMessage} from '../../../shared/utils/constants';

const Setting = ({navigation, route}: GenericNavigation) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.root);

  const [loading, setloading] = useState(false);

  let source = {};

  if (user.user.user?.profilePic) {
    source = {uri: user.user.user?.profilePic + '?' + new Date().getTime()};
  } else {
    source = {};
  }

  console.log('dp.......', user.user.user?.profilePic);

  const logout = () => {
    setloading(true);
    handleLogOut(user?.user?.user?.id)
      .then(res => {
        toastMessage('success', res?.data?.msg);
        dispatch(resetUser());
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setloading(false));
  };

  return (
    <View style={styles.container}>
      <Header header="Account Settings" navigation={navigation} />
      <View style={styles.childContainer}>
        <View style={styles.profleHeader}>
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 50,
              borderColor: 'gray',
              elevation: 5,
            }}>
            <Avatar style={styles.logo} source={source} />
          </View>
          <Text style={styles.txt}>
            {user?.user?.user?.firstName?.charAt(0)?.toUpperCase() +
              user?.user?.user?.firstName?.slice(1) +
              ' ' +
              user?.user?.user?.lastName}
          </Text>
          <GeneralButton
            title={'EDIT PROFILE'}
            cstyle={styles.btn}
            left={true}
            onPress={() => navigation.navigate('updateProfile')}
          />
        </View>
        <View style={GST.mt4}>
          <CustomTitle title="PROFILE SETTINGS" />
          <SettingItem
            img={boxIcon}
            txt="Manage Products"
            onPress={() => navigation.navigate('ManageProducts')}
          />
          <SettingItem
            img={notifyIcon}
            txt="Notification Settings"
            onPress={() => navigation.navigate('notificationSetting')}
          />
          <SettingItem
            img={lockIcon}
            txt="Change Password"
            onPress={() => navigation.navigate('changePassword')}
          />

          <CustomTitle title="PREFERENCES" />
          <SettingItem
            img={alertIcon}
            txt="Configure Alerts"
            onPress={() => navigation.navigate('configureAlert')}
          />
          <SettingItem
            img={reportIcon}
            txt="Send Daily Reports"
            onPress={() => navigation.navigate('dailyReport')}
          />
          <SettingItem img={logoutIcon} txt="Logout" onPress={logout} />
        </View>
      </View>
      <LoadingAnimation visible={loading} />
    </View>
  );
};
const SettingItem = ({
  img,
  txt,
  onPress,
}: Partial<{img: any; txt: string; onPress: any}>) => {
  return (
    <TouchableOpacity style={styles.stngItemcont} onPress={onPress}>
      <View style={styles.item}>
        <FastImage source={img} style={styles.image} resizeMode={'contain'} />
        <Text style={styles.txt}>{txt}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Setting;
