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

import { useDevices } from "../../hooks/useDevices";
import { useFloors } from "../../hooks/useFloors";

export default function HomeScreen() {
  const {
    devices,
    loading: deviceLoading,
  } = useDevices();

  const {
    floors,
    loading: floorLoading,
  } = useFloors();

  if (deviceLoading || floorLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Connecting to SmartNest...
        </Text>
      </View>
    );
  }

  const activeDevices = devices.filter(
    (device) => device.status === "ON"
  );

  const disconnectedDevices = devices.filter(
    (device) => device.status === "DISCONNECTED"
  );

  const errorDevices = devices.filter(
    (device) => device.status === "ERROR"
  );

  const onlineDevices =
    devices.length - disconnectedDevices.length;

  const totalPower = activeDevices.reduce(
    (total, device) =>
      total + (device.power || 0),
    0
  );

  const safetyOk =
    errorDevices.length === 0;

  const getDeviceIcon = (type: string) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
      >
        {/* Header */}

        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>
              SMARTNEST
            </Text>

            <Text style={styles.greeting}>
              Good morning
            </Text>

            <Text style={styles.title}>
              My Smart Home
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
          >
            <Text style={styles.profileText}>
              ST
            </Text>
          </TouchableOpacity>
        </View>

        {/* Connection */}

        <View style={styles.connectionRow}>
          <View style={styles.connectionBadge}>
            <View style={styles.greenDot} />

            <Text style={styles.connectionText}>
              Cloud connected
            </Text>
          </View>

          <Text style={styles.onlineText}>
            {onlineDevices}/{devices.length} online
          </Text>
        </View>

        {/* Main status */}

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroLabel}>
              LIVE HOME STATUS
            </Text>

            <Text style={styles.heroNumber}>
              {activeDevices.length}
            </Text>

            <Text style={styles.heroTitle}>
              Devices currently active
            </Text>

            <Text style={styles.heroDescription}>
              {safetyOk
                ? "Your home is operating normally."
                : "A device needs your attention."}
            </Text>
          </View>

          <View style={styles.powerBox}>
            <Text style={styles.powerValue}>
              {totalPower}
            </Text>

            <Text style={styles.powerUnit}>
              Watts
            </Text>

            <Text style={styles.powerLabel}>
              Current Load
            </Text>
          </View>
        </View>

        {/* Summary */}

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>
              ⚡
            </Text>

            <Text style={styles.summaryValue}>
              {devices.length}
            </Text>

            <Text style={styles.summaryLabel}>
              Devices
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>
              🏢
            </Text>

            <Text style={styles.summaryValue}>
              {floors.length}
            </Text>

            <Text style={styles.summaryLabel}>
              Floors
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>
              🟢
            </Text>

            <Text style={styles.summaryValue}>
              {onlineDevices}
            </Text>

            <Text style={styles.summaryLabel}>
              Online
            </Text>
          </View>
        </View>

        {/* Quick control */}

<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>
    Quick Control
  </Text>

  <TouchableOpacity
    onPress={() =>
      router.push("/devices")
    }
  >
    <Text style={styles.sectionAction}>
      All devices
    </Text>
  </TouchableOpacity>
</View>

<View style={styles.quickGrid}>
  <TouchableOpacity
    style={styles.quickCard}
    onPress={() =>
      router.push({
        pathname: "/devices",
        params: {
          type: "LIGHT",
        },
      })
    }
  >
    <View style={styles.quickIconBox}>
      <Text style={styles.quickIcon}>
        💡
      </Text>
    </View>

    <Text style={styles.quickTitle}>
      Lighting
    </Text>

    <Text style={styles.quickDescription}>
      Control smart lights
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.quickCard}
    onPress={() =>
      router.push({
        pathname: "/devices",
        params: {
          type: "OUTLET",
        },
      })
    }
  >
    <View style={styles.quickIconBox}>
      <Text style={styles.quickIcon}>
        🔌
      </Text>
    </View>

    <Text style={styles.quickTitle}>
      Outlets
    </Text>

    <Text style={styles.quickDescription}>
      Smart power controls
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.quickCard}
    onPress={() =>
      router.push("/automation")
    }
  >
    <View style={styles.quickIconBox}>
      <Text style={styles.quickIcon}>
        ⏱️
      </Text>
    </View>

    <Text style={styles.quickTitle}>
      Automation
    </Text>

    <Text style={styles.quickDescription}>
      Schedules and rules
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.quickCard}
    onPress={() =>
      router.push({
        pathname: "/devices",
        params: {
          type: "CAMERA",
        },
      })
    }
  >
    <View style={styles.quickIconBox}>
      <Text style={styles.quickIcon}>
        📷
      </Text>
    </View>

    <Text style={styles.quickTitle}>
      Security
    </Text>

    <Text style={styles.quickDescription}>
      Camera monitoring
    </Text>
  </TouchableOpacity>
