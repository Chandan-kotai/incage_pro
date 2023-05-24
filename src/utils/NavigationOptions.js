import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NavigationOptions = ({ cancel, onPress }) => {
    return (
        <View style={{ alignItems: "center" }}>

            {/* // Apple Map */}
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ width: 16, height: 16 }} source={require("../assets/icons/applemap.png")} />
                    <Text style={styles.text}>Apple Map</Text>
                </View>
            </TouchableOpacity>

            {/* // separator */}
            <View style={styles.separator}></View>

            {/* // Google Map */}
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, justifyContent: "center" }}>
                    <Image style={{ width: 16, height: 16 }} source={require("../assets/icons/googlemap.png")} />
                    <Text style={styles.text}>Google Map</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.separator}></View>

            {/* // Waze */}
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, justifyContent: "center" }}>
                    <Image style={{ width: 16, height: 16 }} source={require("../assets/icons/wazemap.png")} />
                    <Text style={styles.text}>Waze</Text>
                </View>
            </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.button} onPress={cancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: "#000",
        marginVertical: 10,
        width: "100%"
    },
    text: {
        color: "#000",
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#FE2E2E",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 120,
        borderRadius: 4,
    }
})

export default NavigationOptions;