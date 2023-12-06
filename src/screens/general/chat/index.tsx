//import liraries
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';
import {GenericNavigation} from '../../../shared/models/types/interfaces';
import {styles} from './style';
import Header from '../../../shared/components/auth/header/header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GiftedChat, Composer} from 'react-native-gifted-chat';
import {
  renderAvatar,
  renderBubble,
  renderComposer,
  renderDay,
  renderInputToolbar,
  renderMessageText,
  renderSend,
} from './chatComponent';
import {useSelector} from 'react-redux';
import ListEmptyComponent from '../../../shared/components/listEmptyComponent';
import {chatAnimation} from '../../../assets';
import {
  checkConsrvtnService,
  createConsrvtnService,
  getMsgService,
} from '../../../shared/services';
import {toastMessage, SOCKET_URL} from '../../../shared/utils/constants';
import io from 'socket.io-client';
import LoadingAnimation from '../../../shared/components/loadingAnimation';
import moment from 'moment';
import {RF} from '../../../shared/exporter';

// let SOCKET: {
//   disconnect: () => void;
//   on: (
//     arg0: string,
//     arg1: {(data: any): void; (data: any): void; (data: any): void},
//   ) => void;
//   emit: (arg0: string, arg1: {toUserId: any; message: string}) => void;
// };

const Chat = ({navigation, route}: GenericNavigation) => {
  const {item}: any = route?.params;
  const [messages, setMessages] = useState<any>([]);
  const {
    user: {
      user: {user},
    },
  } = useSelector((state: any) => state.root);
  const [convId, setconvId] = useState(null);
  const insets = useSafeAreaInsets();
  const [chatLoading, setchatLoading] = useState(false);
  const SOCKET = useRef();

  useEffect(() => {
    initSocket();
    createConservation();
    // loadMessages(user.id);
    return () => {
      if (SOCKET) SOCKET?.current?.disconnect();
    };
  }, []);

  const loadMessages = async (id: any) => {
    await getMsgService(id)
      .then(({data}) => {
        let msgs = [];
        for (let msg of data.data) {
          console.log('....', moment(msg.createdAt).format('hh:mm'));

          let m = {
            _id: msg._id,
            text: msg.text,
            createdAt: msg.createdAt,
            user: {
              _id: msg.senderId.id,
              name: msg.senderId.firstName,
              avatar: msg.senderId?.profilePic,
            },
          };
          msgs.push(m);
        }
        setMessages(msgs);
      })
      .catch(err => {})
      .finally(() => setchatLoading(false));
  };

  const createConservation = async () => {
    let obj = {
      senderId: user?.id,
      receiverId: item?._id,
    };
    setchatLoading(true);
    await createConsrvtnService(obj)
      .then(({data}) => {
        setconvId(data.data._id);

        if (data?.data?.messageAvailable) {
          loadMessages(data?.data?._id);
        } else {
          setchatLoading(false);
        }
      })
      .catch(err => {});
  };

  React.useEffect(() => {}, [messages]);
  const initSocket = () => {
    try {
      // @ts-ignore
      SOCKET.current = io.connect(SOCKET_URL, {
        query: {
          userId: user.id,
        },
      });
      SOCKET.current.on('connect', function (data: any) {
        console.log('---------SOCKET-------->', 'CONNECTED');
      });

      SOCKET.current.emit('addUser', user?.id);

      SOCKET.current.on('getMessage', function (data: any) {
        console.log('.......', data);
        let m = {
          _id: data.msgId,
          // _id: data.msgId,
          text: data.text,
          createdAt: new Date().getTime(),
          user: {
            _id: data.senderId,
            // name: userDetails.fromUserName || '',
            avatar: item?.profilePic,
          },
        };
        // const messaagearay = [...messages];
        // messaagearay.unshift(m);
        // console.log(messaagearay, 'message array');
        setMessages((pre: any) => [m, ...pre]);
      });

      SOCKET.current.on('disconnect', function (data: any) {
        console.log('disconnected');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSend = (mess: any) => {
    let m = {
      _id: `${new Date().getTime()}`,
      text: mess[0]?.text,
      createdAt: new Date().getTime(),
      user: {
        _id: user.id,
        // name: msg.senderId.firstName,
        avatar: user.profilePic,
      },
    };

    let params = {
      msgId: m._id,
      conversationId: convId,
      senderId: user?.id,
      receiverId: item._id,
      text: mess[0]?.text,
    };

    setMessages([m, ...messages]);
    SOCKET.current.emit('sendMessage', params as any);
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <Header
        header={
          item?.firstName?.charAt(0)?.toUpperCase() +
          item?.firstName?.slice(1)?.toLowerCase() +
          ' ' +
          item?.lastName
        }
        navigation={navigation}
      />
      <View style={styles.childContnr}>
        <LoadingAnimation visible={chatLoading} />

        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: user?.id,
          }}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
          renderSend={renderSend}
          renderBubble={renderBubble}
          renderMessageText={renderMessageText}
          // renderTime={() => null}
          renderDay={renderDay}
          alwaysShowSend
          showUserAvatar
          // renderTime={props => renderTime(props)}
          renderChatEmpty={() => (
            <View style={{flex: 1, transform: [{scaleY: -1}]}}>
              <ListEmptyComponent source={chatAnimation} />
            </View>
          )}
          wrapInSafeArea={false}
        />
      </View>
    </View>
  );
};

// define your styles

//make this component available to the app
export default Chat;
