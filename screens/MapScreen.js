import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import BottomTabBar from '../components/BottomTabBar';

export default function MapScreen({ navigation }) {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [selectingOrigin, setSelectingOrigin] = useState(true);
    const [routeCoords, setRouteCoords] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão para acessar a localização negada');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        if (selectingOrigin) {
            setOrigin({ latitude, longitude });
            setSelectingOrigin(false);
        } else {
            setDestination({ latitude, longitude });
            setSelectingOrigin(true);
            fetchRoute({ latitude, longitude });
        }
    };

    const handleClear = () => {
        setOrigin(null);
        setDestination(null);
        setRouteCoords([]);
        setSelectingOrigin(true);
    };

    const fetchRoute = async (destination) => {
        if (!origin) return;
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
        try {
            const response = await axios.get(url);
            const coordinates = response.data.routes[0].geometry.coordinates;
            const route = coordinates.map(([longitude, latitude]) => ({ latitude, longitude }));
            setRouteCoords(route);
            navigation.navigate('Distance', { distance: response.data.routes[0].distance / 1000 });
        } catch (error) {
            console.error('Erro ao calcular rota:', error);
        }
    };

    if (!location) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                onPress={handleMapPress}
            >
                {origin && (
                    <Marker
                        coordinate={origin}
                        title="Origem"
                        pinColor="green"
                    />
                )}
                {destination && (
                    <Marker
                        coordinate={destination}
                        title="Destino"
                        pinColor="red"
                    />
                )}
                {routeCoords.length > 0 && (
                    <Polyline
                        coordinates={routeCoords}
                        strokeColor="hotpink"
                        strokeWidth={3}
                    />
                )}
            </MapView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleClear}>
                    <Text style={styles.buttonText}>Limpar</Text>
                </TouchableOpacity>
            </View>
            <BottomTabBar state={{ routes: [{ name: 'Map' }, { name: 'Distance' }] }} descriptors={{}} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: [{ translateX: -75 }],
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    button: {
        width: 150,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});