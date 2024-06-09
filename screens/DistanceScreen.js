import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import { addTrip } from '../services/tripService';
import { loadConfig } from '../services/configService';

export default function DistanceScreen({ route, navigation }) {
    const [distance, setDistance] = useState(route.params?.distance?.toFixed(2).toString() ?? '');
    const [fuelPrice, setFuelPrice] = useState('');
    const [kmPerLiter, setKmPerLiter] = useState('');
    const [totalCost, setTotalCost] = useState('');

    useEffect(() => {
        if (route.params?.distance !== undefined) {
            setDistance(route.params.distance.toFixed(2).toString());
        }
    }, [route.params?.distance]);

    useEffect(() => {
        const fetchConfig = async () => {
            const config = await loadConfig();
            setFuelPrice(config.fuelPrice);
            setKmPerLiter(config.kmPerLiter);
        };
        fetchConfig();
    }, []);

    const handleClear = async () => {
        setDistance('');
        setTotalCost('');
        const config = await loadConfig();
        setFuelPrice(config.fuelPrice);
        setKmPerLiter(config.kmPerLiter);
    };

    const calculateCost = () => {
        const distanceValue = parseFloat(distance.replace(',', '.'));
        const fuelPriceValue = parseFloat(fuelPrice.replace(',', '.'));
        const kmPerLiterValue = parseFloat(kmPerLiter.replace(',', '.'));

        if (!isNaN(distanceValue) && !isNaN(fuelPriceValue) && !isNaN(kmPerLiterValue)) {
            const litersNeeded = distanceValue / kmPerLiterValue;
            const calculatedCost = litersNeeded * fuelPriceValue;
            setTotalCost(calculatedCost.toFixed(2).toString());
        }
    };

    const handleSave = async () => {
        if (distance && totalCost && fuelPrice && kmPerLiter) {
            const tripData = {
                date: new Date(),
                distance: parseFloat(distance),
                fuelPrice: parseFloat(fuelPrice),
                kmPerLiter: parseFloat(kmPerLiter),
                totalCost: parseFloat(totalCost),
            };
            try {
                await addTrip(tripData);
                alert('Viagem salva com sucesso!');
                handleClear();
            } catch (error) {
                alert('Erro ao salvar a viagem: ' + error.message);
            }
        } else {
            alert('Por favor, preencha todos os campos antes de salvar.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Distância (km):</Text>
            <TextInput
                style={styles.input}
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
            />
            <Text>Preço da Gasolina (R$/L):</Text>
            <TextInput
                style={styles.input}
                value={fuelPrice}
                onChangeText={setFuelPrice}
                keyboardType="numeric"
            />
            <Text>Consumo do Veículo (km/L):</Text>
            <TextInput
                style={styles.input}
                value={kmPerLiter}
                onChangeText={setKmPerLiter}
                keyboardType="numeric"
            />
            <Text>Custo Estimado (R$):</Text>
            <TextInput
                style={styles.input}
                value={totalCost}
                editable={false}
            />
            <View style={styles.buttonContainer}>
                <Button title="Calcular Custo" onPress={calculateCost} />
                <Button title="Salvar" onPress={handleSave} />
                <Button title="Limpar" onPress={handleClear} />
            </View>
            <BottomTabBar state={{ routes: [{ name: 'Map' }, { name: 'Cálculo de Distância' }, { name: 'Histórico' }] }} descriptors={{}} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
});