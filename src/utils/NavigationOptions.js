import { Image, StyleSheet, Text, TouchableOpacity, View, Platform, Linking } from 'react-native'
import React from 'react'

const NavigationOptions = ({ cancel, coordinate }) => {
    const openGoogleMaps = ()=>{
        const url = `https://www.google.com/maps/search/?api=1&query=${coordinate?.latitude},${coordinate?.longitude}`;
        Linking.openURL(url)
    }

    const openAppleMaps = ()=>{

    }

    const openWazeMaps = ()=>{

    }

    return (
        <View style={{ alignItems: "center", paddingTop: 10 }}>

            {/* // Apple Map */}
            {Platform.OS === "ios" ?
                <TouchableOpacity onPress={openAppleMaps}>
                    <View style={[styles.card, { paddingHorizontal: 90 }]}>
                        <Image style={{ width: 16, height: 16 }} source={require("../assets/icons/applemap.png")} />
                        <Text style={styles.text}>Apple Map</Text>
                    </View>
                </TouchableOpacity>
                : null
            }
            {/* // separator */}
            {/* <View style={styles.separator}></View> */}

            {/* // Google Map */}
            {Platform.OS === "android" ?
                <TouchableOpacity onPress={openGoogleMaps}>
                    <View style={[styles.card, { paddingHorizontal: 85 }]}>
                        <Image style={{ width: 16, height: 16 }} source={require("../assets/icons/googlemap.png")} />
                        <Text style={styles.text}>Google Map</Text>
                    </View>
                </TouchableOpacity>
                : null
            }
            <View style={styles.separator}></View>

            {/* // Waze */}
            <TouchableOpacity onPress={openWazeMaps}>
                <View style={[styles.card, { paddingHorizontal: 108 }]}>
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
        marginVertical: 5,
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
    },
    card: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "rgba(0, 0, 0, 0.6)",
        shadowOffset: {
            width: 5,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingVertical: 10,
    }
})

export default NavigationOptions;