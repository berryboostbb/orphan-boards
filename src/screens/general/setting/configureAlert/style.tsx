import {StyleSheet } from 'react-native';
import { THEME,GST, RF } from '../../../../shared/exporter';
import {Notstyles} from '../notificationSetting/style'
export const styles = StyleSheet.create({
    ...Notstyles,
...GST,
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    backgroundColor: THEME.colors.white,
    },
    childCont:{
        flex:2
    },
    txt:{
        // width:RF(210),
        fontSize:RF(14),
        fontFamily:THEME.fonts.primary,
        color:THEME.colors.blck
    }
});