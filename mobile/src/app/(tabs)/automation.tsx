import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const schedules = [
  {
    id: "schedule001",
    name:
      "Evening Living Room Light",
    device:
      "Living Room Light",
    time:
      "18:00 - 23:00",
    enabled: true,
  },
  {
    id: "schedule002",
    name:
      "Bedroom Night Light",
    device:
      "Bedroom Light",
    time:
      "19:00 - 22:30",
    enabled: true,
  },
];

export default function AutomationScreen() {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          Automation
        </Text>

        <Text
          style={styles.subtitle}
        >
          Manage schedules and
          automatic device rules
        </Text>

        {schedules.map(
          (schedule) => (
            <View
              key={schedule.id}
              style={styles.card}
            >
              <View
                style={styles.row}
              >
                <View
                  style={styles.info}
                >
                  <Text
                    style={
                      styles.name
                    }
                  >
                    {schedule.name}
                  </Text>

                  <Text
                    style={
                      styles.device
                    }
                  >
                    {schedule.device}
                  </Text>

                  <Text
                    style={
                      styles.time
                    }
                  >
                    ⏰ {schedule.time}
                  </Text>
                </View>

                <Switch
                  value={
                    schedule.enabled
                  }
                />
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F5F7FB",
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
      marginTop: 5,
      marginBottom: 25,
      color: "#6B7280",
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      padding: 18,
      borderRadius: 18,
      marginBottom: 14,
    },

    row: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    info: {
      flex: 1,
    },

    name: {
      fontSize: 17,
      fontWeight: "700",
      color: "#111827",
    },

    device: {
      marginTop: 5,
      color: "#6B7280",
    },

    time: {
      marginTop: 10,
      color: "#374151",
      fontWeight: "600",
    },
  });