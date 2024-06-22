import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Button,Text } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import { addTrip } from '../services/tripService';
import { loadConfig } from '../services/configService';
import InputField from '../components/InputField';
import ButtonGroup from '../components/ButtonGroup';
import InputFieldConsumo from '../components/InputFieldConsumo';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

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

    useEffect(() => {
        if (route.params?.kmPerLiter !== undefined) {
            setKmPerLiter(route.params.kmPerLiter);
        }
    }, [route.params?.kmPerLiter]);

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
                Alert.alert('Viagem salva com sucesso!');
                handleClear();
            } catch (error) {
                Alert.alert('Erro ao salvar a viagem: ' + error.message);
            }
        } else {
            Alert.alert('Por favor, preencha todos os campos antes de salvar.');
        }

    };

    return (
        <View style={styles.container}>
            <InputField label="Distância (km):" value={distance} onChangeText={setDistance} keyboardType="numeric" />
            <InputField label="Preço da Gasolina (R$/L):" value={fuelPrice} onChangeText={setFuelPrice} keyboardType="numeric" />

            <View style={styles.modal}>
                <InputFieldConsumo label="Consumo do Veículo (km/L):" value={kmPerLiter} onChangeText={setKmPerLiter} keyboardType="numeric" />
                <Button
                    style={styles.botaoInterrogação}
                    title='press'
                    onPress={() => navigation.navigate('GptScreen')}
                />
            </View>

            <InputField label="Custo Estimado (R$):" value={totalCost} editable={false} />
            <ButtonGroup buttons={[
                { title: "Calcular Custo", onPress: calculateCost },
                { title: "Salvar", onPress: handleSave },
                { title: "Limpar", onPress: handleClear }
            ]} />
            <BottomTabBar state={{ routes: [{ name: 'Map' }, { name: 'Distance' }, { name: 'History' }, { name: 'Settings' }] }} descriptors={{}} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        //backgroundColor: "red",
        flexDirection: "row",
        alignItems: 'center',
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    botaoInterrogação: {
    
    }
});
