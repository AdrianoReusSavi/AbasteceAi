import * as React from "react";
import { IconButton, MD3Colors } from "react-native-paper";

export const DefaultIconButton = ({ iconColor, ...props }) => (
  <IconButton style={{ borderRadius: 4 }} {...props} />
);
