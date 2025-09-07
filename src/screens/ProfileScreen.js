import { Image, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { colors } from "../utils";
import ProfileCard from "../components/ProfileCard";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { showMessage } from "../hooks/ShowMessage";
import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../navigation/AppRoutes";
import LanguageModal from "../components/modal/LanguageModal";
import { useTranslation } from "react-i18next";
import useAppStore from "../store";
import * as Linking from "expo-linking";
// Icons
import bg from "../assets/bg.png";
import men from "../assets/men.png";
import glob from "../assets/glob.png";
import privacy from "../assets/privacy.png";
import logout from "../assets/logout.png";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { userInfo, clearStorage } = useAppStore();
  const [languageModal, setlanguageModal] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(getAuth());
      clearStorage();
      navigation.reset({
        index: 0,
        routes: [{ name: AppRoutes.AUTHSCREEN }],
      });
    } catch (error) {
      showMessage("Error! Please check your internet connection", true);
    }
  }, [navigation, clearStorage]);

  const openPrivacyPolicy = useCallback(async () => {
    const url =
      "https://www.freeprivacypolicy.com/live/bc2824c3-ed98-46e9-a260-ffddb22afc18";
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        return showMessage("Error! Can't open this URL.", true);
      }
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
      showMessage("Error! Something went wrong while opening the URL.", true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.img} />
      <Image source={men} style={styles.men} />
      {userInfo?.displayName && (
        <Text style={styles.name}>{userInfo.displayName}</Text>
      )}
      {userInfo?.email && <Text style={styles.email}>{userInfo.email}</Text>}

      <View style={{ padding: 10 }}>
        <Text style={styles.preference}>{t("Preference")}</Text>
        <ProfileCard
          logo={glob}
          title={t("language")}
          onPress={() => setlanguageModal(true)}
        />
        <ProfileCard
          logo={privacy}
          title={t("privacy")}
          onPress={openPrivacyPolicy}
        />

        <ProfileCard
          logo={logout}
          title={t("Logout")}
          onPress={handleLogout}
          style={{ marginTop: 50 }}
        />
      </View>

      <LanguageModal visible={languageModal} setVisible={setlanguageModal} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 132,
    width: "100%",
  },
  men: {
    height: 90,
    width: 90,
    borderRadius: 42,
    marginTop: -45,
    alignSelf: "center",
  },
  preference: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.textPrimary,
    textAlign: "left",
    paddingBottom: 10,
    paddingTop: 20,
  },
  name: {
    color: colors.primary,
    fontSize: 16,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: 700,
  },
  email: {
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: "center",
    paddingTop: 10,
  },
});
