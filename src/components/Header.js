import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { colors } from "../utils";
import glob from "../assets/glob.png";
import useAppStore from "../store";
import LanguageModal from "../components/modal/LanguageModal";

const Header = () => {
  const [languageModal, setlanguageModal] = useState(false);
  const { lang } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Eventify</Text>
      <TouchableOpacity
        style={styles.flex}
        onPress={() => setlanguageModal(true)}
      >
        <Image source={glob} style={styles.glob} />
        <Text style={styles.lang}>{lang === "bn" ? "Bengali" : "English"}</Text>
      </TouchableOpacity>
      <LanguageModal visible={languageModal} setVisible={setlanguageModal} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 72,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomColor: colors.inputColor,
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: 700,
    letterSpacing: -1,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  glob: {
    height: 20,
    width: 20,
  },
  lang: {
    fontSize: 14,
    fontWeight: 400,
    paddingLeft: 5,
    color: colors.textSecondary,
  },
});
