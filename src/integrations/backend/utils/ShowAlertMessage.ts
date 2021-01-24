import { Alert } from 'react-native';

export const showAlertMessage = (message: string) => {
  setTimeout(() => {
    Alert.alert('Error', message);
  }, 100);
};
