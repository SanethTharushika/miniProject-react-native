import { useLocalSearchParams } from "expo-router";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDevices } from "../../hooks/useDevices";

export default function CameraDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { devices } = useDevices();

  const camera = devices.find(
    (device) => device.id === id
  );

  if (!camera) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Camera not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {camera.name}
          </Text>

          <Text style={styles.subtitle}>
            {camera.room ?? "Unknown location"}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            camera.status === "ON"
              ? styles.liveBadge
              : styles.offlineBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {camera.status === "ON"
              ? "● LIVE"
              : camera.status}
          </Text>
        </View>
      </View>

      <View style={styles.cameraFrame}>
        {camera.status === "ON" ? (
          <Image
            source={require(
              "../../../assets/cameras/front-door.jpg"
            )}
            style={styles.cameraImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.offlineView}>
            <Text style={styles.offlineIcon}>
              📷
            </Text>

            <Text style={styles.offlineTitle}>
              Camera unavailable
            </Text>

            <Text style={styles.offlineText}>
              Current status: {camera.status}
            </Text>
          </View>
        )}

        {camera.status === "ON" && (
          <>
            <View style={styles.cameraLabel}>
              <Text style={styles.cameraLabelText}>
                CAM 01
              </Text>
            </View>

            <View style={styles.timestamp}>
              <Text style={styles.timestampText}>
                SMARTNEST • FRONT ENTRANCE
              </Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.infoCard}>
        <InfoRow
          label="Camera"
          value={camera.name}
        />

        <InfoRow
          label="Location"
          value={camera.room ?? "Unknown"}
        />

        <InfoRow
          label="Floor"
          value={camera.floorId}
        />

        <InfoRow
          label="Status"
          value={camera.status}
        />

        <InfoRow
          label="Feed Type"
          value="Mock CCTV Snapshot"
        />
      </View>

      <Text style={styles.note}>
        This is a simulated CCTV snapshot for
        the Smart Home hardware simulation.
      </Text>
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07111F",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 5,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  liveBadge: {
    backgroundColor: "#DC2626",
  },

  offlineBadge: {
    backgroundColor: "#475569",
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  cameraFrame: {
    width: "100%",
    height: 270,
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    position: "relative",
  },

  cameraImage: {
    width: "100%",
    height: "100%",
  },

  cameraLabel: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },

  cameraLabelText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  timestamp: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.60)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },

  timestampText: {
    color: "#FFFFFF",
    fontSize: 10,
  },

  offlineView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  offlineIcon: {
    fontSize: 42,
  },

  offlineTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  offlineText: {
    color: "#94A3B8",
    marginTop: 5,
  },

  infoCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#0F1A2A",
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },

  infoLabel: {
    color: "#94A3B8",
  },

  infoValue: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  note: {
    color: "#64748B",
    marginTop: 18,
    textAlign: "center",
    fontSize: 12,
  },
});