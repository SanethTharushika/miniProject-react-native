import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DeviceCard from "../components/DeviceCard";
import { useDevices } from "../hooks/useDevices";

export default function DevicesScreen() {
  const {
    devices,
    loading,
  } = useDevices();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading devices...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Devices
      </Text>

      <Text style={styles.subtitle}>
        Monitor and control smart appliances
      </Text>

      <FlatList
        data={devices}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <DeviceCard device={item} />
        )}
        contentContainerStyle={
          styles.list
        }
        showsVerticalScrollIndicator={
          false
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