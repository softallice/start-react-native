npm start


# asyc

```javascript
 _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(
            key,
            value
          );
        } catch (error) {
          // Error saving data
        }
      };
    
      _retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };  

      _retrieveAll = async () => {
        try {
          const value = await AsyncStorage.getAllKeys();
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };  

      _storeClear = async () => {
        try {
          await AsyncStorage.clear();
        } catch (error) {
          // Error retrieving data
        }
      };  
`


# 오류 처리

