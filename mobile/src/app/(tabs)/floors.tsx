import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useDevices } from "../../hooks/useDevices";
import { useFloors } from "../../hooks/useFloors";

export default function FloorsScreen() {
  const { floors, loading: floorsLoading } = useFloors();
  const { devices, loading: devicesLoading } = useDevices();

  if (floorsLoading || devicesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading floors...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Floors</Text>
      <Text style={styles.subtitle}>Overview of each floor in your home</Text>

      {floors.map((floor) => {
        const floorDevices = devices.filter((device) => device.floorId === floor.id);

        return (
          <View key={floor.id} style={styles.card}>
            <Text style={styles.cardTitle}>{floor.name}</Text>
            <Text style={styles.cardMeta}>Level {floor.level}</Text>
            <Text style={styles.cardMeta}>{floor.rooms} rooms</Text>
            <Text style={styles.cardMeta}>{floorDevices.length} linked devices</Text>
          </View>
        );
      })}
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
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginTop: 20,
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 20,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  cardMeta: {
    marginTop: 6,
    color: "#4B5563",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
  },
  loadingText: {
    marginTop: 12,
    color: "#374151",
  },
});