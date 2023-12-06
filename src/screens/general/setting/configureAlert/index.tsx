//import liraries
import React, {Component, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Switch,
  Pressable,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';
import Header from '../../../../shared/components/auth/header/header';
import {styles} from './style';
import CustomTitle from '../../../../shared/components/common/customTitle';
import {
  RF,
  THEME,
  handleAllAlerts,
  handlePerLocationAlerts,
  handleConditionAlert,
  handleBeachAlerts,
  handleActiveHours,
} from '../../../../shared/exporter';
import GeneralButton from '../../../../shared/components/common/button/generalbutton';
import M from 'react-native-vector-icons/MaterialIcons';
import TimeModal from './model';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {toastMessage} from '../../../../shared/utils/constants';
import {setUser} from '../../../../shared/redux/reducers/userReducer';
import CustomBottomSheet from '../../../../shared/components/common/customSheet';
import {colors} from 'react-native-elements';

export const wveCondition = [
  {
    name: 'All',
    type: 'all',
  },
  {
    name: 'Excellent',
    type: 'excellent',
  },
  {
    name: 'Good',
    type: 'good',
  },
  {
    name: 'Bad',
    type: 'bad',
  },
];

const ConfigureAlert = ({navigation, route}: GenericNavigation) => {
  const sheetRef: any = useRef(null);
  const [switchLoading, setswitchLoading] = useState(false);

  const {
    user: {
      user: {user, token},
    },
  } = useSelector((state: any) => state.root);

  let preCondition = {};

  wveCondition.map(wc => {
    if (user?.alertSettings?.condition == wc.type) {
      preCondition = wc;
    }
  });
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  console.log('.....alert....', user?.alertSettings?.alert);

  const [allAlertSwitch, setallAlertSwitch] = useState(
    user?.alertSettings?.alert,
  );
  const [perLocationSwitch, setperLocationSwitch] = useState(
    user?.alertSettings?.locationSetting,
  );
  const [wveCondtn, setWveCondtn] = useState(preCondition);

  const [stime, setStime]: any = useState(user?.activeHours?.start);
  const [endtime, setEndtime]: any = useState(user?.activeHours?.end);
  const [beachSwitchLoading, setbeachSwitchLoading] = useState(false);
  const [beachIndex, setbeachIndex] = useState(0);

  const [data, setData] = useState([
    {text: 'Santa Barbara, California', value: false},
    {
      text: 'Santa Barbara, California',
      value: false,
    },
    {
      text: 'Santa Barbara, California',
      value: false,
    },
    {
      text: 'Santa Barbara, California',
      value: false,
    },
  ]);

  const openConditionSheet = () => {
    sheetRef.current.show();
  };
  const selectCondition = (res: any) => {
    setWveCondtn(res);

    const params = {
      userId: user?.id,
      condition: res.type,
    };

    handleConditionAlert(params)
      .then(res => {
        const userToset = {
          token: token,
          user: res.data.data,
        };
        dispatch(setUser(userToset));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      });
  };
  //   console.log(stime, endtime);

  const onlyCloseModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = (days: any, start: any, end: any) => {
    setloading(true);

    setModalVisible(!modalVisible);

    let arr = [
      {
        name: 'monday',
        alert: false,
      },
      {
        name: 'tuesday',
        alert: false,
      },
      {
        name: 'wednesday',
        alert: false,
      },
      {
        name: 'thursday',
        alert: false,
      },
      {
        name: 'friday',
        alert: false,
      },
      {
        name: 'saturday',
        alert: false,
      },
      {
        name: 'sunday',
        alert: false,
      },
    ];

    for (var i = 0; i < arr.length; i++) {
      for (var k = 0; k < days.length; k++) {
        if (arr[i].name == days[k].name) {
          arr[i].alert = true;
          break;
        }
      }
    }

    const sToSend = moment.utc(start);
    const eToSend = moment.utc(end);

    const params = {
      id: user?.id,
      start: start !== '' ? sToSend : stime,
      end: end !== '' ? eToSend : endtime,
      days: arr,
    };

    handleActiveHours(params)
      .then(res => {
        // console.log('parammm....', res.data.data);

        const userToset = {
          token: token,
          user: res.data.data,
        };
        dispatch(setUser(userToset));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setloading(false));
  };

  const toggleAllALerts = () => {
    setallAlertSwitch(!allAlertSwitch);
  };
  const toggleLocationSwitch = () => {
    setperLocationSwitch(!perLocationSwitch);
  };
  const toggleBeachSwitch = (item: any, index: number) => {
    setbeachIndex(index);
    setbeachSwitchLoading(true);

    const params = {
      userId: user?.id,
      beach: item.id,
      alert: !item.alert,
    };
    handleBeachAlerts(params)
      .then(res => {
        const userToset = {
          token: token,
          user: res.data.data,
        };
        dispatch(setUser(userToset));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setbeachSwitchLoading(false));
  };

  const prevAmount = useRef({allAlertSwitch}).current;
  useEffect(() => {
    if (prevAmount.allAlertSwitch !== allAlertSwitch) {
      // process here
      setbeachSwitchLoading(true);

      allAlertsServe();
    }

    return () => {
      prevAmount.allAlertSwitch = allAlertSwitch;
    };
  }, [allAlertSwitch]);

  const allAlertsServe = () => {
    const params = {
      userId: user?.id,
      alert: allAlertSwitch,
    };
    handleAllAlerts(params)
      .then(({data}) => {
        const userToset = {
          token: token,
          user: data?.data,
        };
        dispatch(setUser(userToset));
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => setbeachSwitchLoading(false));
  };

  // useEffect(() => {
  //   handlePerLocation();
  // }, [perLocationSwitch]);

  // const handlePerLocation = () => {
  //   const params = {
  //     userId: user?.id,
  //     alert: perLocationSwitch,
  //   };
  //   handlePerLocationAlerts(params)
  //     .then(({data}) => {
  //       const userToset = {
  //         token: token,
  //         user: data.data,
  //       };
  //       dispatch(setUser(userToset));
  //     })
  //     .catch(err => {
  //       toastMessage('error', err?.response?.data?.message);
  //     });
  // };

  return (
    <View style={styles.container}>
      <Header header="Configure Alerts" navigation={navigation} />
      <CustomTitle title="ALERTS SETTINGS" />
      <View style={styles.childCont}>
        <NotificationItem
          text={'Enable Alerts'}
          value={allAlertSwitch}
          beachSwitchLoading={beachSwitchLoading}
          toggleSwitch={toggleAllALerts}
        />
        <View style={styles.notCont}>
          <Text style={styles.txt} numberOfLines={2}>
            Alert me when conditions are
          </Text>
          <GeneralButton
            title={(wveCondtn as any).name}
            txtColor={{fontSize: RF(13)}}
            cstyle={[styles.slectfilButon, {width: RF(82), height: 34}]}
            onPress={openConditionSheet}
          />
        </View>
        <View style={styles.notCont}>
          <Text style={styles.txt} numberOfLines={2}>
            Active Hours
          </Text>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontSize: RF(12)}}>
                {' '}
                {moment(user?.activeHours?.start).format('hh:mm A')}{' '}
                {' to ' + moment(user?.activeHours?.end).format('hh:mm A')}{' '}
                <M
                  name="arrow-forward-ios"
                  size={10}
                  color={THEME.colors.lightPrimary}
                />
              </Text>
            </Pressable>
          )}
        </View>
        {/* <CustomTitle title="LOCATION SETTINGS" />
        <NotificationItem
          text={'Enable Per Location Notifications'}
          value={perLocationSwitch}
          toggleSwitch={toggleLocationSwitch}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={user?.favoritesBeaches}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <NotificationItem
                index={index}
                beachIndex={beachIndex}
                beachSwitchLoading={beachSwitchLoading}
                text={item.placeName}
                value={item.alert}
                toggleSwitch={() => toggleBeachSwitch(item, index)}
              />
            );
          }}
        /> */}

        <TimeModal
          //   startime={setStime}
          //   endtime={setEndtime}
          modalVisible={modalVisible}
          closeModal={closeModal}
          onlyCloseModal={onlyCloseModal}
        />

        <CustomBottomSheet
          data={wveCondition}
          onSelect={selectCondition}
          ref={sheetRef}
        />
      </View>
    </View>
  );
};
const NotificationItem = ({
  index,
  beachIndex,
  beachSwitchLoading,
  text,
  value,
  toggleSwitch,
}: {
  index: Number;
  beachIndex: Number;
  beachSwitchLoading: Boolean;
  text: string;
  value: any;
  toggleSwitch: any;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  //   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.notCont}>
      <Text style={styles.txt} numberOfLines={2}>
        {text}
      </Text>
      {beachSwitchLoading && index == beachIndex ? (
        <View style={{paddingHorizontal: RF(20), paddingVertical: RF(4)}}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <Switch
          trackColor={{false: '#767577', true: THEME.colors.lightPrimary}}
          thumbColor={isEnabled ? THEME.colors.white : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={value}
        />
      )}
    </View>
  );
};

export default ConfigureAlert;
