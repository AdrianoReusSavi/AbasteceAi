import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTrips } from '../services/tripService';
import BottomTabBar from '../components/BottomTabBar';

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date.seconds * 1000).toLocaleDateString(undefined, options);
};

export default function HistoryScreen({ navigation }) {
    const [trips, setTrips] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchTrips = async () => {
                try {
                    const tripsData = await getTrips();
                    setTrips(tripsData);
                } catch (error) {
                    console.error('Erro ao buscar histórico: ', error);
                }
            };

            fetchTrips();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={trips}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tripItem}>
                        <Text>Data: {formatDate(item.date)}</Text>
                        <Text>Distância: {item.distance} km</Text>
                        <Text>Custo: R$ {item.totalCost}</Text>
                    </View>
                )}
            />
            <BottomTabBar state={{ routes: [{ name: 'Map' }, { name: 'Cálculo de Distância' }, { name: 'Histórico' }] }} descriptors={{}} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    tripItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
});