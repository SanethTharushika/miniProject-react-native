import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDevices } from "../../hooks/useDevices";

import {
  toggleDevice,
} from "../../services/deviceService";

import type { Device } from "../../types/Device";

export default function FloorDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    devices,
    loading,
  } = useDevices();

  const floorDevices = devices.filter(
    (device) =>
      device.floorId === id
  );

  const getFloorName = () => {
    switch (id) {
      case "floor001":
        return "Ground Floor";

      case "floor002":
        return "First Floor";

      case "floor003":
        return "Second Floor";

      default:
        return "Floor";
    }
  };

  const getDeviceIcon = (
    type: string
  ) => {
    switch (type) {
      case "LIGHT":
        return "💡";

      case "OUTLET":
        return "🔌";

      case "IRON":
        return "🔥";

      case "CAMERA":
        return "📷";

      case "MULTI_SWITCH":
        return "🎛️";

      default:
        return "⚡";
    }
  };

  const handleToggle = async (
    device: Device
  ) => {
    if (
      device.status ===
      "DISCONNECTED"
    ) {
      Alert.alert(
        "Device Offline",
        `${device.name} is currently disconnected.`
      );

      return;
    }

    if (
      device.status === "ERROR"
    ) {
      Alert.alert(
        "Device Error",
        `${device.name} currently has an error and cannot be controlled.`
      );

      return;
    }

    try {
      await toggleDevice(device);
    } catch (error) {
      console.error(
        "Floor device toggle error:",
        error
      );

      Alert.alert(
        "Error",
        "Unable to update the device."
      );
    }
  };

  const handleDeviceAction = (
    device: Device
  ) => {
    if (
      device.type === "CAMERA"
    ) {
      router.push(
        `/camera/${device.id}`
      );

      return;
    }

    if (
      device.type ===
      "MULTI_SWITCH"
    ) {
      router.push(
        `/device/${device.id}`
      );

      return;
    }

    handleToggle(device);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text
          style={styles.loadingText}
        >
          Loading floor...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {/* Header */}

        <Text style={styles.floorLabel}>
          SMARTNEST
        </Text>

        <Text style={styles.title}>
          {getFloorName()}
        </Text>

        <Text style={styles.subtitle}>
          Interactive floor layout
        </Text>

        {/* Floor Summary */}

        <View
          style={styles.summaryCard}
        >
          <View>
            <Text
              style={
                styles.summaryValue
              }
            >
              {floorDevices.length}
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Devices
            </Text>
          </View>

          <View
            style={styles.divider}
          />

          <View>
            <Text
              style={
                styles.summaryValue
              }
            >
              {
                floorDevices.filter(
                  (device) =>
                    device.status ===
                    "ON"
                ).length
              }
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Active
            </Text>
          </View>

          <View
            style={styles.divider}
          />

          <View>
            <Text
              style={
                styles.summaryValue
              }
            >
              {
                new Set(
                  floorDevices.map(
                    (device) =>
                      device.room
                  )
                ).size
              }
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Rooms
            </Text>
          </View>
        </View>

        {/* Floor Layout */}

        <Text
          style={styles.sectionTitle}
        >
          Devices
        </Text>

        {floorDevices.length === 0 ? (
          <View
            style={styles.emptyCard}
          >
            <Text
              style={styles.emptyIcon}
            >
              🏠
            </Text>

            <Text
              style={styles.emptyTitle}
            >
              No devices on this floor
            </Text>

            <Text
              style={styles.emptyText}
            >
              Devices assigned to this
              floor will appear here.
            </Text>
          </View>
        ) : (
          <View
            style={styles.floorPlan}
          >
            {floorDevices.map(
              (device) => {
                const isOn =
                  device.status ===
                  "ON";

                const unavailable =
                  device.status ===
                    "DISCONNECTED" ||
                  device.status ===
                    "ERROR";

                return (
                  <View
                    key={device.id}
                    style={styles.room}
                  >
                    {/* Room */}

                    <View
                      style={
                        styles.roomHeader
                      }
                    >
                      <Text
                        style={
                          styles.roomTitle
                        }
                      >
                        {device.room ??
                          "Unknown Room"}
                      </Text>

                      <View
                        style={[
                          styles.statusBadge,

                          device.status ===
                          "ON"
                            ? styles.statusOn
                            : device.status ===
                                "ERROR"
                              ? styles.statusError
                              : device.status ===
                                  "DISCONNECTED"
                                ? styles.statusDisconnected
                                : styles.statusOff,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,

                            device.status ===
                            "ON"
                              ? styles.statusTextOn
                              : device.status ===
                                  "ERROR"
                                ? styles.statusTextError
                                : device.status ===
                                    "DISCONNECTED"
                                  ? styles.statusTextDisconnected
                                  : styles.statusTextOff,
                          ]}
                        >
                          {device.status}
                        </Text>
                      </View>
                    </View>

                    {/* Device */}

                    <View
                      style={
                        styles.deviceArea
                      }
                    >
                      <View
                        style={
                          styles.deviceIconBox
                        }
                      >
                        <Text
                          style={
                            styles.deviceIcon
                          }
                        >
                          {getDeviceIcon(
                            device.type
                          )}
                        </Text>
                      </View>

                      <Text
                        style={
                          styles.deviceName
                        }
                      >
                        {device.name}
                      </Text>

                      <Text
                        style={
                          styles.deviceType
                        }
                      >
                        {device.type}
                      </Text>

                      {device.power !==
                        undefined && (
                        <Text
                          style={
                            styles.powerText
                          }
                        >
                          {device.power} W
                        </Text>
                      )}
                    </View>

                    {/* Action */}

                    <TouchableOpacity
                      disabled={
                        unavailable
                      }
                      style={[
                        styles.actionButton,

                        device.type ===
                        "CAMERA"
                          ? styles.cameraButton
                          : device.type ===
                              "MULTI_SWITCH"
                            ? styles.switchButton
                            : isOn
                              ? styles.offButton
                              : styles.onButton,

                        unavailable &&
                          styles.disabledButton,
                      ]}
                      onPress={() =>
                        handleDeviceAction(
                          device
                        )
                      }
                    >
                      <Text
                        style={
                          styles.actionButtonText
                        }
                      >
                        {device.status ===
                        "DISCONNECTED"
                          ? "Device Offline"
                          : device.status ===
                              "ERROR"
                            ? "Device Error"
                            : device.type ===
                                "CAMERA"
                              ? "View Camera"
                              : device.type ===
                                  "MULTI_SWITCH"
                                ? "Open Switches"
                                : isOn
                                  ? "Turn OFF"
                                  : "Turn ON"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            )}
          </View>
        )}

        <View
          style={
            styles.bottomSpacing
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F3F6FB",
    },

    content: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
    },

    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F3F6FB",
    },

    loadingText: {
      marginTop: 10,
      color: "#64748B",
    },

    floorLabel: {
      color: "#2563EB",
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 2,
    },

    title: {
      marginTop: 7,
      fontSize: 30,
      fontWeight: "900",
      color: "#0F172A",
    },

    subtitle: {
      marginTop: 5,
      color: "#64748B",
    },

    summaryCard: {
      marginTop: 20,
      marginBottom: 25,

      backgroundColor: "#0F172A",

      borderRadius: 22,

      paddingVertical: 20,

      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-around",
    },

    summaryValue: {
      color: "#FFFFFF",
      fontSize: 23,
      fontWeight: "900",
      textAlign: "center",
    },

    summaryLabel: {
      marginTop: 4,
      color: "#94A3B8",
      fontSize: 11,
      textAlign: "center",
    },

    divider: {
      width: 1,
      height: 36,
      backgroundColor: "#334155",
    },

    sectionTitle: {
      color: "#0F172A",
      fontSize: 20,
      fontWeight: "900",
      marginBottom: 12,
    },

    floorPlan: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:
        "space-between",
    },

    room: {
      width: "48%",

      backgroundColor: "#FFFFFF",

      borderWidth: 1,
      borderColor: "#E2E8F0",

      borderRadius: 20,

      padding: 14,

      marginBottom: 12,

      minHeight: 245,
    },

    roomHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent:
        "space-between",

      gap: 5,
    },

    roomTitle: {
      flex: 1,
      color: "#334155",
      fontSize: 12,
      fontWeight: "800",
    },

    statusBadge: {
      paddingHorizontal: 7,
      paddingVertical: 4,
      borderRadius: 12,
    },

    statusOn: {
      backgroundColor: "#DCFCE7",
    },

    statusOff: {
      backgroundColor: "#E2E8F0",
    },

    statusError: {
      backgroundColor: "#FEE2E2",
    },

    statusDisconnected: {
      backgroundColor: "#FEF3C7",
    },

    statusText: {
      fontSize: 8,
      fontWeight: "900",
    },

    statusTextOn: {
      color: "#15803D",
    },

    statusTextOff: {
      color: "#475569",
    },

    statusTextError: {
      color: "#B91C1C",
    },

    statusTextDisconnected: {
      color: "#B45309",
    },

    deviceArea: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
    },

    deviceIconBox: {
      width: 50,
      height: 50,
      borderRadius: 16,
      backgroundColor: "#EFF6FF",
      justifyContent: "center",
      alignItems: "center",
    },

    deviceIcon: {
      fontSize: 25,
    },

    deviceName: {
      marginTop: 9,
      color: "#0F172A",
      fontSize: 12,
      fontWeight: "800",
      textAlign: "center",
    },

    deviceType: {
      marginTop: 3,
      color: "#64748B",
      fontSize: 9,
      fontWeight: "700",
    },

    powerText: {
      marginTop: 4,
      color: "#94A3B8",
      fontSize: 9,
    },

    actionButton: {
      paddingVertical: 10,
      borderRadius: 11,
      alignItems: "center",
    },

    onButton: {
      backgroundColor: "#16A34A",
    },

    offButton: {
      backgroundColor: "#DC2626",
    },

    cameraButton: {
      backgroundColor: "#2563EB",
    },

    switchButton: {
      backgroundColor: "#7C3AED",
    },

    disabledButton: {
      backgroundColor: "#94A3B8",
    },

    actionButtonText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "900",
    },

    emptyCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
    },

    emptyIcon: {
      fontSize: 35,
    },

    emptyTitle: {
      marginTop: 10,
      color: "#0F172A",
      fontWeight: "800",
    },

    emptyText: {
      marginTop: 5,
      color: "#94A3B8",
      textAlign: "center",
      fontSize: 11,
    },

    bottomSpacing: {
      height: 30,
    },
  });