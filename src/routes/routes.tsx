import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStateOrAny, useSelector } from 'react-redux';
import { navigate, THEME } from '../shared/exporter';
import AuthStack from './stacks/authStack';
import MainStack from './stacks/mainStack';
// import MainStack from './stacks/mainStack';
import Tabs from './stacks/tabs';


const Routes = () => {
  const {user} = useSelector((state: any)=>state.root);
  
  
  return (
    <SafeAreaProvider>
      {
       user?.user  ? <MainStack />:  <AuthStack />
      }
      {/* <MainStack /> */}
     {/* <AuthStack /> */}
    </SafeAreaProvider>
  );
};

export default Routes;
