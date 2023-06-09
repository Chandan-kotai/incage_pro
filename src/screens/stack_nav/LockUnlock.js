import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BleManager from "react-native-ble-manager"
import { Buffer } from 'buffer';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'


const LockUnlock = ({ devices, navigation }) => {
    const { lock_status } = useSelector(state => state.userSlice)
    // console.log(lock_status);
    const [isLock, setIsLock] = useState(lock_status[0] === "0" ? false : true);
    const lockunlock = ["0xf5", "0x61", "0x00", "0x01", "0x5f", "0xea", "0x34"];

    const serviceUUID = "fff0";
    const charUUIDWrite = "fff2";
    const charUUIDRead = "fff1";
    
    
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
    
    var lockCount = 0;
    const unlockLock = async () => {
        console.log("lockCount", lockCount);
        try {
            const isConnected = await BleManager.isPeripheralConnected(devices?.id, [serviceUUID]);
            // console.log("isConnected =>", isConnected);

            if (isConnected) {

                /* auth control */
                if (lockCount === 2) {
                    // navigation.replace("");
                    Alert.alert("Auth Revoked!");
                    lockCount = 0;
                } else {
                    // Increment lockCount
                    lockCount++;

                    /* lock unlock */
                    const result = await readWriteComm(lockunlock, devices);
                    console.log("lock/unlock =>", result);
                    setIsLock(!isLock);
                }
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

    // useEffect(() => {

    // }, [])

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
        color: "#00b050",
        fontWeight: "bold",
        letterSpacing: 4,
    }
})

export default LockUnlock;