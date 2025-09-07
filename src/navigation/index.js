import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppRoutes from "./AppRoutes";
import { AuthScreen } from "../screens";
import { useEffect, useState } from "react";
import useAppStore from "../store";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import i18n from "../hooks/LanguageHooks";
import MainNavigator from "./MainNavigator";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const { userInfo, lang } = useAppStore();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: { ...DarkTheme.colors, background: "#000000ff" },
      }}
    >
      <Stack.Navigator
        initialRouteName={
          user && userInfo?.email
            ? AppRoutes.HOMENAVIGATOR
            : AppRoutes.AUTHSCREEN
        }
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name={AppRoutes.AUTHSCREEN} component={AuthScreen} />
        <Stack.Screen
          name={AppRoutes.HOMENAVIGATOR}
          component={MainNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
