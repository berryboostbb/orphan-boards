import React, {forwardRef, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import {THEME, GST, RF, HP} from '../../../exporter';

const {gray} = THEME.colors;

interface Props {
  data: Array<any>;
  onSelect: (item: any) => void;
}

const CustomBottomSheet = forwardRef(({data, onSelect}: Props, ref: any) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const listRef: any = useRef();

  const updateResult = (query: string) => {
    setSearchText(query);
    if (query) {
      const results: any = data.filter((item: any) =>
        item.name.toLowerCase().match(query.toLowerCase()),
      );
      setSearchResult(results);
      console.log('resulsts', results);
    } else {
      //   setSearchResult(data)
    }
  };

  const selectionHandler = (item: any) => {
    onSelect(item);
    ref.current.hide();
  };

  const onClose = () => {
    setSearchText('');
  };

  const onOpen = () => {
    listRef.current?.setNativeProps({
      scrollEnabled: true,
    });
  };

  return (
    <ActionSheet
      ref={ref}
      onOpen={onOpen}
      onClose={onClose}
      headerAlwaysVisible
      statusBarTranslucent
      bounceOnOpen={true}
      keyboardShouldPersistTaps={'always'}
      bounciness={4}
      extraScroll={50}
      defaultOverlayOpacity={0.3}>
      <View style={styles.mainContainer}>
        <ScrollView
          ref={listRef}
          nestedScrollEnabled
          keyboardShouldPersistTaps={'always'}>
          <TextInput
            value={searchText}
            placeholder={'Search'}
            onChangeText={updateResult}
            style={styles.input}
          />

          <FlatList
            data={searchText ? searchResult : data}
            style={GST.px2}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item, index}) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.itemSubContainer}
                  onPress={() => selectionHandler(item)}>
                  <Text style={{fontSize: RF(13)}}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    overflow: 'scroll',
    maxHeight: HP(60),
    height: HP(40),
    paddingBottom: RF(20),
    marginVertical: RF(10),
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderColor: gray,
    paddingHorizontal: RF(10),
  },
  itemSubContainer: {
    paddingVertical: RF(14),
  },
  input: {
    borderWidth: 0.5,
    borderColor: gray,
    padding: RF(10),
    borderRadius: RF(8),

    fontSize: RF(14),
    marginBottom: RF(10),
    ...GST.mx2,
  },
});

export default CustomBottomSheet;
