import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BleManager from "react-native-ble-manager"
import { Buffer } from 'buffer';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'


const LockUnlock = ({ devices }) => {
    const { lock_status } = useSelector(state => state.userSlice)
    // console.log(lock_status);
    const [isLock, setIsLock] = useState(lock_status[0] === "0" ? false : true);
    const lockunlock = ["0xf5", "0x61", "0x00", "0x01", "0x5f", "0xea", "0x34"]; // F5 61 00 01 5F EA 34
    // const setlockman = ["0xf5", "0x64", "0x00", "0x01", "0x5f", "0xba", "0x01"]; // F5 64 00 01 5F BA 01

    const serviceUUID = "fff0";
    const charUUIDWrite = "fff2";
    const charUUIDRead = "fff1";
    // console.log(devices);

    const readWriteComm = async (payload, devices) => {
        const data = [];

        const buffer = Buffer.from(payload);

        try {
            await BleManager.write(devices?.id, serviceUUID, charUUIDWrite, buffer.toJSON().data);
            console.log("Write Success");

            await BleManager.startNotification(devices.id, serviceUUID, charUUIDRead);
            console.log("Notification started");

            const value = await BleManager.read(devices?.id, serviceUUID, charUUIDRead);
            const res = value.map(item => item.toString(16))
            // console.log('Characteristic response:', res);
            data.push(...res);
        } catch (error) {
            console.log("Failure code=>", error);
        }
        return data;
    }

    const unlockLock = async () => {
        try {
            const isConnected = await BleManager.isPeripheralConnected(devices?.id, [serviceUUID]);
            // console.log("isConnected =>", isConnected);
            if (isConnected) {

                // lock unlock
                const result = await readWriteComm(lockunlock, devices);
                console.log("lock/unlock =>", result);
                setIsLock(!isLock);
            } else {
                Toast.show({
                    type: "error",
                    text1: "Device is not Connected",
                    text2: "Please Connect to a Device First",
                });
            }
        } catch (exc) {
            console.log("Error =>", exc);
        }
    }

    useEffect(() => {

    }, [])

    return (
        <View style={styles.bodyWrap}>
            <View style={{ marginTop: 100 }}>
                <TouchableOpacity onPress={unlockLock}>
                    <Image
                        style={{ width: 300, height: 300 }}
                        source={!isLock ?
                            require("../../assets/icons/lock.png")
                            :
                            require("../../assets/icons/unlock.png")
                        }
                    />
                </TouchableOpacity>
            </View>
            <Text style={!isLock ? styles.lockText : styles.unlockText}>
                {!isLock ?
                    "LOCK"
                    :
                    "UNLOCK"
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyWrap: {
        alignItems: 'center',
    },
    lockText: {
        marginTop: 0,
        fontSize: 25,
        color: "#f00",
        fontWeight: "bold",
        letterSpacing: 4,
    },
    unlockText: {
        marginTop: 0,
        fontSize: 25,
        color: "#0f0",
        fontWeight: "bold",
        letterSpacing: 4,
    }
})

export default LockUnlock;