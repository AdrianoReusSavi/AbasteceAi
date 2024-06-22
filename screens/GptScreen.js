import React, { useState  } from "react";
import { View, TextInput, Button, Text,StyleSheet} from "react-native";
import useApiHook from "../services/requisicaoGpt";
import { useNavigation } from '@react-navigation/native';

function GptScreen() {
  const navigation = useNavigation();
    const { loading, data, error, callApi } = useApiHook();
    const [prompt, setPrompt] = useState("");

    const handlePress = () => {
        if (prompt) {
          const finalPrompt = `Qual o consumo medio de um ${prompt}, a resposta deve ser somente um valor numerico e tire o km/l do lado`
            callApi(finalPrompt);
        }
    };

    const handleConfirm = () => {
      if (data) {
          const message = data.choices?.[0]?.message?.content || "No response content";
          navigation.navigate('Distance', { kmPerLiter: message });
      }
  };

    const renderResult = () => {
      if (!data) return null;
      const message = data.choices?.[0]?.message?.content || "No response content";
      return <Text>{message}</Text>;
     
  };

    return (
        <View style={styles.container}>
          <Text style={styles.text} >Qual o seu carro ?</Text>

          <View  style={styles.input} >
            <TextInput   style={styles.input}
                placeholder="Digite o modelo do seu carro"
                value={prompt}
                onChangeText={setPrompt}
            />
            <Text style={styles.text}  >(Ex: Cruize 2021 1.4turbo)</Text>
            <Button  onPress={handlePress} title={loading ? "Carregando..." : "Confirmar"} disabled={loading} />
            </View>
            
              <View style={styles.input} >
              <Text style={styles.req} >O consumo do seu carro é de: {renderResult()} </Text>
              {data && <Button title="Usar esse valor" onPress={handleConfirm} />}
                
              </View>
        </View>
    );
}

export default GptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
  },
  input:{
    marginTop:20,
  },
  text:{
    marginBottom:40,
  },
  req:{
    paddingTop:40,
  }
});

