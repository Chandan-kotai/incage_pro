import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import StartNavigation from '../../utils/StartNavigation';
import NavigationOptions from '../../utils/NavigationOptions';
import LocatePackage from '../../utils/LocatePackage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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
                {/* Map View */}
                <View style={{ flex: 1 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                    </MapView>
                </View>

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