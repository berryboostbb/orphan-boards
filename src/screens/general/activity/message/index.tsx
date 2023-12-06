//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {styles} from '../notification/style';
import {FlatList} from 'react-native-gesture-handler';
import Avatar from '../../../../shared/components/common/avatar';
import {mStyle} from './style';
import {
  actorIcon,
  capAvtarIcon,
  carAvtarIcon,
  chatAnimation,
  menAvtarIcon,
  tblAvtarIcon,
} from '../../../../assets';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';
import {useSelector} from 'react-redux';
import {getConsrvtnService} from '../../../../shared/exporter';
import LoadingAnimation from '../../../../shared/components/loadingAnimation';
import {toastMessage} from '../../../../shared/utils/constants';
import EmptyComponent from '../../../../shared/components/listEmptyComponent';
import moment from 'moment';
// create a component
const Message = ({navigation, route}: GenericNavigation) => {
  const {
    user: {
      user: {user},
    },
  } = useSelector((state: any) => state.root);
  const [Clist, setClist] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  const getAllConservation = () => {
    setLoader(true);
    getConsrvtnService(user?.id)
      .then(({data}) => {
        if (data?.data && data?.data?.length > 0) {
          setClist(data?.data);
          // setClist([]);
        }
      })
      .catch(err => {
        setLoader(false);
        toastMessage('error', err?.response?.data?.message);
      })
      .finally(() => {
        setRefresh(false);
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllConservation();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getAllConservation();
  }, []);
  console.log('llll...', Clist);

  const empty = () => {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  };

  return (
    <View style={mStyle.container}>
      {!loader ? (
        <FlatList
          data={Clist}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <EmptyComponent
              source={chatAnimation}
              message={'No conversation found.'}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            console.log(
              'uuuuuuu.........',
              moment(item?.lastMsgDate).fromNow(),
            );

            let otherUser = {};
            item?.members?.map(m => {
              if (m.id !== user?.id) {
                otherUser = m;
              }
            });

            let dataToSend = {};
            item.members.map((m: any) => {
              if (m.id !== user?.id) {
                dataToSend = {
                  _id: m.id,
                  firstName: m.firstName,
                  lastName: m.lastName,
                  profilePic: m.profilePic,
                };
              }
            });

            return (
              <TouchableOpacity
                style={mStyle.notfctnItem}
                onPress={() => navigation.navigate('chat', {item: dataToSend})}>
                <View style={mStyle.avtar}>
                  <Avatar source={{uri: otherUser?.profilePic}} />
                </View>
                <View style={mStyle.descrptn}>
                  {item.members.map((m: any) => (
                    <>
                      {m.id !== user.id && (
                        <Text numberOfLines={1} style={mStyle.msgName}>
                          {m.firstName} {m.lastName}
                        </Text>
                      )}
                    </>
                  ))}
                  {/* <Text numberOfLines={1} style={mStyle.msgName}>{"other"}</Text> */}
                  <Text numberOfLines={1} style={mStyle.msgtxt}>
                    {item.lastMsg}
                  </Text>
                </View>
                <View style={mStyle.unreadMsg}>
                  <Text style={mStyle.time}>
                    {moment(item?.lastMsgDate).fromNow()}
                  </Text>
                  {/* <View style={mStyle.msgcount}>

                                    <Text style={[mStyle.time, mStyle.msgcounttxt]}>{item.newMessage}</Text>
                                </View> */}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <LoadingAnimation visible={loader} />
      )}
    </View>
  );
};

export default Message;
