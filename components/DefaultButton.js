import { Button } from "react-native-paper";

export const DefaultButton = ({ children, mode = "contained", ...props }) => {
  return (
    <Button style={{ borderRadius: 4 }} {...props} mode={mode}>
      {children}
    </Button>
  );
};
