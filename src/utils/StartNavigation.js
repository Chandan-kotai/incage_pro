import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const StartNavigation = ({onPress}) => {
    return (
        <View style={{ marginLeft: 20, marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 20, color: "#2D75FF" }}>14min</Text>
                <Text style={{ fontSize: 20, color: "#000" }}> (1.1 km)</Text>
            </View>
            <Text style={{ fontSize: 10, marginVertical: 5 }}>
                via Benaras Rd and Sithanath Bose Ln
            </Text>
            {/* <Button style={{width: 40}} title={"Start"} onPress={()=> setIsStart(true)} /> */}
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image style={{ width: 10, height: 10 }} source={require("../assets/icons/start.png")} />
                <Text style={{ fontSize: 10, color: "#fff", marginLeft: 5 }}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#2D75FF",
        width: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 7,
        borderRadius: 4,
    }
})

export default StartNavigation;