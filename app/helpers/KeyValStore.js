import AsyncStorage from '@react-native-community/async-storage'

const isEmpty = function (value) {
    console.log('Async storage start')
    if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};
  
// AsyncStorage get 함수 모듈
export const getItemFromAsync = (storageName) => {
    if (isEmpty(storageName)) {
        throw Error('Storage Name is empty');
}

return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageName, (err, result) => {
    if (err) {
        reject(err);
    }
    
    if (result === null) {
        resolve(null);
    }
    console.log('조회')
    resolve(JSON.parse(result));
    });
});
};

// AsyncStorage set 함수 모듈
export const setItemToAsync = (storageName, item) => {
    if (isEmpty(storageName)) {
        throw Error('Storage Name is empty');
}

return new Promise((resolve, reject) => {
    AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
    if (error) {
        reject(error);
    }
    console.log('입력성공')
    resolve('입력 성공');
    });
});
};

