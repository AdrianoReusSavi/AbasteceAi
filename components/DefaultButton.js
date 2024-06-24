import { Button } from "react-native-paper";
import { colors } from "../contants/colors";

export const DefaultButton = ({
  children,
  mode = "contained",
  color = colors.primary,
  ...props
}) => {
  return (
    <Button
      style={{ borderRadius: 4, backgroundColor: color }}
      {...props}
      mode={mode}
    >
      {children}
    </Button>
  );
};
