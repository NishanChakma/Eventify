import { ScrollView, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import EventDescription from "../components/eventDetails/EventDescription";
import MapsView from "../components/eventDetails/MapsView";
import BookNow from "../components/eventDetails/BookNow";
import ImageSlider from "../components/eventDetails/ImageSlider";
import { colors } from "../utils/colors";
import useAppStore from "../store";

// icons
import calendarRound from "../assets/calendarRound.png";
import timeRound from "../assets/timeRound.png";
import locationRound from "../assets/locationRound.png";
import EventDetailsCard from "../components/EventDetailsCard";
import BackButton from "../components/BackButton";

dayjs.extend(utc);
dayjs.extend(timezone);

const EventDetailsScreen = () => {
  const { event } = useAppStore();

  // Helper functions
  const formatDate = (date) =>
    date ? dayjs(date).format("dddd, MMMM D") : "N/A";
  const formatYear = (date) => (date ? dayjs(date).format("YYYY") : "N/A");
  const formatTime = (date) =>
    date ? dayjs.utc(date).format("h:mm A") : "N/A";

  const venue = event?._embedded?.venues?.[0];
  const venueAddress = venue
    ? `${venue?.address?.line1 || ""}, ${venue?.city?.name || ""}`
    : "N/A";

  const classifications = Array.isArray(event?.classifications)
    ? event.classifications
    : [];

  const genresAndSegments = [
    //avoid duplicates
    ...new Set([
      ...classifications.map((c) => c?.genre?.name).filter(Boolean),
      ...classifications.map((c) => c?.segment?.name).filter(Boolean),
    ]),
  ].join(", ");

  return (
    <View style={styles.container}>
      <BackButton />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageSlider />

        <View style={styles.eventInfo}>
          <Text style={styles.title}>{event?.name ?? "Event Name"}</Text>
          <Text style={styles.subTitle}>
            {genresAndSegments ?? "Event Type"}
          </Text>
        </View>

        <EventDetailsCard
          logo={calendarRound}
          title={formatDate(
            event?.dates?.start?.startDateTime ?? event?.dates?.start?.dateTime
          )}
          description={formatYear(
            event?.dates?.start?.startDateTime ?? event?.dates?.start?.dateTime
          )}
        />
        <EventDetailsCard
          logo={timeRound}
          title={formatTime(
            event?.dates?.start?.startDateTime ?? event?.dates?.start?.dateTime
          )}
          description={`Doors open at ${formatTime(
            event?.dates?.access?.startDateTime ??
              event?.dates?.access?.dateTime ??
              event?.dates?.start?.dateTime
          )}`}
        />
        <EventDetailsCard
          logo={locationRound}
          title={venue?.name || "Venue"}
          description={venueAddress}
        />

        <EventDescription />
        <MapsView />
        <BookNow />
      </ScrollView>
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    paddingBottom: 20,
    overflow: "hidden",
  },
  eventInfo: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: "700",
    paddingBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "400",
    paddingBottom: 20,
  },
});
