import { AsyncStorage } from 'react-native';
import settings from './settings';

export const loadInitialTokenState = async (changeTokenStates) => {
  try {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, AsyncStorageList) => {
        const AsyncStorageObject = {};
        AsyncStorageList.map((result, index, store) => {
          const key = store[index][0];
          const value = store[index][1];
          AsyncStorageObject[key] = value;
          if (!AsyncStorageObject[settings.USER_TOKEN_KEY]) {
            AsyncStorage.setItem(settings.USER_ALREADY_SIGNED_UP, 'false');
            changeTokenStates('TOKENDOESNTEXIST');
          }
          if (
            AsyncStorageObject[settings.USER_TOKEN_KEY]
            && AsyncStorageObject[settings.USER_ALREADY_SIGNED_UP] === 'true'
          ) {
            changeTokenStates('TOKENEXISTS');
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
