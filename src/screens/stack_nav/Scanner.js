import { SafeAreaView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React from 'react'
import CustomButton from '../../utils/CustomButton'

const Scanner = ({ navigation }) => {

    const scanBarCode = () => {
        navigation.navigate("map")
    }

    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.head}>
                <Image style={styles.image} source={require("../../assets/images/header.png")} />
            </View>

            <View style={styles.body}>
                <View style={styles.imageWrap}>
                    <Image style={styles.scannerlogo} source={require("../../assets/images/scanner.png")} />
                </View>
                <CustomButton btnText={"Scan Barcode"} onPressFunc={scanBarCode} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "center",
    },
    head: {
        paddingVertical: 10,
    },
    image: {
        width: 250,
        height: 80,
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageWrap:{
        marginBottom: 120,
        borderWidth: 3,
    },
    scannerlogo: {
        width: 200,
        height: 200
    }
})


export default Scanner
