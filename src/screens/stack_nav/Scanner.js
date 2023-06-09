import { SafeAreaView, StyleSheet, Text, View, Image, Alert, Linking, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../utils/CustomButton'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Scanner = ({ navigation }) => {
    const [isScan, setIsSacn] = useState(false);

    const scanBarCode = () => {
        setIsSacn(true);
        // navigation.navigate("deliverylist");
    }

    const onSuccess = (e) => {
        // console.log("event data=>", e);
        if (e?.data) {
            setIsSacn(false);
            navigation.navigate("map", { data: JSON.parse(e?.data) });

            /* for delivery list navigation */
            // navigation.navigate("deliverylist", {data: JSON.parse(e?.data)});
        }
    }

    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.head}>
                <Image style={styles.image} source={require("../../assets/images/header.png")} />
            </View>

            <View style={styles.body}>
                {/* scanner window */}
                <ImageBackground
                    source={require('../../assets/images/scannerfence.png')}
                    style={styles.imageWrap}
                    resizeMode="stretch"
                >
                    {isScan ?
                        <QRCodeScanner
                            onRead={(e) => onSuccess(e)}
                            reactivate={true}
                            reactivateTimeout={3000}
                            containerStyle={{ alignItems: "center", justifyContent: "center" }}
                            cameraStyle={{ width: 300, height: 250 }}
                            showMarker={true}
                        // flashMode={RNCamera.Constants.FlashMode.torch}
                        />
                        : <Image style={{ width: 250, height: 250 }} source={require('../../assets/images/scanner.gif')} />
                    }
                </ImageBackground>

                <View style={{marginTop: 60}}>
                    <CustomButton btnText={"Scan Barcode/QR code"} onPressFunc={scanBarCode} btnWidth={40} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
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
        // borderWidth: 1
    },
    imageWrap: {
        marginBottom: 80,
        // borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        width: 250,
        height: 250,
        // borderColor: "#2D75FF",
        borderRadius: 3,
        // backgroundColor: "#f9f7f1"
    },
})


export default Scanner
