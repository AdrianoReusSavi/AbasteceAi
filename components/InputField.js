import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  editable = true,
}) {
  return (
    <View style={styles.inputContainer}>
      {/* <Text>{label}</Text> */}
      <TextInput
        underlineStyle={{
          borderColor: "#3333",
        }}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={editable}
        label={label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    width: "80%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
