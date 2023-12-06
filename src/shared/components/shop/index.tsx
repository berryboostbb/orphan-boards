//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {surf2Icon, SoldImage} from '../../../assets';
import {RF, THEME, deleteProduct} from '../../exporter';
import {GenericNavigation} from '../../models/types/interfaces';
import {toastMessage} from '../../../shared/utils/constants';
import {deleteUserProduct} from '../../../shared/redux/reducers/shopReducer';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// create a component
interface Props extends GenericNavigation {
  item: any;
  cusstyle: any;
  contStyle: any;
  flag: any;
}
const Surfingboard = ({
  item,
  navigation,
  cusstyle,
  contStyle,
  flag,
}: Partial<Props>) => {
  const dispatch = useDispatch();
  // console.log('iii.....iii...', item?.sold);

  const handleDeleteProduct = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteProductServe()},
    ]);
  };

  const deleteProductServe = () => {
    deleteProduct(item._id)
      .then(({data}) => {
        dispatch(deleteUserProduct(data?.data.id));
        toastMessage('success', data.msg);
      })
      .catch(err => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  const editProduct = () => {
    navigation?.navigate('addshop', {
      shopDetail: item,
      screenFlag: 'edit',
      productId: item._id,
    });
  };

  const SoldOut = () => {
    return (
      <View>
        <FastImage
          source={SoldImage}
          style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
          resizeMode={'contain'}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.itemCont, styles.boxShadow]}
      onPress={() => {
        if (item) {
          navigation?.navigate('shopDetail', {
            shopDetail: item,
            flag,
          });
        }
      }}>
      <View
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          flex: 1,
          width: '100%',
          borderRadius: 6,
        }}>
        {/* <Text>Product</Text>
         */}
        <FastImage
          source={item?.images[0] ? {uri: item?.images[0]} : surf2Icon}
          style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
          resizeMode={'contain'}>
          {flag == 'edit' && !item?.sold ? (
            <View style={styles.editView}>
              <TouchableOpacity
                style={[styles.editBtn, {marginRight: 7}]}
                onPress={handleDeleteProduct}>
                <MaterialIcons name="delete" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn} onPress={editProduct}>
                <MaterialIcons name="edit" size={16} />
              </TouchableOpacity>
            </View>
          ) : null}
          {/* <SoldOut /> */}
          {item?.sold && <SoldOut />}
        </FastImage>
      </View>
      <Text style={styles.txt} numberOfLines={1}>
        {item?.title}
      </Text>
    </TouchableOpacity>
    // <View style={[styles.itemCont, contStyle && contStyle]}>
    //   <TouchableOpacity
    //     style={[
    //       styles.itemImg,
    //       cusstyle && cusstyle,
    //       {backgroundColor: THEME.colors.lightSecondary1},
    //     ]}
    //     onPress={() => {
    //       if (item) {
    //         navigation?.navigate('shopDetail', {
    //           shopDetail: item,
    //           flag,
    //         });
    //       }
    //     }}>
    //     <FastImage
    //       source={item?.images[0] ? {uri: item?.images[0]} : surf2Icon}
    //       style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
    //       resizeMode={'contain'}>
    //       {flag == 'edit' ? (
    //         <View style={styles.editView}>
    //           <TouchableOpacity
    //             style={[styles.editBtn, {marginRight: 7}]}
    //             onPress={handleDeleteProduct}>
    //             <MaterialIcons name="delete" size={16} />
    //           </TouchableOpacity>
    //           <TouchableOpacity style={styles.editBtn} onPress={editProduct}>
    //             <MaterialIcons name="edit" size={16} />
    //           </TouchableOpacity>
    //         </View>
    //       ) : null}
    //     </FastImage>
    //   </TouchableOpacity>
    //   <Text style={styles.txt} numberOfLines={1}>
    //     {item?.title}
    //   </Text>
    // </View>
  );
};

// define your styles

//make this component available to the app
export default Surfingboard;
