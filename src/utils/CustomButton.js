import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ btnText, onPressFunc}) => {
    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.button} onPress={onPressFunc}>
                <Text style={styles.buttonText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        alignItems: "center",
    },
    button:{
        paddingHorizontal: 120,
        paddingVertical: 10,
        backgroundColor: "#2D75FF",
        borderRadius: 3
    },
    buttonText:{
        color:"#fff",
        textAlign: "center",
    }
})

export default CustomButton
