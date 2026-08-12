import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Device } from "../types/Device";

import {
  toggleDevice,
} from "../services/deviceService";

interface Props {
  device: Device;
}

export default function DeviceCard({
  device,
}: Props) {
  const isOn =
    device.status === "ON";

  const handleToggle = async () => {
    try {
      await toggleDevice(device);
    } catch (error) {
      console.error(
        "Device toggle error:",
        error
      );

      Alert.alert(
        "Error",
        "Unable to update the device."
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>
            {device.name}
          </Text>

          <Text style={styles.type}>
            {device.type}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            isOn
              ? styles.statusOn
              : styles.statusOff,
          ]}
        >
          <Text style={styles.statusText}>
            {device.status}
          </Text>
        </View>
      </View>

      <Text style={styles.info}>
        Floor: {device.floorId}
      </Text>

      {device.power !== undefined && (
        <Text style={styles.info}>
          Power: {device.power} W
        </Text>
      )}

      <Pressable
        style={[
          styles.button,
          isOn
            ? styles.offButton
            : styles.onButton,
        ]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>
          {isOn
            ? "Turn OFF"
            : "Turn ON"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor: "#ffffff",
      borderRadius: 18,
      padding: 18,
      marginBottom: 16,
      elevation: 3,

      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },

    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    title: {
      fontSize: 20,
      fontWeight: "700",
      color: "#111827",
    },

    type: {
      fontSize: 13,
      color: "#6b7280",
      marginTop: 3,
    },

    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },

    statusOn: {
      backgroundColor: "#dcfce7",
    },

    statusOff: {
      backgroundColor: "#e5e7eb",
    },

    statusText: {
      fontWeight: "700",
      fontSize: 12,
      color: "#111827",
    },

    info: {
      color: "#4b5563",
      marginBottom: 5,
    },

    button: {
      paddingVertical: 13,
      borderRadius: 12,
      marginTop: 15,
    },

    onButton: {
      backgroundColor: "#16a34a",
    },

    offButton: {
      backgroundColor: "#dc2626",
    },

    buttonText: {
      textAlign: "center",
      color: "#ffffff",
      fontWeight: "700",
      fontSize: 16,
    },
  });