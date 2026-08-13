import { router } from "expo-router";

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFloors } from "../hooks/useFloors";
import { useDevices } from "../hooks/useDevices";

export default function FloorsScreen() {
  const {
    floors,
    loading,
  } = useFloors();

  const {
    devices,
  } = useDevices();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading floors...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Floors
        </Text>

        <Text style={styles.subtitle}>
          Select a floor to monitor devices
        </Text>

        {floors.map((floor) => {
          const floorDevices =
            devices.filter(
              (device) =>
                device.floorId === floor.id
            );

          return (
            <TouchableOpacity
              key={floor.id}
              style={styles.floorCard}
              onPress={() =>
                router.push(
                  `/floor/${floor.id}`
                )
              }
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>
                  🏢
                </Text>
              </View>

              <View style={styles.info}>
                <Text
                  style={styles.floorName}
                >
                  {floor.name}
                </Text>

                <Text style={styles.details}>
                  {floor.rooms} rooms •{" "}
                  {floorDevices.length} devices
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F7FB",
    },

    content: {
      padding: 20,
    },

    title: {
      fontSize: 30,
      fontWeight: "800",
      color: "#111827",
    },

    subtitle: {
      marginTop: 6,
      marginBottom: 25,
      color: "#6B7280",
    },

    floorCard: {
      backgroundColor: "#FFFFFF",
      padding: 18,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },

    iconBox: {
      width: 55,
      height: 55,
      borderRadius: 16,
      backgroundColor: "#F3F4F6",
      justifyContent: "center",
      alignItems: "center",
    },

    icon: {
      fontSize: 26,
    },

    info: {
      flex: 1,
      marginLeft: 15,
    },

    floorName: {
      fontSize: 18,
      fontWeight: "700",
      color: "#111827",
    },

    details: {
      marginTop: 5,
      color: "#6B7280",
    },

    arrow: {
      fontSize: 32,
      color: "#9CA3AF",
    },

    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    loadingText: {
      marginTop: 10,
    },
  });