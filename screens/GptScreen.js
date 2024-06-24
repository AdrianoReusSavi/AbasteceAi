import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import useApiHook from "../services/requisicaoGpt";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import { DefaultButton } from "../components/DefaultButton";
import { colors } from "../contants/colors";

function GptScreen() {
  const navigation = useNavigation();
  const { loading, data, error, callApi } = useApiHook();
  const [prompt, setPrompt] = useState("");

  const handlePress = async () => {
    if (prompt) {
      const finalPrompt = `Qual o consumo medio cidada/estrada de um ${prompt}, a resposta deve ser somente um valor numerico e tire o km/l do lado`;
      await callApi(finalPrompt);
      setPrompt("");
    }
  };

  const handleConfirm = () => {
    if (data) {
      const message = data.choices?.[0]?.message?.content || "Nada encontrado";
      navigation.navigate("Distance", { kmPerLiter: message });
    }
  };

  const renderResult = () => {
    if (!data) return null;
    const message = data.choices?.[0]?.message?.content || "Nada encontrado";
    return <Text>{message}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Qual o seu carro ?</Text>
      <InputField
        style={{ width: "100%" }}
        label="Digite o modelo do seu carro"
        value={prompt}
        onChangeText={setPrompt}
      />
      <View style={styles.input}>
        <Text style={styles.text}>(Ex: Cruze 2021 1.4turbo)</Text>
        <DefaultButton onPress={handlePress} disabled={loading}>
          {loading ? "Carregando..." : "Confirmar"}
        </DefaultButton>
      </View>

      <View style={styles.input}>
        <Text style={styles.req}>
          O consumo do seu carro é de: {renderResult()}{" "}
        </Text>
        {data && (
          <DefaultButton color={colors.secondary} onPress={handleConfirm}>
            Usar esse valor
          </DefaultButton>
        )}
      </View>
    </View>
  );
}

export default GptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  input: { width: "80%", marginTop: 20 },
  text: {
    textAlign: "center",
    marginBottom: 20,
  },
  text1: {
    fontSize: 25,
    marginBottom: 10,
  },
});
