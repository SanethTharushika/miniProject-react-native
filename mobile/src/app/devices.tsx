import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import DeviceCard from "../components/DeviceCard";
import { useDevices } from "../hooks/useDevices";

export default function DevicesScreen() {
  const {
    devices,
    loading,
  } = useDevices();

  const {
    type,
  } = useLocalSearchParams<{
    type?: string;
  }>();

  const filteredDevices =
    type
      ? devices.filter(
          (device) =>
            device.type === type
        )
      : devices;

  const pageTitle =
    type === "LIGHT"
      ? "Lighting"
      : type === "OUTLET"
        ? "Outlets"
        : type === "CAMERA"
          ? "Security"
          : "Devices";

  const pageSubtitle =
    type === "LIGHT"
      ? "Control and monitor smart lighting"
      : type === "OUTLET"
        ? "Control smart power outlets"
        : type === "CAMERA"
          ? "Monitor security cameras"
          : "Monitor and control smart appliances";

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
        />

        <Text
          style={styles.loadingText}
        >
          Loading devices...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.title}>
        {pageTitle}
      </Text>

      <Text style={styles.subtitle}>
        {pageSubtitle}
      </Text>

      <FlatList
        data={filteredDevices}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <DeviceCard
            device={item}
          />
        )}
        contentContainerStyle={
          styles.list
        }
        showsVerticalScrollIndicator={
          false
        }
        ListEmptyComponent={
          <View
            style={styles.emptyContainer}
          >
            <Text
              style={styles.emptyIcon}
            >
              📭
            </Text>

            <Text
              style={styles.emptyTitle}
            >
              No devices found
            </Text>

            <Text
              style={styles.emptyText}
            >
              There are no devices
              available in this category.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "#F5F7FB",
    },

    title: {
      fontSize: 30,
      fontWeight: "800",
      color: "#111827",
      marginTop: 20,
    },

    subtitle: {
      color: "#6B7280",
      marginTop: 5,
      marginBottom: 20,
    },

    list: {
      paddingBottom: 30,
      flexGrow: 1,
    },

    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5F7FB",
    },

    loadingText: {
      marginTop: 10,
      color: "#6B7280",
    },

    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 80,
      paddingHorizontal: 30,
    },

    emptyIcon: {
      fontSize: 42,
    },

    emptyTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight: "800",
      color: "#111827",
    },

    emptyText: {
      marginTop: 6,
      color: "#6B7280",
      fontSize: 13,
      textAlign: "center",
      lineHeight: 19,
    },
  });