import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "react-i18next";
import openMaps from "../../assets/openMaps.png";
import useAppStore from "../../store";

const MapsView = () => {
  const { t } = useTranslation();
  const { event } = useAppStore();
  const latitude = event?._embedded?.venues?.[0]?.location?.latitude;
  const longitude = event?._embedded?.venues?.[0]?.location?.longitude;

  const openGoogleMapsApp = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening maps", err)
    );
  };

  if (!latitude || !longitude) {
    return (
      <View style={styles.container}>
        <Text style={styles.location}>{t("noLocation")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{t("Location")}</Text>

      {/* maps wont works in production due to no API key */}
      {__DEV__ && (
        <MapView
          style={{ height: 162, width: "100%", borderRadius: 4 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      )}

      <TouchableOpacity onPress={openGoogleMapsApp} style={styles.mapsButton}>
        <Image source={openMaps} style={{ height: 20, width: 20 }} />
        <Text style={styles.btnText}>{t("Open")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapsView;