</View>

        {/* Floors */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Floors
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push("/floors")
            }
          >
            <Text style={styles.sectionAction}>
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {floors.slice(0, 3).map((floor) => {
          const floorDevices =
            devices.filter(
              (device) =>
                device.floorId === floor.id
            );

          const floorActive =
            floorDevices.filter(
              (device) =>
                device.status === "ON"
            ).length;

          return (
            <TouchableOpacity
              key={floor.id}
              activeOpacity={0.8}
              style={styles.floorCard}
              onPress={() =>
                router.push(
                  `/floor/${floor.id}`
                )
              }
            >
              <View style={styles.floorIconBox}>
                <Text style={styles.floorIcon}>
                  🏠
                </Text>
              </View>

              <View style={styles.floorContent}>
                <Text style={styles.floorName}>
                  {floor.name}
                </Text>

                <Text style={styles.floorDetails}>
                  {floorDevices.length} devices
                  {"  •  "}
                  {floorActive} active
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Active devices */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Active Devices
          </Text>
        </View>

        <View style={styles.deviceList}>
          {activeDevices.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>
                💤
              </Text>

              <Text style={styles.emptyTitle}>
                No active devices
              </Text>

              <Text style={styles.emptyText}>
                Turn on a smart device to see it
                here.
              </Text>
            </View>
          ) : (
            activeDevices
              .slice(0, 4)
              .map((device) => (
                <TouchableOpacity
                  key={device.id}
                  style={styles.deviceRow}
                  onPress={() =>
                    router.push(
                      `/device/${device.id}`
                    )
                  }
                >
                  <View style={styles.deviceIconBox}>
                    <Text style={styles.deviceIcon}>
                      {getDeviceIcon(
                        device.type
                      )}
                    </Text>
                  </View>

                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>
                      {device.name}
                    </Text>

                    <Text style={styles.deviceMeta}>
                      {device.room ||
                        device.floorId}
                    </Text>
                  </View>

                  <View style={styles.activeBadge}>
                    <View
                      style={styles.activeDot}
                    />

                    <Text
                      style={
                        styles.activeBadgeText
                      }
                    >
                      ON
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
          )}
        </View>

        {/* Safety */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Safety Center
          </Text>
        </View>

        <View
          style={[
            styles.safetyCard,
            !safetyOk &&
              styles.safetyCardWarning,
          ]}
        >
          <View style={styles.safetyIconBox}>
            <Text style={styles.safetyIcon}>
              {safetyOk ? "🛡️" : "⚠️"}
            </Text>
          </View>

          <View style={styles.safetyContent}>
            <Text style={styles.safetyTitle}>
              {safetyOk
                ? "Protection Active"
                : "Attention Required"}
            </Text>

            <Text style={styles.safetyDescription}>
              {safetyOk
                ? "High-power device monitoring and automatic cutoffs are enabled."
                : `${errorDevices.length} device issue detected.`}
            </Text>
          </View>

          <View
            style={[
              styles.safetyBadge,
              !safetyOk &&
                styles.warningBadge,
            ]}
          >
            <Text
              style={[
                styles.safetyBadgeText,
                !safetyOk &&
                  styles.warningBadgeText,
              ]}
            >
              {safetyOk ? "SAFE" : "CHECK"}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  page: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F6FB",
  },

  loadingText: {
    marginTop: 12,
    color: "#64748B",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: 11,
    fontWeight: "900",
    color: "#2563EB",
    letterSpacing: 2.2,
  },

  greeting: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
  },

  title: {
    marginTop: 2,
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  connectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 20,
  },

  connectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8FFF5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 7,
  },

  connectionText: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "800",
  },

  onlineText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },

  heroCard: {
    backgroundColor: "#0F172A",
    borderRadius: 28,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  heroLabel: {
    color: "#60A5FA",
    fontSize: 11,
    letterSpacing: 1.6,
    fontWeight: "900",
  },

  heroNumber: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 12,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  heroDescription: {
    color: "#94A3B8",
    marginTop: 7,
    maxWidth: 220,
    lineHeight: 19,
    fontSize: 12,
  },

  powerBox: {
    alignSelf: "center",
    backgroundColor: "#1E293B",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 16,
    alignItems: "center",
  },

  powerValue: {
    color: "#38BDF8",
    fontWeight: "900",
    fontSize: 22,
  },

  powerUnit: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 2,
  },

  powerLabel: {
    color: "#94A3B8",
    fontSize: 9,
    marginTop: 7,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
  },

  summaryIcon: {
    fontSize: 18,
  },

  summaryValue: {
    fontSize: 21,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 6,
  },

  summaryLabel: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 3,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 27,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },

  sectionAction: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "800",
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 22,
    marginBottom: 12,
  },

  quickIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  quickIcon: {
    fontSize: 21,
  },

  quickTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 12,
  },

  quickDescription: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 4,
  },

  floorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 17,
    marginBottom: 11,
  },

  floorIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  floorIcon: {
    fontSize: 22,
  },

  floorContent: {
    flex: 1,
    marginLeft: 14,
  },

  floorName: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "900",
  },

  floorDetails: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 12,
  },

  arrow: {
    fontSize: 28,
    color: "#94A3B8",
  },

  deviceList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
  },

  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  deviceIconBox: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  deviceIcon: {
    fontSize: 20,
  },

  deviceInfo: {
    flex: 1,
    marginLeft: 12,
  },

  deviceName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },

  deviceMeta: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 3,
  },

  activeBadge: {
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 5,
  },

  activeBadgeText: {
    color: "#047857",
    fontSize: 10,
    fontWeight: "900",
  },

  emptyBox: {
    padding: 25,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 28,
  },

  emptyTitle: {
    color: "#0F172A",
    fontWeight: "800",
    marginTop: 8,
  },

  emptyText: {
    color: "#94A3B8",
    marginTop: 4,
    fontSize: 11,
  },

  safetyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderRadius: 22,
    padding: 17,
  },

  safetyCardWarning: {
    backgroundColor: "#FEF2F2",
  },

  safetyIconBox: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  safetyIcon: {
    fontSize: 22,
  },

  safetyContent: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },

  safetyTitle: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 15,
  },

  safetyDescription: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  safetyBadge: {
    backgroundColor: "#D1FAE5",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  warningBadge: {
    backgroundColor: "#FEE2E2",
  },

  safetyBadgeText: {
    color: "#047857",
    fontWeight: "900",
    fontSize: 9,
  },

  warningBadgeText: {
    color: "#B91C1C",
  },

  bottomSpacing: {
    height: 25,
  },
});