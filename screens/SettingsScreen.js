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
      <InputField
        style={{ width: "100%" }}
        label="Preço da Gasolina (R$/L):"
        value={fuelPrice}
        onChangeText={setFuelPrice}
        keyboardType="numeric"
      />
      <InputField
        style={{ width: "100%" }}
        label="Consumo do Veículo (km/L):"
        value={kmPerLiter}
        onChangeText={setKmPerLiter}
        keyboardType="numeric"
      />
      <ButtonGroup
        buttons={[
          { title: "Salvar", onPress: handleSaveConfig },
          { title: "Limpar Histórico", onPress: handleClearHistory },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
});
