import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getDeviceInfo } from '../services/slices/UserSlice';

const LocatePackage = ({navigation, cancellFunc}) => {
    const dispatch = useDispatch();
    const connectToDevice = () => {
        const formData = new FormData();
        formData.append("device_id", "SN:0000101592");
        dispatch(getDeviceInfo({formData, navigation}));
        cancellFunc();
    }

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 22, color: "#000", textAlign: "center", width: 230, marginTop: 10, fontWeight: "bold" }}>
                Are you in front of the
                incage™ ?
            </Text>
            <View style={styles.buttonWrap}>
                <TouchableOpacity style={styles.buttonYes}>
                    <Text style={{ color: "#000" }}>Not Yet</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonNo} onPress={() => connectToDevice()}>
                    <Text style={{ color: "#fff" }}>Yes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonWrap: {
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-between",
        marginTop: 40,

    },
    buttonYes: {
        backgroundColor: "#Fff",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderColor: "#CBCBCB",
        borderWidth: 2,
        marginRight: 20
    },
    buttonNo: {
        backgroundColor: "#2D75FF",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
        borderColor: "#CBCBCB",
        borderWidth: 2,
        marginLeft: 20
    }
})


export default LocatePackage;