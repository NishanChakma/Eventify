import { useState } from "react";
import { View, TextInput, StyleSheet, Image, Keyboard } from "react-native";
import { colors } from "../utils";
import { showMessage } from "../hooks/ShowMessage";
import PrimaryButton from "./PrimaryButton";
import Loading from "./LoadingScreen";
import API from "../services/api";
import { useTranslation } from "react-i18next";
import useAppStore from "../store";
// Icons
import searchIcon from "../assets/search.png";
import locationIcon from "../assets/location.png";

const SearchScreen = () => {
  const { t } = useTranslation();
  const { setEvents } = useAppStore();
  const [form, setForm] = useState({ query: "", city: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fetchData = async () => {
    if (!form.query.trim() && !form.city.trim()) {
      return showMessage("Please enter an event name or city to search.", true);
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const res = await API.getEvents(form.query, form.city);

      const events =
        res?.status === 200 && res?.data?._embedded?.events
          ? res.data._embedded.events
          : [];

      setEvents(events);

      if (events.length === 0) {
        showMessage("No events found matching your search.", true);
      }
    } catch (err) {
      showMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loading />}

      {/* Event Search Input */}
      <InputField
        icon={searchIcon}
        placeholder={t("searchEvents")}
        value={form.query}
        onChangeText={(text) => handleChange("query", text)}
      />

      {/* City Search Input */}
      <InputField
        icon={locationIcon}
        placeholder={t("searchCity")}
        value={form.city}
        onChangeText={(text) => handleChange("city", text)}
      />

      <PrimaryButton
        onPress={fetchData}
        title={t("search")}
        logo={searchIcon}
      />
    </View>
  );
};

const InputField = ({ icon, placeholder, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Image source={icon} style={styles.icon} />
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor="#888888"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputColor,
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  icon: {
    height: 22,
    width: 22,
    marginRight: 10,
    tintColor: colors.textPrimary,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
});

export default SearchScreen;
