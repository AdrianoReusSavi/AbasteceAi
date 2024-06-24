import * as React from "react";
import { IconButton, MD3Colors } from "react-native-paper";

export const DefaultIconButton = ({ iconColor, ...props }) => (
  <IconButton iconColor={iconColor} style={{ borderRadius: 4 }} {...props} />
);
