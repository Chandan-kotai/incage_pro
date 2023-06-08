import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from '../utils/CustomButton';

const SplashSecond = ({ navigation }) => {
    const signIn = () => {
        navigation.navigate("signin");
    }

    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.head}>
                <Image style={styles.image} source={require("../assets/images/header.png")} />
            </View>
            <ImageBackground
                source={require('../assets/images/bodyimage.png')}
                style={styles.body}
                resizeMode="stretch"
            >
                <Text style={{ textAlign: "center", fontSize: 22, marginTop: 50, color: "#fff" }}>Deliver,</Text>
                <Text style={{ textAlign: "center", fontSize: 22, color: "#fff" }}>Seamlessly</Text>

                {/* //bottom part */}
                <View style={styles.bottom}>
                    <CustomButton btnText="Sign In" onPressFunc={signIn} btnWidth={120} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center",
    },
    head: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        width: '100%',
    },
    image: {
        width: 250,
        height: 80,
    },
    body: {
        flex: 6,
        position: "relative",
        alignItems: "center",
    },
    bottom: {
        position: "absolute",
        bottom: 90,
    }
})

export default SplashSecond
