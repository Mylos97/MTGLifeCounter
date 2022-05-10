import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e)
    }
}

// Atm only storing the which theme is selected
export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : {index:0}; // return standard 0 index if nothing is stored
    } catch(e) {
      console.log(e)
    }
}