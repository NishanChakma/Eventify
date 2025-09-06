import { StyleSheet, TextInput } from "react-native";
import { colors } from "../utils";

const HandleInput = ({
  fieldName,
  placeholder,
  value,
  setValue,
  type,
  secureTextEntry = false,
  width = "100%",
}) => {
  return (
    <TextInput
      style={[styles.input, { width: width }]}
      placeholder={placeholder ?? ""}
      placeholderTextColor="#888"
      value={value}
      onChangeText={(e) => setValue({ [fieldName]: e })}
      keyboardType={type ?? "default"}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
    />
  );
};

export default HandleInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputColor,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
    justifyContent: "center",
    alignSelf: "center",
  },
});
