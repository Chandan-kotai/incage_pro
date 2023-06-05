import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image, PermissionsAndroid, Linking, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import StartNavigation from '../../utils/StartNavigation';
import NavigationOptions from '../../utils/NavigationOptions';
import LocatePackage from '../../utils/LocatePackage';
import MapView, { Circle, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../services/config/GoogleMapApi';
import * as geolib from 'geolib';

const MapIncage = ({ navigation, route, }) => {
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongitude, setCurrentLongitude] = useState('');
    const refRBSheet = useRef();
    const mapRef = useRef();
    const [isStart, setIsStart] = useState(true);
    const { data } = route?.params;
    const { location, device_id } = data;


    const origin = {
        latitude: Number(currentLatitude),
        longitude: Number(currentLongitude),
        latitudeDelta: 0.026,
        longitudeDelta: 0.009,
    }

    const destination = {
        latitude: Number(location?.latitude),
        longitude: Number(location?.longitude),
        latitudeDelta: 0.026,
        longitudeDelta: 0.009,
    }

    const startNavigation = () => {
        setIsStart(false)
    }

    const cancellFunc = () => {
        refRBSheet.current.close()
    }

    const onChangeRegion = (region) => {
        const curCoordinates = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.026,
            longitudeDelta: 0.009,
        }
        isInsideCircle(curCoordinates)
    }

    const isInsideCircle = (curCoordinates) => {
        const res = geolib.isPointWithinRadius(
            curCoordinates,
            destination,
            100
        );

        if(res){
            Alert.alert("Reached");
        }else{
            Alert.alert("not yet Reached");
        }

        console.log("isInsideCircle =>", res);
    }

    useEffect(() => {

        refRBSheet.current.open();

        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Incage™",
                        message: 'Incage™ App Need to Access the Device Location',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(position => {
                        let lat = JSON.stringify(position.coords.latitude);
                        // console.log(lat);
                        setCurrentLatitude(lat);
                        let long = JSON.stringify(position.coords.longitude);
                        // console.log(long);
                        setCurrentLongitude(long);
                    }, (error) => {
                        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
                    },
                    )

                } else {
                    Alert.alert("Permission Denied!!!")
                }
            } catch (err) {
                console.log(err);
            }
        }

        requestLocationPermission()
    }, [refRBSheet, isStart])

    return (
        <SafeAreaView style={styles.parent}>
            <View>
                {/* Map View */}
                <View style={{}}>
                    <MapView
                        ref={mapRef}
                        style={{ width: "100%", height: "100%", }}
                        region={origin}
                        onRegionChange={onChangeRegion}
                    >
                        <Marker
                            // draggable
                            coordinate={origin}
                            image={require("../../assets/icons/pointer.png")}
                        />

                        <Marker
                            // draggable
                            coordinate={destination}
                            title={device_id}
                            description={"plot no.54 &55, Street Number 18, DN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091"}
                            image={require("../../assets/icons/locationlock.png")}
                        />

                        <Circle
                            center={destination}
                            radius={100}
                            strokeWidth={2}
                            strokeColor="#0ca33d"
                            fillColor="#dfe6e9"
                        />

                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            optimizeWaypoints={true}
                            onReady={res => {
                                console.log("distance=>", res.distance);
                                console.log("duration=>", res.duration);

                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: 30,
                                        bottom: 200,
                                        left: 30,
                                        top: 200,
                                    }
                                })
                            }}
                        />

                    </MapView>
                </View>

                <RBSheet
                    height={isStart ? 150 : 230}
                    animationType='slide'
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
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
                        <NavigationOptions cancel={cancellFunc} coordinate={{ latitude: 22.57837969499716, longitude: 88.43033557757735 }} />
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