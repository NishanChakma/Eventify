import { memo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../utils";

const EventDetailsCard = memo(({ logo, title, description }) => (
  <View style={styles.cardContainer}>
    <Image source={logo} style={styles.cardLogo} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </View>
));

export default EventDetailsCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
    width: "100%",
  },
  cardLogo: {
    width: 42,
    height: 42,
  },
  cardTextContainer: {
    paddingLeft: 10,
    paddingRight: 40,
    overflow: "hidden",
    width: "100%",
  },
  cardTitle: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "400",
    paddingTop: 2,
  },
});
