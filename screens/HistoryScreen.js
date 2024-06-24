import React, { useState, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getTrips } from "../services/tripService";
import { List, Divider } from "react-native-paper";
import BottomTabBar from "../components/BottomTabBar";
import { colors } from "../contants/colors";

const HistoryScreen = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchTrips = async () => {
        try {
          const tripsData = await getTrips();
          setTrips(tripsData);
        } catch (error) {
          console.error("Erro ao buscar histórico: ", error);
        }
      };

      fetchTrips();
    }, [])
  );

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date.seconds * 1000).toLocaleString("pt-BR", options);
  };

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;

    return (
      <List.Item
        title={`Data: ${formatDate(item.date)}`}
        description={`Distância: ${item.distance} km | Custo: R$ ${item.totalCost}`}
        onLongPress={() => setSelectedId(item.id)}
        titleStyle={isSelected && { color: "white" }}
        descriptionStyle={isSelected && { color: "white" }}
        style={[
          styles.tripItem,
          isSelected && { backgroundColor: colors.primary }, // Cor de fundo quando selecionado
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />} // Linha separadora entre os itens da lista
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tripItem: {
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 4,
    elevation: 2,
  },
});

export default HistoryScreen;
