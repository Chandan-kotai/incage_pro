import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert, PermissionsAndroid, NativeModules, NativeEventEmitter, Modal, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from '../../utils/CustomButton'
import BleManager from "react-native-ble-manager"
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LockUnlock from './LockUnlock';
import { setLockStatus } from '../../services/slices/UserSlice';

const payloadCSum = (payload) => {
    const decArr = payload?.map(item => parseInt(item, 16))
    return decArr.reduce((acc, cur) => acc + cur)
}

const createHexArr = (data) => {
    return data?.map(item => (item.charCodeAt(0)).toString(16))
}

const createPhoneData = (data) => {
    let lendiff = 12 - data?.length;
    let phnArr = []

    for (let i = 0; i < lendiff; i++) {
        data.unshift("0");
    }

    for (let i = 0; i < data.length; i += 2) {
        phnArr.push(data.slice(i, i + 2).join(''));
    }
    return phnArr;
}

const createAuthData = (phone, password) => {
    let authtype = ["01"];
    let phoneArr = createPhoneData(phone.split(""));
    let passwordArr = createHexArr(password.split(""))
    return [...authtype, ...phoneArr, ...passwordArr]
}

const encryptData = (payload, key,) => {
    let arr = payload.map(item => (parseInt(item, 16) ^ parseInt(key, 16)));
    // console.log("encrypted array=>", arr);
    return arr.map(item => item.toString(16).length < 2 ? "0" + item.toString(16) : item.toString(16))
}


const calCsum = (cmd, dlen, payload = []) => {
    const stx = "f5";
    const ask = "00";
    const etx = "5f";

    if (dlen === "00") {
        let csum = ((parseInt(stx, 16) + parseInt(cmd, 16) + parseInt(ask, 16) + parseInt(dlen, 16) + parseInt(etx, 16)) % 256).toString(16);
        let rvalue = (`${stx}${cmd}${ask}${dlen}${etx}${csum}`).split("");
        let newArr = []
        for (let i = 0; i < rvalue.length; i += 2) {
            newArr.push("0x" + rvalue.slice(i, i + 2).join(''));
        }
        return newArr;
    } else {
        if (payload) {
            let payloadsum = payloadCSum(payload);
            // console.log(payloadsum);
            let datasum1 = ((parseInt(stx, 16) + parseInt(cmd, 16) + parseInt(ask, 16) + parseInt(dlen, 16) + parseInt(etx, 16)) % 256);
            // console.log(typeof datasum1, datasum1);
            let datasum2 = (payloadsum % 256);
            // console.log(typeof datasum2, datasum2);
            let csum = (datasum1 + datasum2).toString(16).slice(-2);
            // console.log(typeof csum, csum);
            let payloadstr = payload.join("");
            let rvalue = (`${stx}${cmd}${ask}${dlen}${etx}${csum}${payloadstr}`).split("");
            let newArr = []
            for (let i = 0; i < rvalue.length; i += 2) {
                newArr.push("0x" + rvalue.slice(i, i + 2).join(''));
            }
            return newArr;
        } else {
            console.log("Empty Payload, Try Again");
        }
    }
}

const genAuthArray = (phone, password, cmd, dlen, key) => {
    let authdata = createAuthData(phone, password);
    let encdata = encryptData(authdata, key);
    // console.log("encrypted data in hex=>", encdata);
    if (encdata) {
        return calCsum(cmd, dlen, encdata)
    } else {
        console.log("Empty encArray, Please Try Again");
    }
}

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var devices;
const serviceUUID = "fff0";
const charUUIDWrite = "fff2";
const charUUIDRead = "fff1";
const randCode = ["0xf5", "0x20", "0x00", "0x00", "0x5f", "0x74"]; // F5 20 00 00 5F 74
const statusCheck = ["0xf5", "0x60", "0x00", "0x00", "0x5f", "0xb4"]; // F5 60 00 00 5F B4


