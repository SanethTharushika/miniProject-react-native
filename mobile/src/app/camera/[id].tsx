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
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

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

  const getCameraImage = () => {
    switch (camera.id) {
      case "device006":
        return require(
          "../../../assets/cameras/front-door.jpg"
        );

      case "device012":
        return require(
          "../../../assets/cameras/hall.jpg"
        );

      default:
        return require(
          "../../../assets/cameras/front-door.jpg"
        );
    }
  };

  const getCameraLabel = () => {
    switch (camera.id) {
      case "device006":
        return "CAM 01";

      case "device012":
        return "CAM 02";

      default:
        return "CAM";
    }
  };

  const getCameraLocationLabel = () => {
    switch (camera.id) {
      case "device006":
        return "SMARTNEST • FRONT ENTRANCE";

      case "device012":
        return "SMARTNEST • HALL AREA";

      default:
        return `SMARTNEST • ${
          camera.room?.toUpperCase() ??
          "CAMERA"
        }`;
    }
  };

  const isCameraLive =
    camera.status === "ON";

  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>
            {camera.name}
          </Text>

          <Text style={styles.subtitle}>
            {camera.room ??
              "Unknown location"}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,

            isCameraLive
              ? styles.liveBadge
              : styles.offlineBadge,
          ]}
        >
          <Text
            style={styles.statusText}
          >
            {isCameraLive
              ? "● LIVE"
              : camera.status}
          </Text>
        </View>
      </View>

      {/* Camera */}

      <View style={styles.cameraFrame}>
        {isCameraLive ? (
          <>
            <Image
              source={getCameraImage()}
              style={styles.cameraImage}
              resizeMode="cover"
            />

            {/* Camera ID */}

            <View
              style={styles.cameraLabel}
            >
              <Text
                style={
                  styles.cameraLabelText
                }
              >
                {getCameraLabel()}
              </Text>
            </View>

            {/* Live indicator */}

            <View
              style={
                styles.liveIndicator
              }
            >
              <View
                style={
                  styles.liveIndicatorDot
                }
              />

              <Text
                style={
                  styles.liveIndicatorText
                }
              >
                LIVE
              </Text>
            </View>

            {/* Camera footer */}

            <View
              style={styles.timestamp}
            >
              <Text
                style={
                  styles.timestampText
                }
              >
                {getCameraLocationLabel()}
              </Text>
            </View>
          </>
        ) : (
          <View
            style={styles.offlineView}
          >
            <Text
              style={styles.offlineIcon}
            >
              📷
            </Text>

            <Text
              style={styles.offlineTitle}
            >
              Camera unavailable
            </Text>

            <Text
              style={styles.offlineText}
            >
              Current status:{" "}
              {camera.status}
            </Text>

            <Text
              style={
                styles.offlineDescription
              }
            >
              The camera feed will be
              available when the camera
              returns online.
            </Text>
          </View>
        )}
      </View>

      {/* Camera information */}

      <View style={styles.infoCard}>
        <Text
          style={styles.infoCardTitle}
        >
          Camera Information
        </Text>

        <InfoRow
          label="Camera"
          value={camera.name}
        />

        <InfoRow
          label="Camera ID"
          value={getCameraLabel()}
        />

        <InfoRow
          label="Location"
          value={
            camera.room ?? "Unknown"
          }
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
        This camera feed is simulated
        using a mock CCTV snapshot for
        the SmartNest hardware
        simulation.
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

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: "#07111F",

      padding: 20,
    },

    header: {
      flexDirection: "row",

      justifyContent:
        "space-between",

      alignItems: "center",

      marginBottom: 20,

      gap: 12,
    },

    headerText: {
      flex: 1,
    },

    title: {
      color: "#FFFFFF",

      fontSize: 24,

      fontWeight: "800",
    },

    subtitle: {
      color: "#94A3B8",

      marginTop: 5,

      fontSize: 13,
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

      backgroundColor:
        "rgba(0,0,0,0.68)",

      paddingHorizontal: 9,

      paddingVertical: 5,

      borderRadius: 6,
    },

    cameraLabelText: {
      color: "#FFFFFF",

      fontSize: 11,

      fontWeight: "700",
    },

    liveIndicator: {
      position: "absolute",

      top: 12,

      right: 12,

      flexDirection: "row",

      alignItems: "center",

      backgroundColor:
        "rgba(220,38,38,0.90)",

      paddingHorizontal: 9,

      paddingVertical: 5,

      borderRadius: 6,
    },

    liveIndicatorDot: {
      width: 6,

      height: 6,

      borderRadius: 3,

      backgroundColor: "#FFFFFF",

      marginRight: 5,
    },

    liveIndicatorText: {
      color: "#FFFFFF",

      fontSize: 10,

      fontWeight: "800",
    },

    timestamp: {
      position: "absolute",

      bottom: 12,

      left: 12,

      backgroundColor:
        "rgba(0,0,0,0.65)",

      paddingHorizontal: 9,

      paddingVertical: 5,

      borderRadius: 6,
    },

    timestampText: {
      color: "#FFFFFF",

      fontSize: 10,

      fontWeight: "600",
    },

    offlineView: {
      flex: 1,

      alignItems: "center",

      justifyContent: "center",

      paddingHorizontal: 30,
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

    offlineDescription: {
      color: "#64748B",

      marginTop: 10,

      textAlign: "center",

      fontSize: 12,

      lineHeight: 18,
    },

    infoCard: {
      marginTop: 20,

      padding: 18,

      borderRadius: 16,

      backgroundColor: "#0F1A2A",

      borderWidth: 1,

      borderColor: "#1E293B",
    },

    infoCardTitle: {
      color: "#FFFFFF",

      fontSize: 16,

      fontWeight: "800",

      marginBottom: 8,
    },

    infoRow: {
      flexDirection: "row",

      justifyContent:
        "space-between",

      alignItems: "center",

      paddingVertical: 12,

      borderBottomWidth: 1,

      borderBottomColor: "#1E293B",

      gap: 12,
    },

    infoLabel: {
      color: "#94A3B8",

      fontSize: 13,
    },

    infoValue: {
      flex: 1,

      color: "#FFFFFF",

      fontWeight: "600",

      fontSize: 13,

      textAlign: "right",
    },

    note: {
      color: "#64748B",

      marginTop: 18,

      textAlign: "center",

      fontSize: 12,

      lineHeight: 18,
    },
  });