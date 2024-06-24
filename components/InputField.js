import React from "react";
import { StyleSheet } from "react-native";
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
    <TextInput
      {...props}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={editable}
      label={label}
      style={[styles.input, props.style]}
      activeUnderlineColor={colors.secondary}
      underlineColor={colors.primary}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "white",
  },
});
