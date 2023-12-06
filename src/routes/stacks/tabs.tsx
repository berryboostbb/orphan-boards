import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import Home from '../../screens/general/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ActivityLogo,
  ExploreLogo,
  homeLogo,
  settingLogo,
  shopLogo,
} from '../../assets';
import {RF, THEME} from '../../shared/exporter';
import Explore from '../../screens/general/explore';
import Shop from '../../screens/general/shop';
import Setting from '../../screens/general/setting';
import Activity from '../../screens/general/activity';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();
const Tabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({route: {name}}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          switch (name) {
            case 'Home':
              iconName = homeLogo;
              break;
            case 'Explore':
              iconName = ExploreLogo;
              break;
            case 'Activity':
              iconName = ActivityLogo;
              break;
            case 'Shop':
              iconName = shopLogo;
              break;
            case 'Settings':
              iconName = settingLogo;
              break;
          }

          return (
            <>
              <Image
                source={iconName}
                resizeMode="contain"
                style={[
                  styles.icon,
                  {
                    tintColor: !focused
                      ? THEME.colors.blck
                      : THEME.colors.lightPrimary,
                  },
                ]}
              />
            </>
          );
        },
        tabBarStyle: {
          paddingBottom:
            Platform.OS == 'android' ? insets.bottom + RF(5) : insets.bottom,
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Shop" component={Shop} options={{headerShown: false}} />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  icon: {
    height: RF(20),
  },
});
//make this component available to the app
export default Tabs;
