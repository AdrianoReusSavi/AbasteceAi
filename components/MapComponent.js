import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function MapComponent({ location, origin, destination, routeCoords, onPress }) {
    if (!location) {
        return <Text>Carregando...</Text>;
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            onPress={onPress}
        >
            {origin && <Marker coordinate={origin} title="Origem" pinColor="green" />}
            {destination && <Marker coordinate={destination} title="Destino" pinColor="red" />}
            {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeColor="hotpink" strokeWidth={3} />}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});