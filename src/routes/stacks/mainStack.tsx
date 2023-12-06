import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import Home from '../../screens/general/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeDetail from '../../screens/general/homeDetail';
import Tabs from './tabs';
import ExploreFilter from '../../screens/general/exploreFilter';
import AddReport from '../../screens/general/addreport';
import Shopfilter from '../../screens/general/shopFilter';
import UpdateProfile from '../../screens/general/setting/updateProfile';
import NotificationSettin from '../../screens/general/setting/notificationSetting';
import ChangePasword from '../../screens/general/setting/changePassword';
import DailyReport from '../../screens/general/setting/dailyReport';
import ConfigureAlert from '../../screens/general/setting/configureAlert';
import AddShop from '../../screens/general/shop/addShop';
import Chat from '../../screens/general/chat';
import ShopDetail from '../../screens/general/shopDetail';
import ManageProducts from '../../screens/general/manageProducts';
import Profile from '../../screens/general/profile';
import SeeMore from '../../screens/general/home/seeMore';
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Stack.Navigator initialRouteName={'Tabs'}>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SeeMore"
          component={SeeMore}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={HomeDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExploreFilter"
          component={ExploreFilter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShopFilter"
          component={Shopfilter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddReport"
          component={AddReport}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="updateProfile"
          component={UpdateProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notificationSetting"
          component={NotificationSettin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePasword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="dailyReport"
          component={DailyReport}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="addshop"
          component={AddShop}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="configureAlert"
          component={ConfigureAlert}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chat"
          component={Chat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="shopDetail"
          component={ShopDetail}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ManageProducts"
          component={ManageProducts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
