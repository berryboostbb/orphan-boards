import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {styles} from './style';
import Header from '../../../../../shared/components/auth/header/header';
import GeneralButton from '../../../../../shared/components/common/button/generalbutton';
import {RF, THEME} from '../../../../../shared/exporter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useSelector} from 'react-redux';

interface Props {
  // startime: any;
  // endtime: any;
  modalVisible: boolean;
  closeModal: (params: any) => void;
  onlyCloseModal: () => void;
}
const TimeModal = (props: Props) => {
  const {modalVisible, closeModal, onlyCloseModal} = props;
  const [seltme, setslectTme] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const {
    user: {
      user: {user, token},
    },
  } = useSelector((state: any) => state.root);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    if (seltme == 'firsttime') {
      setStartTime(date);

      // startime(date);
    }
    if (seltme == 'endtime') {
      // endtime(date);
      setEndTime(date);
      console.log('A date has been picked: ', date);
    }
    hideDatePicker();
  };
  const [selectedDay, setSelectedDay] = useState([]);

  let arr = [
    {
      title: 'M',
      value: 'Monday',
      name: 'monday',
    },
    {
      title: 'T',
      value: 'Tuesday',
      name: 'tuesday',
    },
    {
      title: 'W',
      value: 'Wednesday',
      name: 'wednesday',
    },
    {
      title: 'T',
      value: 'Thursday',
      name: 'thursday',
    },
    {
      title: 'F',
      value: 'Friday',
      name: 'friday',
    },
    {
      title: 'S',
      value: 'Saturday',
      name: 'saturday',
    },
    {
      title: 'S',
      value: 'Sunday',
      name: 'sunday',
    },
  ];

  useEffect(() => {
    let temp = [];
    for (var i = 0; i < arr.length; i++) {
      for (var k = 0; k < user?.activeDays?.length; k++) {
        if (arr[i].name == user?.activeDays[k].name) {
          console.log('hohhhoho', user.activeDays[k]);

          // arr[i].alert = true;
          if (user?.activeDays[k].alert == true) {
            temp.push(arr[i]);
          }
          break;
        }
      }
    }
    setSelectedDay(temp);
  }, []);

  const toggleSlectDay = (val: any) => {
    let cloneSlectday: any = [...selectedDay];
    let findInd = cloneSlectday.findIndex((i: any) => i.value == val.value);
    if (findInd < 0) {
      cloneSlectday = [val, ...cloneSlectday];
    } else {
      cloneSlectday.splice(findInd, 1);
    }
    setSelectedDay(cloneSlectday);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        visible={modalVisible}
        // onRequestClose={() => {
        //   closeModal();
        // }}
      >
        <Header
          header="Active Hours"
          modal={true}
          modalPress={onlyCloseModal}
          savBool={true}
          handleSave={() => closeModal(selectedDay, startTime, endTime)}
        />
        <View style={styles.childContainer}>
          <Text style={styles.acttxt}>Schedule Your Hours</Text>
          <View style={styles.actveHour}>
            {arr.map((val, inx) => {
              return (
                <GeneralButton
                  onPress={() => toggleSlectDay(val)}
                  key={inx}
                  title={val.title}
                  txtColor={[
                    !selectedDay.some((i: any) => i.value == val.value) && {
                      color: THEME.colors.lightPrimary,
                    },
                  ]}
                  cstyle={[
                    styles.filButon,
                    selectedDay.some((i: any) => i.value == val.value) &&
                      styles.slectfilButon,
                    styles.btn,
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.mt6}>
            <View style={styles.btncont}>
              <GeneralButton
                title="Select Start Time"
                txtColor={{color: THEME.colors.lightPrimary}}
                cstyle={styles.buttonstyle}
                onPress={() => {
                  setslectTme('firsttime');
                  showDatePicker();
                }}
              />
            </View>
            <View style={styles.btncont}>
              <GeneralButton
                title="Select End Time"
                txtColor={{color: THEME.colors.lightPrimary}}
                cstyle={styles.buttonstyle}
                onPress={() => {
                  setslectTme('endtime');
                  showDatePicker();
                }}
              />
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </Modal>
    </View>
  );
};

export default TimeModal;
