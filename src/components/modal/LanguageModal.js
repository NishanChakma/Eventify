import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../utils";
import i18n from "../../hooks/LanguageHooks";
import useAppStore from "../../store";
import close from "../../assets/close.png";
import { useCallback } from "react";

const options = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Bengali",
    value: "bn",
  },
];

const LanguageModal = ({ visible, setVisible }) => {
  const { lang, setLang } = useAppStore();

  const handleSelect = useCallback(
    (value) => {
      setLang(value);
      i18n.changeLanguage(value);
    },
    [setLang, i18n] // dependencies
  );

  return (
    <Modal
      hasBackdrop={true}
      backdropOpacity={0.5}
      backdropColor="black"
      isVisible={visible}
      style={styles.container}
    >
      <TouchableOpacity style={styles.close} onPress={() => setVisible(false)}>
        <Image source={close} style={{ height: 64, width: 64 }} />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioContainer}
            onPress={() => handleSelect(option.value)}
          >
            <View style={styles.radioCircle}>
              {lang === option.value && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    margin: 0,
  },
  close: {
    position: "absolute",
    top: 60,
    right: 10,
    zIndex: 3,
  },
  innerContainer: {
    backgroundColor: colors.background,
    width: "96%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 2,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textPrimary,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
