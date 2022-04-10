import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
}

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      jsonValue.then((value) => console.log(value))
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}