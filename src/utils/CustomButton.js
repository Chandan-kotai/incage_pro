import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ btnText, onPressFunc, btnWidth }) => {
    return (
        <View style={styles.main}>
            <TouchableOpacity style={[styles.button, { paddingHorizontal: btnWidth }]} onPress={onPressFunc}>
                <Text style={styles.buttonText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        alignItems: "center",
    },
    button: {
        paddingVertical: 10,
        backgroundColor: "#2D75FF",
        borderRadius: 3
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    }
})

export default CustomButton
