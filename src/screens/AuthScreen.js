import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../navigation/AppRoutes";
import LoadingScreen from "../components/LoadingScreen";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../components/PrimaryButton";
import HandleInput from "../components/HandleInput";
import { colors, validateEmail, handleFirebaseError } from "../utils";
import { showMessage } from "../hooks/ShowMessage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "@react-native-firebase/auth";
import useStateReducer from "../hooks/useStateReducer";
import useAppStore from "../store";

const AuthScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { state, setState } = useStateReducer({
    isSignUp: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loading: false,
  });
  const { isSignUp, firstName, lastName, email, password, loading } = state;
  const { setUserInfo } = useAppStore();

  // ✅ Unified handler for Login & Signup
  const handleAuth = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // --- Validation ---
    if (isSignUp) {
      if (!firstName.trim())
        return showMessage("Please enter your first name!", true);
      if (!lastName.trim())
        return showMessage("Please enter your last name!", true);
    }

    if (!trimmedEmail) return showMessage("Please enter your email!", true);
    if (!validateEmail(trimmedEmail))
      return showMessage("Please enter a valid email address", true);

    if (!trimmedPassword)
      return showMessage("Please enter your password!", true);
    if (trimmedPassword.length < 6)
      return showMessage("Password must be at least 6 characters!", true);

    // --- Success ---
    handleFirebase(trimmedEmail, trimmedPassword);
  };

  const handleFirebase = async (email, password) => {
    setState({ loading: true });

    try {
      const auth = getAuth();
      let userCredential;

      if (isSignUp) {
        // 🔑 Firebase Signup
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update display name
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });

        showMessage("Account created successfully!");
      } else {
        // 🔑 Firebase Login
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        showMessage("Login successful!");
      }

      // Prepare user payload safely
      const user = userCredential.user;
      const payload = {
        displayName:
          user.displayName ||
          user.providerData?.[0]?.displayName ||
          `${firstName} ${lastName}`,
        email: user.email || email,
      };

      // Store in zustand
      setUserInfo(payload);

      // Navigate to main/home
      navigation.reset({
        index: 0,
        routes: [{ name: AppRoutes.HOMENAVIGATOR }],
      });
    } catch (err) {
      handleFirebaseError(err);
    } finally {
      setState({ loading: false });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {loading && <LoadingScreen />}
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Eventify</Text>
        <Text style={styles.des}>
          {isSignUp ? t("create") : t("SignInText")}
        </Text>

        {isSignUp && (
          <View style={styles.signup}>
            <HandleInput
              fieldName={"firstName"}
              placeholder={t("fisrtName")}
              value={firstName}
              setValue={setState}
              type="default"
              width="48%"
            />
            <HandleInput
              fieldName={"lastName"}
              placeholder={t("lastname")}
              value={lastName}
              setValue={setState}
              type="default"
              width="48%"
            />
          </View>
        )}

        <HandleInput
          fieldName={"email"}
          placeholder={t("Email")}
          value={email}
          setValue={setState}
          type="email-address"
          autoCapitalize="none"
        />
        <HandleInput
          fieldName={"password"}
          placeholder={t("Password")}
          value={password}
          setValue={setState}
          type="default"
          secureTextEntry
        />

        <PrimaryButton
          onPress={handleAuth}
          title={isSignUp ? t("SignUp") : t("Login")}
        />

        <TouchableOpacity onPress={() => setState({ isSignUp: !isSignUp })}>
          <Text style={styles.link}>
            {isSignUp ? t("haveAccount") : t("NoAccout")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: colors.primaryLight,
    fontWeight: "bold",
    marginBottom: 10,
  },
  des: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "600",
    marginBottom: 30,
  },
  link: {
    color: colors.primaryLight,
    marginTop: 20,
    fontSize: 14,
  },
  signup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
