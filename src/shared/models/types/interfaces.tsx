import { Text, TextInputProps, TextProps } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export interface GenericNavigation {
  navigation: NavigationProp<any>;
  route?: RouteProp<any, any>;
}


export interface TextInputInterface extends TextInputProps {
}