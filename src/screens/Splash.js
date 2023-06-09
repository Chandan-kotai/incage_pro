import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginByAsync } from '../services/slices/UserSlice'
import { useDispatch } from 'react-redux'

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {

    const getLoginData = async () => {
      const user = await AsyncStorage.getItem("@user");
      const token = await AsyncStorage.getItem("@token");

      const data = { user_details: JSON.parse(user), token: JSON.parse(token) }
      // console.log("user =>", data.user_details, data.token);

      setTimeout(() => {
        if (user != null) {
          // console.log("from if", user);
          dispatch(loginByAsync(data));
          navigation.replace("scanner");

          /* forn delivery list */
          // navigation.replace("deliverylist");
        } else {
          // console.log("from else", user);
          const withOutData = { user_details: null, token: null }
          dispatch(loginByAsync(withOutData))
          navigation.replace("splashsecond")
        }
      }, 2000);

      // return clearTimeout(startPage);
    }

    getLoginData()

  }, [])

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.logoWrap}>
        <Image style={styles.logo} source={require('../assets/images/splashE.png')} />
        <Text style={styles.logoText}>PRO</Text>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: {
    marginHorizontal: 20,
  },
  logo:{
    width: 350,
    height: 120,
  },
  logoText:{
    position: "absolute",
    bottom:0,
    right: 25,
    fontSize: 26,
    color: "#000",
    fontStyle: "italic"
  }
})

export default Splash
