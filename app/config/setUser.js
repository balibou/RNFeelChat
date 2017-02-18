/*import { AsyncStorage } from 'react-native';

export const setUserAsyncstorage = async (connected, user, changeUser, userInfo) => {
  try {
    AsyncStorage.getItem('userInfo', (err, result) => {
      if (connected && user) {
        if (!result) {
          AsyncStorage.setItem('userInfo', JSON.stringify(user));
          changeUser('INITIALISINGUSER', user);
        }
        if (JSON.stringify(result) !== JSON.stringify(user)) {
          AsyncStorage.setItem('userInfo', JSON.stringify(user));
          changeUser('INITIALISINGUSER', user);
        }
      } else if (!connected) {
        if(JSON.stringify(userInfo) !== result){
          const parsedUser = JSON.parse(result);
          changeUser('INITIALISINGUSER', parsedUser);
          console.log(userInfo);
          console.log(parsedUser);
        };
      }
    });
    // else {
      // if (userInfo === ''){
      //   AsyncStorage.getItem('userInfo', (err, result) => {
      //     console.log('result');
      //     changeUser('INITIALISINGUSER', JSON.parse(result));
      //   });
      // };
      // AsyncStorage.getItem('userInfo', (err, result) => {
      //   if(JSON.stringify(userInfo) !== JSON.stringify(result)){
      //     console.log('result');
      //     changeUser('INITIALISINGUSER', JSON.parse(result));
      //   };
      // });
    // }
  } catch (error) {
    console.log(error);
  }
};*/
