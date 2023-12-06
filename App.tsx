import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import Routes from './src/routes/routes';
import {
  navigationRef,
  persistor,
  store,
  initialConfig,
  googleConfig,
} from './src/shared/exporter';
import messaging from '@react-native-firebase/messaging';
import {checkNotificationPermission} from './src/shared/services/firebaseService';

const App = () => {
  // const navigation = useNavigation();
  useEffect(() => {
    SplashScreen.hide();
    initialConfig();
    googleConfig();
    checkNotificationPermission();
    getInitialNotification();
    onNotificationOpenedApp();
  }, []);

  const getInitialNotification = () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification .........:', remoteMessage.notification);
        }
      });
  };

  const onNotificationOpenedApp = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage?.data,
      );

      if (remoteMessage?.data?.type == 'message') {
        const dataToSend = {
          _id: remoteMessage?.data?.sender,
          firstName: remoteMessage?.data?.firstName,
          lastName: remoteMessage?.data?.lastName,
          profilePic: remoteMessage?.data?.profilePic,
        };
        navigationRef.current?.navigate('chat', {item: dataToSend});
      } else if (remoteMessage?.data?.type == 'report') {
        navigationRef.current?.navigate('Home');
      } else if (remoteMessage?.data?.type == 'product') {
        // const user = JSON.parse(remoteMessage?.data?.user);

        // const dataToSend = {
        //   _id: remoteMessage?.data?._id,
        //   address: remoteMessage?.data?.address,
        //   condition: remoteMessage?.data?.condition,
        //   description: remoteMessage?.data?.description,
        //   images: remoteMessage?.data?.images,
        //   location: remoteMessage?.data?.location,
        //   price: remoteMessage?.data?.price,
        //   sold: remoteMessage?.data?.sold,
        //   title: remoteMessage?.data?.title,
        //   type: remoteMessage?.data?.type,
        //   user: {
        //     firstName: (user as any)?.firstName,
        //     lastName: (user as any)?.lastName,
        //     profilePic: (user as any)?.profilePic,
        //     _id: (user as any)?.id,
        //   },
        // };
        navigationRef.current?.navigate('Shop');
      }
    });
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <Routes />
            <Toast position="bottom" />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
