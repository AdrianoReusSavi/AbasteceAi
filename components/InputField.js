import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../contants/colors";

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  editable = true,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      {/* <Text>{label}</Text> */}
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={editable}
        label={label}
        style={{ backgroundColor: "white" }}
        activeUnderlineColor={colors.secondary}
        placeholderTextColor={"#00ee"}
        underlineColor={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
