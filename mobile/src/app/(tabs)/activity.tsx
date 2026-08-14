import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ActivityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={styles.overline}>
          SMART HOME
        </Text>

        <Text style={styles.title}>
          Activity
        </Text>

        <Text style={styles.subtitle}>
          Safety events, schedules and device activity.
        </Text>

        <View style={styles.card}>
          <Text style={styles.time}>
            Safety
          </Text>

          <Text style={styles.cardTitle}>
            Safety monitoring enabled
          </Text>

          <Text style={styles.text}>
            High-power appliances are protected by automatic cutoffs.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.time}>
            Scheduling
          </Text>

          <Text style={styles.cardTitle}>
            Automation service running
          </Text>

          <Text style={styles.text}>
            Scheduled lights are controlled by the backend.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F2",
  },

  page: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    padding: 20,
  },

  overline: {
    color: "#64748B",
    fontWeight: "800",
    letterSpacing: 2,
    fontSize: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#17211B",
    marginTop: 8,
  },

  subtitle: {
    color: "#7B847E",
    marginTop: 7,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
  },

  time: {
    color: "#2C7658",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  cardTitle: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "800",
    color: "#17211B",
  },

  text: {
    marginTop: 6,
    color: "#7B847E",
    lineHeight: 20,
  },
});