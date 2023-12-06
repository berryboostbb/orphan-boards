import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

interface Props extends ViewProps {
  onPress: () => void;
  children: any;
  disableIt?: boolean;
}

const Touch = ({ onPress, children, style, disableIt }: Props) => {
  return (
    <TouchableOpacity
      disabled={disableIt ? disableIt : false}
      onPress={onPress}>
      <View style={[style ? style : null, disableIt ? { opacity: 0.5 } : null]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default Touch;
