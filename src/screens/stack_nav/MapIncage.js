import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import StartNavigation from '../../utils/StartNavigation';
import NavigationOptions from '../../utils/NavigationOptions';
import LocatePackage from '../../utils/LocatePackage';
import MapView, { Marker } from 'react-native-maps';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

    const onChangeRegion = (region) => {
        console.log(region.latitude + " " + region.longitude);
    }

    useEffect(() => {
        refRBSheet.current.open()
    }, [refRBSheet, isStart])

    return (
        <SafeAreaView style={styles.parent}>
            <View>
                {/* Map View */}
                <View style={{}}>
                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{ borderWidth: 1, width: "100%", height: "100%", }}
                        region={{
                            latitude: 22.56812764180996,
                            longitude: 88.43338625505567,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                            // latitudeDelta: 0.015,
                            // longitudeDelta: 0.0121,
                        }}
                        onRegionChange={onChangeRegion}
                    >
                        <Marker
                            draggable
                            coordinate={{ latitude: 22.568546189065163, longitude: 88.43366352841258 }}
                            title={"Kotai Electronics"}
                            description={"5th Floor, Systron Building, Near RDB Cinema, Sector V, Kolkata, West Bengal 700091"}
                        />
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
        // alignItems: "center",
        // justifyContent: "center",

    },
})


export default MapIncage;