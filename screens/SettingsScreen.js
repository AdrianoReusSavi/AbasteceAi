import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { saveConfig, loadConfig } from "../services/configService";
import { clearTrips } from "../services/tripService";
import InputField from "../components/InputField";
import ButtonGroup from "../components/ButtonGroup";
import BottomTabBar from "../components/BottomTabBar";

export default function SettingsScreen({ navigation }) {
  const [fuelPrice, setFuelPrice] = useState("");
  const [kmPerLiter, setKmPerLiter] = useState("");

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
    Alert.alert("Configurações salvas com sucesso!");
  };

  const handleClearHistory = async () => {
    try {
      await clearTrips();
      Alert.alert("Histórico limpo com sucesso!");
    } catch (error) {
      Alert.alert("Erro ao limpar o histórico: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <InputField
          label="Preço da Gasolina (R$/L):"
          value={fuelPrice}
          onChangeText={setFuelPrice}
          keyboardType="numeric"
        />
        <InputField
          label="Consumo do Veículo (km/L):"
          value={kmPerLiter}
          onChangeText={setKmPerLiter}
          keyboardType="numeric"
        />
      </View>
      <ButtonGroup
        buttons={[
          { title: "Limpar Histórico", onPress: handleClearHistory },
          { title: "Salvar", onPress: handleSaveConfig },
        ]}
      />
      <BottomTabBar
        state={{
          routes: [
            { name: "Map" },
            { name: "Distance" },
            { name: "History" },
            { name: "Settings" },
          ],
        }}
        descriptors={{}}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginBottom: 10,
  },
});
