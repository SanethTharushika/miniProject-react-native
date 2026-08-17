import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocalSearchParams,
} from "expo-router";

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import {
  onValue,
  ref,
  update,
} from "firebase/database";

import {
  database,
} from "../../config/firebase";

type ChildSwitch = {
  name: string;
  status: "ON" | "OFF";
};

type Device = {
  id?: string;
  name?: string;
  room?: string;
  type?: string;
  status?: "ON" | "OFF";

  switches?: Record<
    string,
    ChildSwitch
  >;

  controlledDevices?: Record<
    string,
    boolean
  >;
};

export default function DeviceDetailsScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const [
    device,
    setDevice,
  ] =
    useState<Device | null>(
      null
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /*
   * Route examples:
   *
   * 5
   * 05
   * 005
   * device005
   *
   * Firebase:
   * device005
   */

  const firebaseDeviceKey =
    useMemo(() => {
      if (!id) {
        return "";
      }

      const rawId =
        Array.isArray(id)
          ? id[0]
          : id;

      if (
        rawId.startsWith(
          "device"
        )
      ) {
        return rawId;
      }

      const paddedId =
        rawId.padStart(
          3,
          "0"
        );

      return `device${paddedId}`;
    }, [id]);

  useEffect(() => {
    if (!firebaseDeviceKey) {
      return;
    }

    setIsLoading(true);
    setError("");

    const firebasePath =
      `devices/${firebaseDeviceKey}`;

    console.log(
      "🔥 Reading Firebase path:",
      firebasePath
    );

    const deviceRef =
      ref(
        database,
        firebasePath
      );

    const unsubscribe =
      onValue(
        deviceRef,
        (snapshot) => {
          console.log(
            "🔥 Device exists:",
            snapshot.exists()
          );

          console.log(
            "🔥 Device data:",
            snapshot.val()
          );

          if (
            snapshot.exists()
          ) {
            setDevice(
              snapshot.val()
            );
          } else {
            setDevice(null);

            setError(
              `Device not found at ${firebasePath}`
            );
          }

          setIsLoading(false);
        },
        (firebaseError) => {
          console.error(
            "❌ Firebase device read error:",
            firebaseError
          );

          setError(
            firebaseError.message
          );

          setIsLoading(false);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [
    firebaseDeviceKey,
  ]);

  /*
   * MASTER SWITCH / BREAKER
   *
   * OFF:
   * - parent status becomes OFF
   * - every child becomes OFF
   *
   * ON:
   * - parent status becomes ON
   * - children remain OFF
   */

  async function toggleMasterSwitch() {
    if (!firebaseDeviceKey || !device) {
      return;
    }

    const isCurrentlyOn =
      device.status === "ON";

    const updates: Record<string, string> = {};

    if (isCurrentlyOn) {
      // Hall Main Breaker OFF
      updates[
        `devices/${firebaseDeviceKey}/status`
      ] = "OFF";

      // Nested Hall switches OFF
      Object.keys(
        device.switches || {}
      ).forEach((switchId) => {
        updates[
          `devices/${firebaseDeviceKey}/switches/${switchId}/status`
        ] = "OFF";
      });

      // ============================
      // DEVICES CONNECTED TO BREAKER
      // ============================

      // Bedroom Light
      updates[
        "devices/device004/status"
      ] = "OFF";

      // Bedroom Outlet
      updates[
        "devices/device010/status"
      ] = "OFF";

      // Balcony Light
      updates[
        "devices/device011/status"
      ] = "OFF";

      // Hall Camera
      updates[
        "devices/device012/status"
      ] = "OFF";

      console.log(
        "🔴 Hall breaker OFF - controlled devices OFF"
      );
    } else {
      // Only restore main breaker power
      updates[
        `devices/${firebaseDeviceKey}/status`
      ] = "ON";

      console.log(
        "🟢 Hall breaker ON"
      );
    }

    try {
      console.log(
        "🔥 Firebase updates:",
        updates
      );

      await update(
        ref(database),
        updates
      );

      console.log(
        "✅ Breaker update successful"
      );
    } catch (error) {
      console.error(
        "❌ Breaker update failed:",
        error
      );
    }
  }

  /*
   * INDIVIDUAL CHILD SWITCH
   */

  async function toggleChildSwitch(
    switchId: string,
    currentStatus:
      | "ON"
      | "OFF"
  ) {
    if (
      !firebaseDeviceKey ||
      !device
    ) {
      return;
    }

    /*
     * Do not allow child devices
     * while breaker is OFF.
     */
    if (
      device.status !== "ON"
    ) {
      console.log(
        "⚠️ Master switch is OFF"
      );

      return;
    }

    const newStatus:
      | "ON"
      | "OFF" =
      currentStatus === "ON"
        ? "OFF"
        : "ON";

    const switchPath =
      `devices/${firebaseDeviceKey}/switches/${switchId}`;

    console.log(
      "⚡ Updating switch:",
      switchPath,
      newStatus
    );

    try {
      const switchRef =
        ref(
          database,
          switchPath
        );

      await update(
        switchRef,
        {
          status:
            newStatus,
        }
      );

      console.log(
        `✅ ${switchId} changed to ${newStatus}`
      );
    } catch (
    firebaseError
    ) {
      console.error(
        "❌ Failed to update switch:",
        firebaseError
      );
    }
  }

  const switches =
    useMemo(
      () =>
        Object.entries(
          device?.switches ||
          {}
        ),
      [device]
    );

  if (isLoading) {
    return (
      <SafeAreaView
        style={
          styles.loadingContainer
        }
      >
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Loading device...
        </Text>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <Text
          style={styles.label}
        >
          SMART HOME DEVICE
        </Text>

        <Text
          style={styles.title}
        >
          Device not found
        </Text>

        <Text
          style={
            styles.errorText
          }
        >
          {error}
        </Text>

        <Text
          style={
            styles.debugText
          }
        >
          Route ID: {id}
        </Text>

        <Text
          style={
            styles.debugText
          }
        >
          Firebase key:{" "}
          {firebaseDeviceKey}
        </Text>
      </SafeAreaView>
    );
  }

  const masterIsOn =
    device.status === "ON";

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <Text
          style={styles.label}
        >
          SMART HOME DEVICE
        </Text>

        <Text
          style={styles.title}
        >
          {device.name ||
            "Device Details"}
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          {device.room
            ? `${device.room} • ${device.type ||
            "Device"
            }`
            : device.type ||
            "Device"}
        </Text>

        {/* Device Information */}

        <View
          style={
            styles.deviceInfoCard
          }
        >
          <View
            style={
              styles.infoRow
            }
          >
            <Text
              style={
                styles.infoLabel
              }
            >
              Device
            </Text>

            <Text
              style={
                styles.infoValue
              }
            >
              {device.id ||
                firebaseDeviceKey}
            </Text>
          </View>

          <View
            style={
              styles.infoRow
            }
          >
            <Text
              style={
                styles.infoLabel
              }
            >
              Type
            </Text>

            <Text
              style={
                styles.infoValue
              }
            >
              {device.type ||
                "Unknown"}
            </Text>
          </View>

          <View
            style={
              styles.infoRow
            }
          >
            <Text
              style={
                styles.infoLabel
              }
            >
              Status
            </Text>

            <Text
              style={
                masterIsOn
                  ? styles.statusOn
                  : styles.statusOff
              }
            >
              {device.status ||
                "UNKNOWN"}
            </Text>
          </View>
        </View>

        {device.type ===
          "MULTI_SWITCH" && (
            <>
              {/* MASTER BREAKER */}

              <View
                style={
                  styles.masterCard
                }
              >
                <View
                  style={
                    styles.masterInfo
                  }
                >
                  <Text
                    style={
                      styles.masterTitle
                    }
                  >
                    Main Switch
                  </Text>

                  <Text
                    style={
                      styles.masterDescription
                    }
                  >
                    {masterIsOn
                      ? "Power is available to all connected switches."
                      : "All connected switches are disabled."}
                  </Text>

                  <Text
                    style={
                      masterIsOn
                        ? styles.statusOn
                        : styles.statusOff
                    }
                  >
                    {masterIsOn
                      ? "ON"
                      : "OFF"}
                  </Text>
                </View>

                <Switch
                  value={
                    masterIsOn
                  }
                  onValueChange={
                    toggleMasterSwitch
                  }
                  trackColor={{
                    false:
                      "#CBD5E1",
                    true:
                      "#86EFAC",
                  }}
                  thumbColor={
                    masterIsOn
                      ? "#16A34A"
                      : "#F8FAFC"
                  }
                />
              </View>

              {/* CHILD SWITCHES */}

              <View
                style={
                  styles.card
                }
              >
                <Text
                  style={
                    styles.cardTitle
                  }
                >
                  Switch Controls
                </Text>

                <Text
                  style={
                    styles.cardSubtitle
                  }
                >
                  {masterIsOn
                    ? "Control each connected switch individually."
                    : "Turn on the main switch to control connected devices."}
                </Text>

                {switches.length ===
                  0 ? (
                  <Text
                    style={
                      styles.emptyText
                    }
                  >
                    No switches found
                    for this device.
                  </Text>
                ) : (
                  <View
                    style={
                      styles.switchList
                    }
                  >
                    {switches.map(
                      ([
                        switchId,
                        childSwitch,
                      ]) => (
                        <View
                          key={
                            switchId
                          }
                          style={[
                            styles.switchRow,

                            !masterIsOn &&
                            styles.disabledSwitchRow,
                          ]}
                        >
                          <View
                            style={
                              styles.switchInfo
                            }
                          >
                            <Text
                              style={[
                                styles.switchName,

                                !masterIsOn &&
                                styles.disabledText,
                              ]}
                            >
                              {
                                childSwitch.name
                              }
                            </Text>

                            <Text
                              style={
                                styles.switchId
                              }
                            >
                              {
                                switchId
                              }
                            </Text>

                            <Text
                              style={
                                childSwitch.status ===
                                  "ON"
                                  ? styles.statusOn
                                  : styles.statusOff
                              }
                            >
                              {
                                childSwitch.status
                              }
                            </Text>
                          </View>

                          <Switch
                            value={
                              childSwitch.status ===
                              "ON"
                            }
                            disabled={
                              !masterIsOn
                            }
                            onValueChange={() =>
                              toggleChildSwitch(
                                switchId,
                                childSwitch.status
                              )
                            }
                            trackColor={{
                              false:
                                "#CBD5E1",
                              true:
                                "#93C5FD",
                            }}
                            thumbColor={
                              childSwitch.status ===
                                "ON"
                                ? "#2563EB"
                                : "#F8FAFC"
                            }
                          />
                        </View>
                      )
                    )}
                  </View>
                )}
              </View>
            </>
          )}

        {device.type !==
          "MULTI_SWITCH" && (
            <View
              style={
                styles.card
              }
            >
              <Text
                style={
                  styles.cardTitle
                }
              >
                Device Control
              </Text>

              <Text
                style={
                  styles.cardSubtitle
                }
              >
                This device does
                not use multi-switch
                controls.
              </Text>
            </View>
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
        "#F3F6FB",
    },

    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },

    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
      backgroundColor:
        "#F3F6FB",
    },

    loadingText: {
      marginTop: 12,
      fontSize: 14,
      color: "#64748B",
    },

    label: {
      marginTop: 10,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.5,
      color: "#2563EB",
    },

    title: {
      marginTop: 6,
      fontSize: 28,
      fontWeight: "800",
      color: "#0F172A",
    },

    subtitle: {
      marginTop: 6,
      marginBottom: 20,
      fontSize: 14,
      color: "#64748B",
    },

    deviceInfoCard: {
      marginBottom: 18,
      borderRadius: 18,
      padding: 18,
      backgroundColor:
        "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },

    infoRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },

    infoLabel: {
      fontSize: 14,
      color: "#64748B",
    },

    infoValue: {
      maxWidth: "65%",
      fontSize: 14,
      fontWeight: "600",
      color: "#0F172A",
      textAlign: "right",
    },

    masterCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      borderRadius: 18,
      padding: 18,
      marginBottom: 16,
      backgroundColor:
        "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },

    masterInfo: {
      flex: 1,
      marginRight: 20,
    },

    masterTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: "#0F172A",
    },

    masterDescription: {
      marginTop: 5,
      fontSize: 12,
      lineHeight: 17,
      color: "#64748B",
    },

    card: {
      borderRadius: 18,
      padding: 18,
      backgroundColor:
        "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#0F172A",
    },

    cardSubtitle: {
      marginTop: 4,
      fontSize: 13,
      color: "#64748B",
    },

    switchList: {
      marginTop: 18,
    },

    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor:
        "#E2E8F0",
    },

    disabledSwitchRow: {
      opacity: 0.45,
    },

    switchInfo: {
      flex: 1,
      marginRight: 16,
    },

    switchName: {
      fontSize: 16,
      fontWeight: "600",
      color: "#0F172A",
    },

    disabledText: {
      color: "#94A3B8",
    },

    switchId: {
      marginTop: 3,
      fontSize: 11,
      color: "#94A3B8",
    },

    statusOn: {
      marginTop: 4,
      fontSize: 12,
      fontWeight: "700",
      color: "#16A34A",
    },

    statusOff: {
      marginTop: 4,
      fontSize: 12,
      fontWeight: "700",
      color: "#94A3B8",
    },

    emptyText: {
      marginTop: 18,
      fontSize: 14,
      color: "#64748B",
    },

    errorText: {
      marginTop: 12,
      fontSize: 14,
      color: "#DC2626",
    },

    debugText: {
      marginTop: 8,
      fontSize: 13,
      color: "#64748B",
    },
  });