import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import Confirmation from '../../screens/auth/confirmation';
import ForgotPassword from '../../screens/auth/forgotPassword/forgotPassword';
import Login from '../../screens/auth/login';
import ResetPassword from '../../screens/auth/resetPassword/resetPassword';
import Signup from '../../screens/auth/signup';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgot"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="resetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="confirmation"
          component={Confirmation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
