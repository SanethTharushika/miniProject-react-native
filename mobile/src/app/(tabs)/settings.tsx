import { router } from "expo-router";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <Text style={styles.overline}>
          SMART HOME
        </Text>

        <Text style={styles.title}>
          Settings
        </Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            router.push("/automation")
          }
        >
          <View>
            <Text style={styles.optionTitle}>
              Automation
            </Text>

            <Text style={styles.optionText}>
              Schedules and automatic controls
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            router.push("/reports")
          }
        >
          <View>
            <Text style={styles.optionTitle}>
              Reports
            </Text>

            <Text style={styles.optionText}>
              Device usage and statistics
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.option}>
          <View>
            <Text style={styles.optionTitle}>
              Backend Status
            </Text>

            <Text style={styles.optionText}>
              Safety monitoring connected
            </Text>
          </View>

          <View style={styles.onlineDot} />
        </View>
      </View>
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
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "800",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 25,
    color: "#17211B",
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#17211B",
  },

  optionText: {
    color: "#7B847E",
    marginTop: 5,
    fontSize: 13,
  },

  arrow: {
    fontSize: 30,
    color: "#9CA3AF",
  },

  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2C7658",
  },
});