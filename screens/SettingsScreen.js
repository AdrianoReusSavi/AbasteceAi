import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { saveConfig, loadConfig } from '../services/configService';
import { clearTrips } from '../services/tripService';

export default function SettingsScreen() {
    const [fuelPrice, setFuelPrice] = useState('');
    const [kmPerLiter, setKmPerLiter] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            const config = await loadConfig();
            setFuelPrice(config.fuelPrice);
            setKmPerLiter(config.kmPerLiter);
        };
        fetchConfig();
    }, []);

    const handleSaveConfig = async () => {
        await saveConfig({ fuelPrice, kmPerLiter });
        alert('Configurações salvas com sucesso!');
    };

    const handleClearHistory = async () => {
        try {
            await clearTrips();
            alert('Histórico limpo com sucesso!');
        } catch (error) {
            alert('Erro ao limpar o histórico: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
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
            <Button title="Salvar Configurações" onPress={handleSaveConfig} />
            <Button title="Limpar Histórico" onPress={handleClearHistory} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});