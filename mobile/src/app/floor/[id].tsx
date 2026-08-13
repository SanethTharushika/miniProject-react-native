import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FloorDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {id === "floor001"
          ? "Ground Floor"
          : id === "floor002"
          ? "First Floor"
          : "Second Floor"}
      </Text>

      <Text style={styles.subtitle}>
        Interactive floor layout
      </Text>

      <View style={styles.floorPlan}>
        <View style={styles.room}>
          <Text style={styles.roomTitle}>
            Living Room
          </Text>

          <TouchableOpacity style={styles.device}>
            <Text style={styles.deviceIcon}>💡</Text>
            <Text style={styles.deviceText}>
              Light
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.room}>
          <Text style={styles.roomTitle}>
            Kitchen
          </Text>

          <TouchableOpacity style={styles.device}>
            <Text style={styles.deviceIcon}>🔌</Text>
            <Text style={styles.deviceText}>
              Outlet
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.room}>
          <Text style={styles.roomTitle}>
            Bedroom
          </Text>

          <TouchableOpacity style={styles.device}>
            <Text style={styles.deviceIcon}>💡</Text>
            <Text style={styles.deviceText}>
              Light
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.room}>
          <Text style={styles.roomTitle}>
            Security
          </Text>

          <TouchableOpacity style={styles.device}>
            <Text style={styles.deviceIcon}>📷</Text>
            <Text style={styles.deviceText}>
              Camera
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FB",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,
    marginBottom: 20,
    color: "#6B7280",
  },

  floorPlan: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  room: {
    width: "48%",
    height: 180,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 12,
  },

  roomTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },

  device: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  deviceIcon: {
    fontSize: 35,
  },

  deviceText: {
    marginTop: 8,
    color: "#374151",
    fontWeight: "600",
  },
});