import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import useAppStore from "../../store";

const EventDescription = () => {
  const { t } = useTranslation();
  const { event } = useAppStore();
  const [viewAll, setviewAll] = useState(true);

  if (!event?.info && !event?.pleaseNote) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.about}>{t("About")}</Text>
      {event?.info && (
        <Text
          style={styles.des}
          numberOfLines={viewAll ? 4 : undefined}
          ellipsizeMode="tail"
        >
          {event?.info}
        </Text>
      )}

      {event?.pleaseNote && (
        <Text
          style={styles.des}
          numberOfLines={viewAll ? 4 : undefined}
          ellipsizeMode="tail"
        >
          {event?.pleaseNote}
        </Text>
      )}

      <TouchableOpacity onPress={() => setviewAll((e) => !e)}>
        <Text style={styles.more}>
          {viewAll ? t("ReadMore") : t("Collapse")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDescription;
