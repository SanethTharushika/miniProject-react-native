import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { useDevices } from "../hooks/useDevices";

export default function EnergyScreen() {
  const { devices, loading } =
    useDevices();

  const activeDevices =
    devices.filter(
      (device) =>
        device.status === "ON"
    );

  const devicesUsingPower =
    activeDevices
      .filter(
        (device) =>
          (device.power || 0) > 0
      )
      .sort(
        (a, b) =>
          (b.power || 0) -
          (a.power || 0)
      );

  const totalPower =
    devicesUsingPower.reduce(
      (total, device) =>
        total +
        (device.power || 0),
      0
    );

  const totalPowerKw =
    totalPower / 1000;

  if (loading) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View
          style={
            styles.loadingContainer
          }
        >
          <Text
            style={styles.loadingText}
          >
            Loading energy data...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.page
        }
      >
        {/* Header */}

        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Text
            style={styles.backButton}
          >
            ‹ Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          SMARTNEST ENERGY
        </Text>

        <Text style={styles.title}>
          Energy Monitor
        </Text>

        <Text
          style={styles.subtitle}
        >
          Monitor real-time power
          usage across your active
          smart devices.
        </Text>

        {/* Main Power Card */}

        <View
          style={styles.powerCard}
        >
          <View>
            <Text
              style={
                styles.powerCardLabel
              }
            >
              CURRENT POWER USAGE
            </Text>

            <View
              style={
                styles.powerValueRow
              }
            >
              <Text
                style={
                  styles.powerValue
                }
              >
                {totalPower >= 1000
                  ? totalPowerKw.toFixed(
                      2
                    )
                  : totalPower}
              </Text>

              <Text
                style={
                  styles.powerUnit
                }
              >
                {totalPower >= 1000
                  ? "kW"
                  : "W"}
              </Text>
            </View>

            <Text
              style={
                styles.liveText
              }
            >
              ● Live monitoring
            </Text>
          </View>

          <View
            style={
              styles.powerIconBox
            }
          >
            <Text
              style={
                styles.powerIcon
              }
            >
              ⚡
            </Text>
          </View>
        </View>

        {/* Summary */}

        <View
          style={styles.summaryRow}
        >
          <View
            style={
              styles.summaryCard
            }
          >
            <Text
              style={
                styles.summaryValue
              }
            >
              {activeDevices.length}
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Active Devices
            </Text>
          </View>

          <View
            style={
              styles.summaryCard
            }
          >
            <Text
              style={
                styles.summaryValue
              }
            >
              {devicesUsingPower.length}
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Using Power
            </Text>
          </View>
        </View>

        {/* Usage bar */}

        <View
          style={
            styles.usageCard
          }
        >
          <View
            style={
              styles.usageHeader
            }
          >
            <Text
              style={
                styles.usageTitle
              }
            >
              Current Load
            </Text>

            <Text
              style={
                styles.usagePercentage
              }
            >
              {Math.min(
                Math.round(
                  (totalPower /
                    3000) *
                    100
                ),
                100
              )}
              %
            </Text>
          </View>

          <View
            style={
              styles.progressBackground
            }
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(
                    (totalPower /
                      3000) *
                      100,
                    100
                  )}%`,
                },
              ]}
            />
          </View>

          <View
            style={
              styles.scaleRow
            }
          >
            <Text
              style={
                styles.scaleText
              }
            >
              0 W
            </Text>

            <Text
              style={
                styles.scaleText
              }
            >
              3 kW
            </Text>
          </View>
        </View>

        {/* Devices */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Active Device Usage
          </Text>
        </View>

        {devicesUsingPower.length ===
        0 ? (
          <View
            style={styles.emptyCard}
          >
            <Text
              style={styles.emptyIcon}
            >
              ⚡
            </Text>

            <Text
              style={styles.emptyTitle}
            >
              No power usage
            </Text>

            <Text
              style={styles.emptyText}
            >
              Turn on a device to see
              its energy usage here.
            </Text>
          </View>
        ) : (
          devicesUsingPower.map(
            (device) => {
              const percentage =
                totalPower > 0
                  ? Math.round(
                      ((device.power ||
                        0) /
                        totalPower) *
                        100
                    )
                  : 0;

              return (
                <TouchableOpacity
                  key={device.id}
                  style={
                    styles.deviceCard
                  }
                  onPress={() =>
                    router.push(
                      `/device/${device.id}`
                    )
                  }
                >
                  <View
                    style={
                      styles.deviceIcon
                    }
                  >
                    <Text
                      style={
                        styles.deviceEmoji
                      }
                    >
                      {device.type ===
                      "LIGHT"
                        ? "💡"
                        : device.type ===
                            "OUTLET"
                          ? "🔌"
                          : device.type ===
                              "IRON"
                            ? "🔥"
                            : device.type ===
                                "CAMERA"
                              ? "📷"
                              : device.type ===
                                  "MULTI_SWITCH"
                                ? "🎛️"
                                : "⚡"}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.deviceInfo
                    }
                  >
                    <Text
                      style={
                        styles.deviceName
                      }
                    >
                      {device.name}
                    </Text>

                    <Text
                      style={
                        styles.deviceRoom
                      }
                    >
                      {device.room ||
                        device.floorId}
                    </Text>

                    <View
                      style={
                        styles.deviceProgressBackground
                      }
                    >
                      <View
                        style={[
                          styles.deviceProgress,
                          {
                            width: `${percentage}%`,
                          },
                        ]}
                      />
                    </View>

                    <Text
                      style={
                        styles.percentageText
                      }
                    >
                      {percentage}% of
                      current usage
                    </Text>
                  </View>

                  <View
                    style={
                      styles.devicePowerBox
                    }
                  >
                    <Text
                      style={
                        styles.devicePower
                      }
                    >
                      {device.power ||
                        0}
                    </Text>

                    <Text
                      style={
                        styles.devicePowerUnit
                      }
                    >
                      W
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          )
        )}

        <View
          style={
            styles.bottomSpace
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F3F6FB",
    },

    page: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      padding: 20,
    },

    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
    },

    loadingText: {
      color: "#64748B",
    },

    backButton: {
      color: "#2563EB",
      fontWeight: "800",
      fontSize: 14,
      marginBottom: 20,
    },

    label: {
      color: "#2563EB",
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 2,
    },

    title: {
      marginTop: 6,
      fontSize: 30,
      fontWeight: "900",
      color: "#0F172A",
    },

    subtitle: {
      color: "#64748B",
      marginTop: 7,
      lineHeight: 20,
      marginBottom: 22,
    },

    powerCard: {
      backgroundColor:
        "#0F172A",
      borderRadius: 26,
      padding: 22,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    powerCardLabel: {
      color: "#60A5FA",
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.4,
    },

    powerValueRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: 10,
    },

    powerValue: {
      color: "#FFFFFF",
      fontSize: 38,
      fontWeight: "900",
    },

    powerUnit: {
      color: "#94A3B8",
      marginLeft: 6,
      marginBottom: 6,
      fontWeight: "700",
    },

    liveText: {
      color: "#10B981",
      fontSize: 11,
      fontWeight: "700",
      marginTop: 7,
    },

    powerIconBox: {
      width: 62,
      height: 62,
      borderRadius: 20,
      backgroundColor:
        "#1E293B",
      alignItems: "center",
      justifyContent:
        "center",
    },

    powerIcon: {
      fontSize: 30,
    },

    summaryRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 14,
    },

    summaryCard: {
      flex: 1,
      backgroundColor:
        "#FFFFFF",
      borderRadius: 20,
      padding: 18,
      alignItems: "center",
    },

    summaryValue: {
      color: "#0F172A",
      fontSize: 24,
      fontWeight: "900",
    },

    summaryLabel: {
      color: "#64748B",
      fontSize: 11,
      marginTop: 5,
    },

    usageCard: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 20,
      padding: 18,
      marginTop: 14,
    },

    usageHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
    },

    usageTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: "#0F172A",
    },

    usagePercentage: {
      color: "#2563EB",
      fontWeight: "900",
    },

    progressBackground: {
      marginTop: 16,
      height: 9,
      borderRadius: 10,
      backgroundColor:
        "#E2E8F0",
      overflow: "hidden",
    },

    progressFill: {
      height: "100%",
      backgroundColor:
        "#2563EB",
      borderRadius: 10,
    },

    scaleRow: {
      marginTop: 7,
      flexDirection: "row",
      justifyContent:
        "space-between",
    },

    scaleText: {
      color: "#94A3B8",
      fontSize: 10,
    },

    sectionHeader: {
      marginTop: 27,
      marginBottom: 12,
    },

    sectionTitle: {
      color: "#0F172A",
      fontSize: 20,
      fontWeight: "900",
    },

    deviceCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "#FFFFFF",
      borderRadius: 20,
      padding: 16,
      marginBottom: 11,
    },

    deviceIcon: {
      width: 46,
      height: 46,
      backgroundColor:
        "#EFF6FF",
      borderRadius: 15,
      justifyContent:
        "center",
      alignItems: "center",
    },

    deviceEmoji: {
      fontSize: 21,
    },

    deviceInfo: {
      flex: 1,
      marginHorizontal: 12,
    },

    deviceName: {
      color: "#0F172A",
      fontWeight: "800",
      fontSize: 14,
    },

    deviceRoom: {
      color: "#94A3B8",
      fontSize: 10,
      marginTop: 3,
    },

    deviceProgressBackground: {
      height: 5,
      borderRadius: 5,
      backgroundColor:
        "#E2E8F0",
      marginTop: 9,
      overflow: "hidden",
    },

    deviceProgress: {
      height: "100%",
      borderRadius: 5,
      backgroundColor:
        "#38BDF8",
    },

    percentageText: {
      color: "#94A3B8",
      fontSize: 9,
      marginTop: 4,
    },

    devicePowerBox: {
      alignItems: "flex-end",
    },

    devicePower: {
      color: "#0F172A",
      fontSize: 18,
      fontWeight: "900",
    },

    devicePowerUnit: {
      color: "#64748B",
      fontSize: 10,
    },

    emptyCard: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
    },

    emptyIcon: {
      fontSize: 30,
    },

    emptyTitle: {
      color: "#0F172A",
      fontSize: 16,
      fontWeight: "900",
      marginTop: 10,
    },

    emptyText: {
      color: "#94A3B8",
      marginTop: 5,
      fontSize: 11,
      textAlign: "center",
    },

    bottomSpace: {
      height: 30,
    },
  });