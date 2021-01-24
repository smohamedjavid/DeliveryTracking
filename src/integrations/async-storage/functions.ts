import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: string | object) => {
  try {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    const savedData = await AsyncStorage.setItem(key, data);
    return savedData;
  } catch (error) {
    return undefined;
  }
};

const getItem = async (key: string) => {
  try {
    const retrievedData = await AsyncStorage.getItem(key);
    return retrievedData;
  } catch (error) {
    return undefined;
  }
};

const deleteItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return undefined;
  }
};

export const AsyncStorageApi = {
  setItem,
  getItem,
  deleteItem,
};
