import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

export default function AutomationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Automation
      </Text>

      <Text style={styles.text}>
        Automation navigation working ✅
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