import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import MapCard from '../../../../shared/components/common/mapCard';
import {RF} from '../../../../shared/exporter';
import {GenericNavigation} from '../../../../shared/models/types/interfaces';

// create a component
const ListView = ({navigation}: GenericNavigation) => {
  return <MapCard navigation={navigation} />;
};
export default ListView;
