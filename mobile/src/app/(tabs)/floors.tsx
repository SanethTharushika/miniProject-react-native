import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";

import { useDevices } from "../../hooks/useDevices";
import { useFloors } from "../../hooks/useFloors";

export default function FloorsScreen() {
  const {
    floors,
    loading: floorsLoading,
  } = useFloors();

  const {
    devices,
    loading: devicesLoading,
  } = useDevices();

  const [selectedFloorIndex, setSelectedFloorIndex] =
    useState(0);

  if (
    floorsLoading ||
    devicesLoading
  ) {
    return (
      <View
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
          Loading floors...
        </Text>
      </View>
    );
  }

  if (floors.length === 0) {
    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <Text
          style={styles.title}
        >
          Floors
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          No floor information
          found.
        </Text>
      </SafeAreaView>
    );
  }

  const selectedFloor =
    floors[
      Math.min(
        selectedFloorIndex,
        floors.length - 1
      )
    ];

  const floorDevices =
    devices.filter(
      (device) =>
        device.floorId ===
        selectedFloor.id
    );

  const activeDevices =
    floorDevices.filter(
      (device) =>
        device.status === "ON"
    );

  /*
   * Get unique room names
   * from the selected floor.
   */
  const rooms = Array.from(
    new Set(
      floorDevices
        .map(
          (device) =>
            device.room
        )
        .filter(
          (
            room
          ): room is string =>
            Boolean(room)
        )
    )
  );

  const getDeviceIcon = (
    type: string
  ) => {
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

        <Text
          style={styles.brand}
        >
          SMARTNEST
        </Text>

        <Text
          style={styles.title}
        >
          Floor Plan
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          View rooms and smart
          devices across your home.
        </Text>

        {/* Floor Selector */}

        <View
          style={
            styles.floorSelector
          }
        >
          {floors
            .slice(0, 2)
            .map(
              (
                floor,
                index
              ) => {
                const selected =
                  selectedFloorIndex ===
                  index;

                return (
                  <TouchableOpacity
                    key={
                      floor.id
                    }
                    activeOpacity={
                      0.8
                    }
                    style={[
                      styles.floorTab,

                      selected &&
                        styles.floorTabActive,
                    ]}
                    onPress={() =>
                      setSelectedFloorIndex(
                        index
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.floorTabText,

                        selected &&
                          styles.floorTabTextActive,
                      ]}
                    >
                      {
                        floor.name
                      }
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
        </View>

        {/* Floor heading */}

        <View
          style={
            styles.floorHeader
          }
        >
          <View>
            <Text
              style={
                styles.floorName
              }
            >
              {
                selectedFloor.name
              }
            </Text>

            <Text
              style={
                styles.floorDescription
              }
            >
              {rooms.length} rooms
              {"  •  "}
              {
                floorDevices.length
              }{" "}
              devices
            </Text>
          </View>

          <View
            style={
              styles.liveBadge
            }
          >
            <View
              style={
                styles.liveDot
              }
            />

            <Text
              style={
                styles.liveText
              }
            >
              Live
            </Text>
          </View>
        </View>

        {/* Floor Map */}

        <View
          style={
            styles.floorMapCard
          }
        >
          {rooms.length === 0 ? (
            <View
              style={
                styles.emptyRoom
              }
            >
              <Text
                style={
                  styles.emptyIcon
                }
              >
                🏠
              </Text>

              <Text
                style={
                  styles.emptyTitle
                }
              >
                No rooms found
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                Devices on this
                floor do not have
                room information.
              </Text>
            </View>
          ) : (
            <View
              style={
                styles.roomGrid
              }
            >
              {rooms.map(
                (
                  room,
                  index
                ) => {
                  const roomDevices =
                    floorDevices.filter(
                      (
                        device
                      ) =>
                        device.room ===
                        room
                    );

                  const roomActive =
                    roomDevices.filter(
                      (
                        device
                      ) =>
                        device.status ===
                        "ON"
                    ).length;

                  return (
                    <View
                      key={room}
                      style={[
                        styles.roomCard,

                        index % 3 ===
                          0 &&
                          styles.roomCardWide,
                      ]}
                    >
                      <View
                        style={
                          styles.roomHeader
                        }
                      >
                        <View>
                          <Text
                            style={
                              styles.roomTitle
                            }
                          >
                            {
                              room
                            }
                          </Text>

                          <Text
                            style={
                              styles.roomMeta
                            }
                          >
                            {
                              roomActive
                            }
                            /
                            {
                              roomDevices.length
                            }{" "}
                            active
                          </Text>
                        </View>

                        <Text
                          style={
                            styles.roomIcon
                          }
                        >
                          🏠
                        </Text>
                      </View>

                      <View
                        style={
                          styles.roomDeviceList
                        }
                      >
                        {roomDevices.map(
                          (
                            device
                          ) => (
                            <TouchableOpacity
                              key={
                                device.id
                              }
                              activeOpacity={
                                0.75
                              }
                              style={
                                styles.deviceMarker
                              }
                              onPress={() =>
                                router.push(
                                  `/device/${device.id}`
                                )
                              }
                            >
                              <View
                                style={
                                  styles.deviceMarkerIcon
                                }
                              >
                                <Text
                                  style={
                                    styles.deviceEmoji
                                  }
                                >
                                  {getDeviceIcon(
                                    device.type
                                  )}
                                </Text>
                              </View>

                              <View
                                style={
                                  styles.deviceInfo
                                }
                              >
                                <Text
                                  numberOfLines={
                                    1
                                  }
                                  style={
                                    styles.deviceName
                                  }
                                >
                                  {
                                    device.name
                                  }
                                </Text>

                                <View
                                  style={
                                    styles.statusRow
                                  }
                                >
                                  <View
                                    style={[
                                      styles.statusDot,

                                      device.status ===
                                      "ON"
                                        ? styles.statusDotOn
                                        : styles.statusDotOff,
                                    ]}
                                  />

                                  <Text
                                    style={[
                                      styles.deviceStatus,

                                      device.status ===
                                      "ON"
                                        ? styles.deviceStatusOn
                                        : styles.deviceStatusOff,
                                    ]}
                                  >
                                    {
                                      device.status
                                    }
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          )
                        )}
                      </View>
                    </View>
                  );
                }
              )}
            </View>
          )}

          {/* Direction row */}

          <View
            style={
              styles.directionRow
            }
          >
            <Text
              style={
                styles.directionText
              }
            >
              ← west
            </Text>

            <Text
              style={
                styles.directionText
              }
            >
              north ↑
            </Text>

            <Text
              style={
                styles.directionText
              }
            >
              east →
            </Text>
          </View>
        </View>

        {/* Small floor status */}

        <View
          style={
            styles.floorStatusCard
          }
        >
          <View>
            <Text
              style={
                styles.floorStatusLabel
              }
            >
              FLOOR STATUS
            </Text>

            <Text
              style={
                styles.floorStatusTitle
              }
            >
              {
                activeDevices.length
              }{" "}
              devices active
            </Text>
          </View>

          <View
            style={
              styles.floorStatusBadge
            }
          >
            <Text
              style={
                styles.floorStatusBadgeText
              }
            >
              {
                floorDevices.length
              }{" "}
              TOTAL
            </Text>
          </View>
        </View>

        <View
          style={
            styles.bottomSpacing
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
      paddingHorizontal: 20,
      paddingTop: 20,
    },

    loadingContainer: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
      backgroundColor:
        "#F3F6FB",
    },

    loadingText: {
      marginTop: 12,
      color: "#64748B",
      fontSize: 14,
    },

    brand: {
      fontSize: 11,
      fontWeight: "900",
      color: "#2563EB",
      letterSpacing: 2.2,
    },

    title: {
      fontSize: 30,
      fontWeight: "900",
      color: "#0F172A",
      marginTop: 10,
    },

    subtitle: {
      marginTop: 6,
      marginBottom: 20,
      color: "#64748B",
      fontSize: 14,
      lineHeight: 20,
    },

    /*
     * Floor selector
     */

    floorSelector: {
      flexDirection: "row",
      backgroundColor:
        "#E8EDF3",
      padding: 5,
      borderRadius: 20,
      marginBottom: 20,
    },

    floorTab: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
      paddingVertical: 14,
      borderRadius: 16,
    },

    floorTabActive: {
      backgroundColor:
        "#FFFFFF",

      shadowColor: "#000",
      shadowOpacity: 0.07,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },

      elevation: 2,
    },

    floorTabText: {
      color: "#64748B",
      fontSize: 14,
      fontWeight: "700",
    },

    floorTabTextActive: {
      color: "#047857",
      fontWeight: "900",
    },

    /*
     * Floor heading
     */

    floorHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 14,
    },

    floorName: {
      fontSize: 23,
      fontWeight: "900",
      color: "#0F172A",
    },

    floorDescription: {
      marginTop: 4,
      color: "#64748B",
      fontSize: 12,
    },

    liveBadge: {
      flexDirection: "row",
      alignItems: "center",
    },

    liveDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor:
        "#059669",
      marginRight: 6,
    },

    liveText: {
      color: "#475569",
      fontSize: 12,
      fontWeight: "700",
    },

    /*
     * Floor map
     */

    floorMapCard: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 26,
      padding: 14,
      borderWidth: 1,
      borderColor: "#E2E8F0",

      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 2,
    },

    roomGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },

    roomCard: {
      width: "48.5%",
      minHeight: 185,
      padding: 13,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#CBD5E1",
      backgroundColor:
        "#F8FAFC",
    },

    roomCardWide: {
      width: "100%",
      minHeight: 150,
    },

    roomHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    roomTitle: {
      color: "#0F172A",
      fontSize: 16,
      fontWeight: "900",
      maxWidth: "80%",
    },

    roomMeta: {
      color: "#94A3B8",
      fontSize: 10,
      marginTop: 3,
    },

    roomIcon: {
      fontSize: 16,
    },

    roomDeviceList: {
      gap: 8,
    },

    /*
     * Device markers
     */

    deviceMarker: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "#FFFFFF",
      padding: 9,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#E2E8F0",
    },

    deviceMarkerIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      backgroundColor:
        "#EFF6FF",
      justifyContent:
        "center",
      alignItems: "center",
    },

    deviceEmoji: {
      fontSize: 16,
    },

    deviceInfo: {
      flex: 1,
      marginLeft: 8,
    },

    deviceName: {
      color: "#0F172A",
      fontSize: 11,
      fontWeight: "800",
    },

    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
    },

    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 5,
    },

    statusDotOn: {
      backgroundColor:
        "#10B981",
    },

    statusDotOff: {
      backgroundColor:
        "#94A3B8",
    },

    deviceStatus: {
      fontSize: 9,
      fontWeight: "800",
    },

    deviceStatusOn: {
      color: "#059669",
    },

    deviceStatusOff: {
      color: "#94A3B8",
    },

    /*
     * Directions
     */

    directionRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginTop: 15,
      paddingHorizontal: 3,
    },

    directionText: {
      color: "#64748B",
      fontSize: 10,
    },

    /*
     * Floor status
     */

    floorStatusCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      backgroundColor:
        "#0F172A",
      borderRadius: 20,
      padding: 18,
      marginTop: 16,
    },

    floorStatusLabel: {
      color: "#60A5FA",
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.4,
    },

    floorStatusTitle: {
      color: "#FFFFFF",
      marginTop: 5,
      fontSize: 16,
      fontWeight: "800",
    },

    floorStatusBadge: {
      backgroundColor:
        "#1E293B",
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 11,
    },

    floorStatusBadgeText: {
      color: "#E2E8F0",
      fontSize: 9,
      fontWeight: "900",
    },

    /*
     * Empty state
     */

    emptyRoom: {
      paddingVertical: 40,
      alignItems: "center",
    },

    emptyIcon: {
      fontSize: 30,
    },

    emptyTitle: {
      marginTop: 8,
      color: "#0F172A",
      fontSize: 16,
      fontWeight: "900",
    },

    emptyText: {
      marginTop: 5,
      color: "#94A3B8",
      fontSize: 11,
      textAlign: "center",
      maxWidth: 250,
    },

    bottomSpacing: {
      height: 35,
    },
  });