import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { DefaultButton } from "./DefaultButton";
import { colors } from "../contants/colors";

export default function ButtonGroup({ buttons }) {
  return (
    <View style={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <DefaultButton key={index} onPress={button.onPress}>
          {button.title}
        </DefaultButton>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
