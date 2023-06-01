import { SafeAreaView, StyleSheet, Text, View, Image, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../utils/CustomButton'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Scanner = ({ navigation }) => {
    const [isScan, setIsSacn] = useState(false);
    const [locData, setLocData] = useState(null);

    const scanBarCode = () => {
        // setIsSacn(true);
        // console.log("scan bar code");
        // console.log("scan bar code", isScan);
        navigation.navigate("map");
    }

    const onSuccess = (e) => {
        if (e?.data) {
            setLocData(JSON.parse(e.data));
            // setIsSacn(false);
            navigation.navigate("map");
        }
    }

    console.log("Location Data =>", locData);

    // useEffect(() => {

    // }, [])

    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.head}>
                <Image style={styles.image} source={require("../../assets/images/header.png")} />
            </View>

            <View style={styles.body}>
                {/* scanner window */}
                <View style={styles.imageWrap}>
                    {isScan ?
                        <QRCodeScanner
                            onRead={(e) => onSuccess(e)}
                            reactivate={true}
                            containerStyle={{ alignItems: "center", justifyContent: "center" }}
                            cameraStyle={{ width: 300, height: 250 }}
                            showMarker={true}
                        // flashMode={RNCamera.Constants.FlashMode.torch}
                        />
                        : <Image style={{}} source={require('../../assets/images/scanner.png')}/>
                    }
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
    imageWrap: {
        marginBottom: 80,
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        width: 306,
        height: 406,
        borderColor: "#2D75FF",
        borderRadius: 3,
    },
})


export default Scanner
