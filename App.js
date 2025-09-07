import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation";
import { I18nextProvider } from "react-i18next";
import LanguageHooks from "./src/hooks/LanguageHooks";
import { RootSiblingParent } from "react-native-root-siblings";

if (!__DEV__) {
  SplashScreen.setOptions({
    duration: 1000,
    fade: true,
  });
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RootSiblingParent>
      <I18nextProvider i18n={LanguageHooks}>
        <SafeAreaProvider style={{ backgroundColor: "#000" }}>
          <StatusBar style="light" />
          <SafeAreaView style={styles.container}>
            <RootNavigation />
          </SafeAreaView>
        </SafeAreaProvider>
      </I18nextProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
