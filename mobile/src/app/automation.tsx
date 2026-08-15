import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  onValue,
  ref,
  remove,
  update,
} from "firebase/database";

import { router } from "expo-router";

import { database } from "../config/firebase";

type Schedule = {
  id: string;
  deviceId: string;
  name: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
};

export default function AutomationScreen() {
  const [schedules, setSchedules] =
    useState<Schedule[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const schedulesRef = ref(
      database,
      "schedules"
    );

    const unsubscribe = onValue(
      schedulesRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setSchedules([]);
          setLoading(false);
          return;
        }

        const scheduleList: Schedule[] =
          Object.entries(data).map(
            ([id, value]) => ({
              id,
              ...(value as Omit<
                Schedule,
                "id"
              >),
            })
          );

        setSchedules(scheduleList);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const toggleSchedule = async (
    schedule: Schedule
  ) => {
    try {
      await update(
        ref(
          database,
          `schedules/${schedule.id}`
        ),
        {
          enabled: !schedule.enabled,
        }
      );
    } catch (error) {
      console.error(
        "Schedule update error:",
        error
      );

      Alert.alert(
        "Error",
        "Unable to update automation."
      );
    }
  };

  const deleteSchedule = (
    schedule: Schedule
  ) => {
    Alert.alert(
      "Delete Automation",
      `Delete "${schedule.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await remove(
                ref(
                  database,
                  `schedules/${schedule.id}`
                )
              );
            } catch (error) {
              console.error(
                "Delete schedule error:",
                error
              );

              Alert.alert(
                "Error",
                "Unable to delete automation."
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.loadingText}>
          Loading automations...
        </Text>
      </View>
    );
  }

  const enabledCount =
    schedules.filter(
      (schedule) =>
        schedule.enabled
    ).length;

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.label}>
              SMARTNEST
            </Text>

            <Text style={styles.title}>
              Automation
            </Text>

            <Text style={styles.subtitle}>
              Manage schedules and automatic
              smart-home actions
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              router.push(
                "/add-automation"
              )
            }
          >
            <Text
              style={
                styles.addButtonText
              }
            >
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text
              style={
                styles.summaryLabel
              }
            >
              Automation Rules
            </Text>

            <Text
              style={
                styles.summaryValue
              }
            >
              {schedules.length}
            </Text>
          </View>

          <View style={styles.divider} />

          <View>
            <Text
              style={
                styles.summaryLabel
              }
            >
              Enabled
            </Text>

            <Text
              style={
                styles.summaryValue
              }
            >
              {enabledCount}
            </Text>
          </View>
        </View>

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
            Schedules
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push(
                "/add-automation"
              )
            }
          >
            <Text
              style={
                styles.sectionAction
              }
            >
              + New
            </Text>
          </TouchableOpacity>
        </View>

        {schedules.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              ⏱️
            </Text>

            <Text style={styles.emptyTitle}>
              No schedules available
            </Text>

            <Text style={styles.emptyText}>
              Create your first automation
              rule to control a device
              automatically.
            </Text>

            <TouchableOpacity
              style={
                styles.emptyButton
              }
              onPress={() =>
                router.push(
                  "/add-automation"
                )
              }
            >
              <Text
                style={
                  styles.emptyButtonText
                }
              >
                Create Automation
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          schedules.map((schedule) => (
            <View
              key={schedule.id}
              style={
                styles.scheduleCard
              }
            >
              <View
                style={
                  styles.scheduleHeader
                }
              >
                <View
                  style={styles.iconBox}
                >
                  <Text
                    style={
                      styles.scheduleIcon
                    }
                  >
                    ⏰
                  </Text>
                </View>

                <View
                  style={
                    styles.scheduleHeading
                  }
                >
                  <Text
                    style={
                      styles.scheduleName
                    }
                  >
                    {schedule.name}
                  </Text>

                  <Text
                    style={
                      styles.deviceText
                    }
                  >
                    Device:{" "}
                    {schedule.deviceId}
                  </Text>
                </View>

                <Switch
                  value={
                    schedule.enabled
                  }
                  onValueChange={() =>
                    toggleSchedule(
                      schedule
                    )
                  }
                  trackColor={{
                    false: "#CBD5E1",
                    true: "#93C5FD",
                  }}
                  thumbColor={
                    schedule.enabled
                      ? "#2563EB"
                      : "#F8FAFC"
                  }
                />
              </View>

              <View
                style={styles.timeRow}
              >
                <View
                  style={styles.timeBox}
                >
                  <Text
                    style={
                      styles.timeLabel
                    }
                  >
                    Start
                  </Text>

                  <Text
                    style={
                      styles.timeValue
                    }
                  >
                    {schedule.startTime}
                  </Text>
                </View>

                <Text
                  style={styles.arrow}
                >
                  →
                </Text>

                <View
                  style={styles.timeBox}
                >
                  <Text
                    style={
                      styles.timeLabel
                    }
                  >
                    End
                  </Text>

                  <Text
                    style={
                      styles.timeValue
                    }
                  >
                    {schedule.endTime}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.statusBox,

                  schedule.enabled
                    ? styles.enabledBox
                    : styles.disabledBox,
                ]}
              >
                <View
                  style={[
                    styles.statusDot,

                    schedule.enabled
                      ? styles.enabledDot
                      : styles.disabledDot,
                  ]}
                />

                <Text
                  style={[
                    styles.statusText,

                    schedule.enabled
                      ? styles.enabledText
                      : styles.disabledText,
                  ]}
                >
                  {schedule.enabled
                    ? "Automation enabled"
                    : "Automation disabled"}
                </Text>
              </View>

              <TouchableOpacity
                style={
                  styles.deleteButton
                }
                onPress={() =>
                  deleteSchedule(
                    schedule
                  )
                }
              >
                <Text
                  style={
                    styles.deleteButtonText
                  }
                >
                  Delete Automation
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>
            💡
          </Text>

          <View
            style={styles.infoContent}
          >
            <Text
              style={styles.infoTitle}
            >
              Real-time synchronization
            </Text>

            <Text
              style={styles.infoText}
            >
              Automations created or
              changed here are stored in
              Firebase and automatically
              reflected in the hardware
              simulator.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F3F6FB",
    },

    content: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },

    loading: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F3F6FB",
    },

    loadingText: {
      marginTop: 12,
      color: "#64748B",
    },

    header: {
      marginBottom: 22,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    label: {
      color: "#2563EB",
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 2,
    },

    title: {
      marginTop: 8,
      color: "#0F172A",
      fontSize: 30,
      fontWeight: "900",
    },

    subtitle: {
      marginTop: 6,
      color: "#64748B",
      lineHeight: 20,
      maxWidth: 300,
    },

    addButton: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: "#2563EB",
      alignItems: "center",
      justifyContent: "center",
    },

    addButtonText: {
      color: "#FFFFFF",
      fontSize: 30,
      fontWeight: "500",
      lineHeight: 32,
    },

    summaryCard: {
      flexDirection: "row",
      justifyContent:
        "space-around",
      alignItems: "center",
      backgroundColor: "#0F172A",
      borderRadius: 22,
      paddingVertical: 22,
      marginBottom: 28,
    },

    summaryLabel: {
      color: "#94A3B8",
      fontSize: 12,
      textAlign: "center",
    },

    summaryValue: {
      color: "#FFFFFF",
      fontSize: 26,
      fontWeight: "900",
      marginTop: 6,
      textAlign: "center",
    },

    divider: {
      width: 1,
      height: 42,
      backgroundColor: "#334155",
    },

    sectionHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    sectionTitle: {
      color: "#0F172A",
      fontSize: 20,
      fontWeight: "900",
    },

    sectionAction: {
      color: "#2563EB",
      fontSize: 13,
      fontWeight: "800",
    },

    scheduleCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 18,
      marginBottom: 14,
    },

    scheduleHeader: {
      flexDirection: "row",
      alignItems: "center",
    },

    iconBox: {
      width: 46,
      height: 46,
      borderRadius: 15,
      backgroundColor: "#EFF6FF",
      alignItems: "center",
      justifyContent: "center",
    },

    scheduleIcon: {
      fontSize: 22,
    },

    scheduleHeading: {
      flex: 1,
      marginLeft: 12,
      marginRight: 8,
    },

    scheduleName: {
      color: "#0F172A",
      fontSize: 15,
      fontWeight: "800",
    },

    deviceText: {
      color: "#94A3B8",
      fontSize: 11,
      marginTop: 4,
    },

    timeRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 18,
    },

    timeBox: {
      flex: 1,
      backgroundColor: "#F8FAFC",
      borderRadius: 14,
      padding: 12,
    },

    timeLabel: {
      color: "#94A3B8",
      fontSize: 10,
      fontWeight: "700",
    },

    timeValue: {
      color: "#0F172A",
      fontSize: 18,
      fontWeight: "900",
      marginTop: 3,
    },

    arrow: {
      marginHorizontal: 12,
      color: "#94A3B8",
      fontSize: 20,
    },

    statusBox: {
      marginTop: 14,
      borderRadius: 12,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    },

    enabledBox: {
      backgroundColor: "#ECFDF5",
    },

    disabledBox: {
      backgroundColor: "#F1F5F9",
    },

    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginRight: 7,
    },

    enabledDot: {
      backgroundColor: "#10B981",
    },

    disabledDot: {
      backgroundColor: "#94A3B8",
    },

    statusText: {
      fontSize: 11,
      fontWeight: "800",
    },

    enabledText: {
      color: "#047857",
    },

    disabledText: {
      color: "#64748B",
    },

    deleteButton: {
      marginTop: 12,
      paddingVertical: 11,
      borderRadius: 12,
      backgroundColor: "#FEF2F2",
      alignItems: "center",
    },

    deleteButtonText: {
      color: "#DC2626",
      fontSize: 12,
      fontWeight: "800",
    },

    emptyCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
    },

    emptyIcon: {
      fontSize: 36,
    },

    emptyTitle: {
      color: "#0F172A",
      fontWeight: "800",
      marginTop: 10,
    },

    emptyText: {
      color: "#94A3B8",
      textAlign: "center",
      marginTop: 6,
      fontSize: 12,
      lineHeight: 18,
    },

    emptyButton: {
      marginTop: 18,
      backgroundColor: "#2563EB",
      paddingHorizontal: 18,
      paddingVertical: 11,
      borderRadius: 12,
    },

    emptyButtonText: {
      color: "#FFFFFF",
      fontWeight: "800",
    },

    infoCard: {
      marginTop: 12,
      backgroundColor: "#EFF6FF",
      borderRadius: 18,
      padding: 16,
      flexDirection: "row",
    },

    infoIcon: {
      fontSize: 22,
    },

    infoContent: {
      flex: 1,
      marginLeft: 12,
    },

    infoTitle: {
      color: "#1E3A8A",
      fontWeight: "800",
    },

    infoText: {
      marginTop: 4,
      color: "#64748B",
      fontSize: 11,
      lineHeight: 17,
    },
  });