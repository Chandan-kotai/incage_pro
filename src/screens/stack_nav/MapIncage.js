import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import StartNavigation from '../../utils/StartNavigation';
import NavigationOptions from '../../utils/NavigationOptions';
import LocatePackage from '../../utils/LocatePackage';

const MapIncage = ({ navigation, route }) => {
    const refRBSheet = useRef();
    const [isStart, setIsStart] = useState(true);

    const startNavigation = () => {
        setIsStart(false)
    }

    const locatePackage = () => {
        setIsStart(null)
    }

    const cancellFunc = () => {
        refRBSheet.current.close()
    }

    useEffect(() => {
        refRBSheet.current.open()
    }, [refRBSheet, isStart])

    return (
        <SafeAreaView style={styles.parent}>
            <View>
                <Image style={{}} source={require("../../assets/images/map.png")} />
                <RBSheet
                    height={isStart ? 150 : 230}
                    animationType='slide'
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                        draggableIcon: {
                            backgroundColor: "#A49F9F",
                            height: 3,
                            width: 50,
                        },

                    }}
                >
                    {isStart === true ?
                        <StartNavigation onPress={startNavigation} />
                        : null
                    }
                    {isStart === false ?
                        <NavigationOptions cancel={cancellFunc} onPress={locatePackage} />
                        : null
                    }
                    {isStart === null ?
                        <LocatePackage />
                        : null
                    }
                </RBSheet>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
})


export default MapIncage;