import { useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Device Details
      </Text>

      <Text>
        Device ID: {id}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F6FB",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },
});