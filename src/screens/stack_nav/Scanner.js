import { SafeAreaView, StyleSheet, Text, View, Image, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../utils/CustomButton'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Scanner = ({ navigation }) => {
    const [isScan, setIsSacn] = useState(false);
    const [locData, setLocData] = useState(null);

    const scanBarCode = () => {
        setIsSacn(true);
        // navigation.navigate("deliverylist");
    }

    const onSuccess = (e) => {
        // console.log("event data=>", e);
        if (e?.data) {
            setLocData(JSON.parse(e.data));
            setIsSacn(false);
            navigation.navigate("deliverylist", {data: JSON.parse(e?.data)});
        }
    }

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
                            reactivateTimeout={3000}
                            containerStyle={{ alignItems: "center", justifyContent: "center" }}
                            cameraStyle={{ width: 300, height: 250 }}
                            showMarker={true}
                        // flashMode={RNCamera.Constants.FlashMode.torch}
                        />
                        : <Image style={{width: 300, height: 300}} source={require('../../assets/images/scanner1.gif')}/>
                    }
                </View>
                <CustomButton btnText={"Scan Barcode/QR code"} onPressFunc={scanBarCode} btnWidth={60} />
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
        backgroundColor: "#f9f7f1"
    },
})


export default Scanner