const ConnectToDevice = ({ navigation }) => {
    const [isConnect, setIsConnect] = useState(true);
    const [isModal, setIsModal] = useState(false);
    const [isPermission, setIsPermission] = useState(null)
    const [isScanning, setIsScanning] = useState(false);
    const [bleLoader, setBleLoader] = useState(false)
    const { device_info } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();
    let retryConter = 0;


    useEffect(() => {
        requestPermission();

        if (isPermission === PermissionsAndroid.RESULTS.GRANTED) {
            BleManager.checkState().then(state => {
                if (state === "off") {
                    BleManager.enableBluetooth()
                        .then(() => {
                            // Success code
                            console.log("The bluetooth is already enabled or the user confirm");
                        })
                        .catch((error) => {
                            // Failure code
                            console.log("The user refuse to enable bluetooth");
                        })
                }
            });
        }

        BleManager.start({ showAlert: false }).then(() => {
            // Success code
            console.log("Module initialized");
        });

        let stopListener = BleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                setIsScanning(false);
                console.log('Scan is stopped');
                // setBleLoader(true);
                discoverPeripherals();
            },
        );

        return () => {
            stopListener.remove();
            setBleLoader(false)
        };

    }, [setBleLoader]);

    // const { user, token } = useSelector(state => state.authSlice);

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Incage™",
                    message: 'Allow the Incage™ App to access the device Location',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            )
            setIsPermission(granted);
        } catch (error) {
            Alert.alert("Error!!")
        }
    }

    const startScan = () => {

        BleManager.checkState().then(state => {
            if (state === "off") {
                BleManager.enableBluetooth()
                    .then(() => {
                        // Success code
                        console.log("The bluetooth is already enabled or the user confirm");
                    })
                    .catch((error) => {
                        // Failure code
                        console.log("The user refuse to enable bluetooth");
                    })
            }
        });

        if (!isScanning) {
            BleManager.scan([], 5, true)
                .then(() => {
                    console.log("scanning");
                    setIsScanning(true);
                    setBleLoader(null)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const discoverPeripherals = async () => {
        // console.log("device_info?.device_id =>", device_info?.device_id);
        try {
            const peripherals = await BleManager.getDiscoveredPeripherals();
            const list = peripherals.filter(device => device?.name?.includes(device_info?.device_id));
            devices = list[0];
            // console.log('List device =>', peripherals);
            // console.log('Connected to device =>', list);

            if (list[0]) {
                await BleManager.connect(list[0]?.id);
                Toast.show({
                    type: "success",
                    text1: "Device Connected",
                    text2: "Name: " + list[0]?.name + "    RSSI: -" + list[0]?.rssi + "dBm",
                });
                // console.log('Connected to device', list[0]);

                await BleManager.retrieveServices(list[0]?.id);
                setBleLoader(true);
                // console.log("deviceUser =>", userData);

                if (device_info?.pin && device_info?.phone && device_info?.password) {
                    console.log("from if");

                    // pairing password
                    const payload = device_info?.pin?.split("").map(item => (item.charCodeAt()).toString(16));
                    const pwsdPair = calCsum("0f", "04", payload);

                    const result1 = await readWriteComm(pwsdPair, list[0]);
                    console.log('result1:', result1);

                    if (result1[2] == "10") {

                        // get random code
                        let result2 = await readWriteComm(randCode, list[0]);
                        console.log('result2:', result2);
                        if (result2[2] == "10") {
                            // console.log("encryption key=>", result2.slice(-1));

                            // user athentication
                            let authArray = genAuthArray(device_info?.phone, device_info?.password, "21", "0d", result2.slice(-1));
                            // let authArray = genAuthArray("7679799964", "000000", "21", "0d", result2.slice(-1));
                            // console.log("auth array=>", authArray);
                            let result3 = await readWriteComm(authArray, list[0]);
                            console.log('result3:', result3);
                            if (result3[2] == "10") {

                                // status check
                                let result4 = await readWriteComm(statusCheck, list[0]);
                                console.log('result4:', result4);
                                if (result4[2] == "10") {
                                    dispatch(setLockStatus(result4.slice(6,)))
                                    setIsConnect(false);
                                }
                            }
                        }
                    }
                } else {
                    console.log("from else");
                    setIsModal(true);
                }

            } else {
                setBleLoader(false);
                Toast.show({
                    type: "error",
                    text1: "Please make sure your device is ON. ",
                    text2: "it is taking time to connect to device, Please try again!"
                });
            }
        } catch (error) {
            console.log('discoverPeripherals error:', error);
        }
    }


    const readWriteComm = async (payload, devices) => {
        const data = [];
        const buffer = Buffer.from(payload);
        // console.log(payload);
        try {
            await BleManager.write(devices?.id, serviceUUID, charUUIDWrite, buffer.toJSON().data);
            console.log("Write Success");

            await BleManager.startNotification(devices?.id, serviceUUID, charUUIDRead);
            console.log("Notification started");

            const value = await BleManager.read(devices?.id, serviceUUID, charUUIDRead);
            const res = value.map(item => item.toString(16))
            console.log('Characteristic response:', res);
            data.push(...res);
        } catch (error) {
            console.log("Failure code=>", error);
        }
        return data;
    }


    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.headWrap}>
                <TouchableOpacity onPress={() => { setIsConnect(true); setBleLoader(false) }}>
                    <Image style={{ width: 20, height: 20, marginLeft: 15, marginTop: 5 }} source={require("../../assets/icons/nav.png")} />
                </TouchableOpacity >
            </View>
            <View style={styles.head}>
                <Image style={styles.headImage} source={require("../../assets/images/header.png")} />
            </View>

            {isConnect === true ?
                <View style={styles.bodyWrap}>
                    <View style={{ marginTop: 100 }}>
                        <Image
                            style={{ width: 130, height: 130 }}
                            source={bleLoader === false ?
                                require("../../assets/icons/bconnect.png")
                                : bleLoader === null ?
                                    require("../../assets/icons/bconnecting.gif")
                                    :
                                    require("../../assets/icons/bconnected.png")
                            }
                        />
                    </View>
                    {bleLoader === false ?
                        <View style={{ marginTop: 80 }}>
                            <CustomButton btnText={"Tap to Connect"} onPressFunc={startScan} />
                        </View>
                        :
                        bleLoader === null ?
                            <Text style={{ marginTop: 20, }}>
                                Connecting...
                            </Text>
                            :
                            <Text style={{ marginTop: 20, }}>
                                Connected
                            </Text>
                        // null
                    }

                </View>
                : null
            }

            {isConnect === false ?
                <LockUnlock devices={devices} />
                :
                null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    headWrap: {
        width: "100%",
        // borderWidth: 1
    },
    head: {
        paddingVertical: 10,
        // borderWidth: 1
    },
    headImage: {
        width: 250,
        height: 80,
    },
    image: {
        width: 16,
        height: 16,
    },
    headText: {
        position: "absolute",
        alignSelf: "center",
        verticalAlign: "middle",
        top: "40%",
        color: "#fff",
        fontSize: 20,
    },
    imageBg: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding: 10,
        borderRadius: 50,
        marginRight: 15,
        marginTop: 5,
    },
    iconsWrap: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "100%",
        position: 'absolute',
        top: 0,
    },
    battery: {
        flexDirection: "row",
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    bodyWrap: {
        alignItems: 'center',
    },
    ModalWrap: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 20,
        marginTop: 70
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        margin: 6,
        textAlign: 'center',
        textTransform: "uppercase",
    },
    modalButton: {
        alignItems: 'center',
        paddingHorizontal: 40,
        backgroundColor: "#2D75FF",
        borderRadius: 3,
        marginTop: 10,
    },
    heading: {
        fontSize: 16,
        color: "#000",
        marginTop: 20,
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "flex-start",
        marginLeft: 15,
    },
    inputBox: {
        alignSelf: "stretch",
        marginHorizontal: 15,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 10,
    }
})

export default ConnectToDevice
