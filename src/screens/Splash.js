import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {

  useEffect(() => {

    setTimeout(() => {
      navigation.replace("splashsecond")
    }, 3000)

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
