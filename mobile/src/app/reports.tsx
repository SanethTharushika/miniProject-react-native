import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Reports
      </Text>

      <Text style={styles.text}>
        Reports navigation working ✅
      </Text>
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
  },

  text: {
    marginTop: 20,
    fontSize: 18,
  },
});