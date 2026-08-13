import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const goToFloors = () => {
    router.push("/floors");
  };

  const goToDevices = () => {
    router.push("/devices");
  };

  const goToAutomation = () => {
    router.push("/automation");
  };

  const goToReports = () => {
    router.push("/reports");
  };

  const goToAlerts = () => {
    router.push("/alerts");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>

            <Text style={styles.title}>
              My Smart Home
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileCircle}
          >
            <Text style={styles.profileText}>
              ST
            </Text>
          </TouchableOpacity>
        </View>

        {/* Overview */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Home Overview
          </Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                8
              </Text>

              <Text style={styles.summaryLabel}>
                Devices
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                5
              </Text>

              <Text style={styles.summaryLabel}>
                Online
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                3
              </Text>

              <Text style={styles.summaryLabel}>
                Floors
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Access */}
        <Text style={styles.sectionTitle}>
          Quick Access
        </Text>

        <View style={styles.grid}>
          {/* Floors */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={goToFloors}
          >
            <Text style={styles.icon}>🏠</Text>

            <Text style={styles.cardTitle}>
              Floors
            </Text>

            <Text style={styles.cardText}>
              View and manage floor plans
            </Text>
          </TouchableOpacity>

          {/* Devices */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={goToDevices}
          >
            <Text style={styles.icon}>💡</Text>

            <Text style={styles.cardTitle}>
              Devices
            </Text>

            <Text style={styles.cardText}>
              Control smart appliances
            </Text>
          </TouchableOpacity>

          {/* Automation */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={goToAutomation}
          >
            <Text style={styles.icon}>⏰</Text>

            <Text style={styles.cardTitle}>
              Automation
            </Text>

            <Text style={styles.cardText}>
              Manage schedules and safety rules
            </Text>
          </TouchableOpacity>

          {/* Reports */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={goToReports}
          >
            <Text style={styles.icon}>📊</Text>

            <Text style={styles.cardTitle}>
              Reports
            </Text>

            <Text style={styles.cardText}>
              View usage statistics
            </Text>
          </TouchableOpacity>

          {/* Alerts */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={goToAlerts}
          >
            <Text style={styles.icon}>🔔</Text>

            <Text style={styles.cardTitle}>
              Alerts
            </Text>

            <Text style={styles.cardText}>
              View warnings and notifications
            </Text>
          </TouchableOpacity>

          {/* Camera shortcut */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={goToDevices}
          >
            <Text style={styles.icon}>📷</Text>

            <Text style={styles.cardTitle}>
              Security
            </Text>

            <Text style={styles.cardText}>
              Monitor smart cameras
            </Text>
          </TouchableOpacity>
        </View>

        {/* Safety */}
        <Text style={styles.sectionTitle}>
          Safety Status
        </Text>

        <View style={styles.safetyCard}>
          <View style={styles.safetyInfo}>
            <Text style={styles.safetyTitle}>
              Home Safety
            </Text>

            <Text style={styles.safetyText}>
              All safety-critical devices are normal
            </Text>
          </View>

          <View style={styles.safeBadge}>
            <Text style={styles.safeBadgeText}>
              SAFE
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  greeting: {
    fontSize: 14,
    color: "#6B7280",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginTop: 3,
  },

  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  summaryCard: {
    backgroundColor: "#111827",
    padding: 22,
    borderRadius: 22,
    marginBottom: 25,
  },

  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryItem: {
    alignItems: "center",
    flex: 1,
  },

  summaryNumber: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "800",
  },

  summaryLabel: {
    fontSize: 13,
    color: "#D1D5DB",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    minHeight: 145,

    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  icon: {
    fontSize: 28,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  cardText: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  safetyCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  safetyInfo: {
    flex: 1,
    paddingRight: 15,
  },

  safetyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  safetyText: {
    marginTop: 5,
    color: "#6B7280",
    fontSize: 13,
  },

  safeBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  safeBadgeText: {
    color: "#166534",
    fontWeight: "700",
    fontSize: 12,
  },
});