import { useEffect, useState } from "react";

import {
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

import { router } from "expo-router";

import { database } from "../config/firebase";

import type { Device } from "../types/Device";

export default function AddAutomationScreen() {
  const [devices, setDevices] =
    useState<Device[]>([]);

  const [loadingDevices, setLoadingDevices] =
    useState(true);

  const [name, setName] =
    useState("");

  const [
    selectedDeviceId,
    setSelectedDeviceId,
  ] = useState("");

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [enabled, setEnabled] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  /*
   * Load devices from Firebase.
   */
  useEffect(() => {
    const devicesRef = ref(
      database,
      "devices"
    );

    const unsubscribe = onValue(
      devicesRef,

      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setDevices([]);
          setLoadingDevices(false);
          return;
        }

        const list: Device[] =
          Object.entries(data).map(
            ([id, value]) => ({
              id,

              ...(value as Omit<
                Device,
                "id"
              >),
            })
          );

        setDevices(list);

        setLoadingDevices(false);
      },

      (error) => {
        console.error(
          "Firebase device loading error:",
          error
        );

        setDevices([]);

        setLoadingDevices(false);

        setErrorMessage(
          "Unable to load devices from Firebase."
        );
      }
    );

    return () => unsubscribe();
  }, []);

  /*
   * Validate 24-hour time.
   *
   * Examples:
   * 08:30
   * 18:45
   * 23:59
   */
  const isValidTime = (
    value: string
  ) => {
    const timeRegex =
      /^([01]\d|2[0-3]):[0-5]\d$/;

    return timeRegex.test(value);
  };

  /*
   * Automatically insert :
   *
   * User types:
   * 1830
   *
   * Input becomes:
   * 18:30
   */
  const formatTimeInput = (
    value: string
  ) => {
    const numbers =
      value.replace(
        /[^0-9]/g,
        ""
      );

    if (numbers.length <= 2) {
      return numbers;
    }

    return `${numbers.slice(
      0,
      2
    )}:${numbers.slice(2, 4)}`;
  };

  /*
   * Create automation.
   */
  const saveAutomation =
    async () => {
      setErrorMessage("");

      const cleanName =
        name.trim();

      const cleanStart =
        startTime.trim();

      const cleanEnd =
        endTime.trim();

      /*
       * Validation
       */

      if (!cleanName) {
        setErrorMessage(
          "Please enter an automation name."
        );

        return;
      }

      if (!selectedDeviceId) {
        setErrorMessage(
          "Please select a device."
        );

        return;
      }

      if (
        !isValidTime(cleanStart)
      ) {
        setErrorMessage(
          "Please enter a valid start time using HH:MM."
        );

        return;
      }

      if (
        !isValidTime(cleanEnd)
      ) {
        setErrorMessage(
          "Please enter a valid end time using HH:MM."
        );

        return;
      }

      if (
        cleanStart === cleanEnd
      ) {
        setErrorMessage(
          "Start time and end time cannot be the same."
        );

        return;
      }

      try {
        setSaving(true);

        /*
         * Generate a unique Firebase
         * schedule ID.
         */
        const schedulesRef = ref(
          database,
          "schedules"
        );

        const newScheduleRef =
          push(schedulesRef);

        /*
         * Save automation.
         */
        await set(
          newScheduleRef,
          {
            name: cleanName,

            deviceId:
              selectedDeviceId,

            startTime:
              cleanStart,

            endTime:
              cleanEnd,

            enabled,

            createdAt:
              Date.now(),
          }
        );

        console.log(
          "✅ Automation created:",
          newScheduleRef.key
        );

        /*
         * IMPORTANT:
         *
         * Go directly back to the
         * automation screen.
         *
         * We don't depend on
         * Alert.alert callbacks.
         */
        router.replace(
          "/automation"
        );
      } catch (error) {
        console.error(
          "❌ Create automation error:",
          error
        );

        setErrorMessage(
          "Unable to create automation. Please check Firebase and try again."
        );

        Alert.alert(
          "Automation Error",
          "Unable to create automation."
        );
      } finally {
        setSaving(false);
      }
    };

  const selectedDevice =
    devices.find(
      (device) =>
        device.id ===
        selectedDeviceId
    );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.content
        }
      >
        {/* HEADER */}

        <Text style={styles.label}>
          SMARTNEST
        </Text>

        <Text style={styles.title}>
          New Automation
        </Text>

        <Text style={styles.subtitle}>
          Create a schedule to automatically
          control one of your smart-home
          devices.
        </Text>

        {/* FORM */}

        <View style={styles.formCard}>
          {/* AUTOMATION NAME */}

          <Text
            style={styles.fieldLabel}
          >
            Automation Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Example: Evening Garden Light"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          {/* DEVICE */}

          <Text
            style={[
              styles.fieldLabel,
              styles.fieldSpacing,
            ]}
          >
            Select Device
          </Text>

          {loadingDevices ? (
            <View
              style={
                styles.deviceLoading
              }
            >
              <ActivityIndicator
                size="small"
                color="#2563EB"
              />

              <Text
                style={
                  styles.deviceLoadingText
                }
              >
                Loading devices...
              </Text>
            </View>
          ) : devices.length === 0 ? (
            <View
              style={styles.noDevices}
            >
              <Text
                style={
                  styles.noDevicesTitle
                }
              >
                No devices available
              </Text>

              <Text
                style={
                  styles.noDevicesText
                }
              >
                Add devices to Firebase
                before creating an
                automation.
              </Text>
            </View>
          ) : (
            <View
              style={styles.deviceList}
            >
              {devices.map(
                (device) => {
                  const selected =
                    selectedDeviceId ===
                    device.id;

                  return (
                    <TouchableOpacity
                      key={device.id}
                      activeOpacity={0.8}
                      style={[
                        styles.deviceOption,

                        selected &&
                          styles.deviceOptionSelected,
                      ]}
                      onPress={() => {
                        setSelectedDeviceId(
                          device.id
                        );

                        setErrorMessage(
                          ""
                        );
                      }}
                    >
                      <View
                        style={
                          styles.deviceOptionContent
                        }
                      >
                        <Text
                          style={[
                            styles.deviceName,

                            selected &&
                              styles.deviceNameSelected,
                          ]}
                        >
                          {device.name}
                        </Text>

                        <Text
                          style={
                            styles.deviceMeta
                          }
                        >
                          {device.type}
                          {" • "}
                          {device.room ??
                            device.floorId}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.radio,

                          selected &&
                            styles.radioSelected,
                        ]}
                      >
                        {selected && (
                          <View
                            style={
                              styles.radioInner
                            }
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          )}

          {/* SELECTED DEVICE */}

          {selectedDevice && (
            <View
              style={
                styles.selectedDeviceBox
              }
            >
              <Text
                style={
                  styles.selectedLabel
                }
              >
                Selected
              </Text>

              <Text
                style={
                  styles.selectedDeviceName
                }
              >
                {selectedDevice.name}
              </Text>
            </View>
          )}

          {/* START TIME */}

          <Text
            style={[
              styles.fieldLabel,
              styles.fieldSpacing,
            ]}
          >
            Start Time
          </Text>

          <TextInput
            value={startTime}
            onChangeText={(value) =>
              setStartTime(
                formatTimeInput(
                  value
                )
              )
            }
            placeholder="18:00"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            keyboardType="numeric"
            maxLength={5}
          />

          <Text
            style={styles.helperText}
          >
            24-hour format — example 18:30
          </Text>

          {/* END TIME */}

          <Text
            style={[
              styles.fieldLabel,
              styles.fieldSpacing,
            ]}
          >
            End Time
          </Text>

          <TextInput
            value={endTime}
            onChangeText={(value) =>
              setEndTime(
                formatTimeInput(
                  value
                )
              )
            }
            placeholder="23:00"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            keyboardType="numeric"
            maxLength={5}
          />

          <Text
            style={styles.helperText}
          >
            24-hour format — example 23:00
          </Text>

          {/* ENABLED */}

          <View
            style={styles.enabledRow}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  styles.enabledTitle
                }
              >
                Enable Automation
              </Text>

              <Text
                style={
                  styles.enabledDescription
                }
              >
                Start using this rule
                immediately after saving.
              </Text>
            </View>

            <Switch
              value={enabled}
              onValueChange={
                setEnabled
              }
              trackColor={{
                false: "#CBD5E1",
                true: "#93C5FD",
              }}
              thumbColor={
                enabled
                  ? "#2563EB"
                  : "#F8FAFC"
              }
            />
          </View>
        </View>

        {/* ERROR */}

        {errorMessage !== "" && (
          <View
            style={styles.errorBox}
          >
            <Text
              style={
                styles.errorIcon
              }
            >
              ⚠️
            </Text>

            <Text
              style={
                styles.errorText
              }
            >
              {errorMessage}
            </Text>
          </View>
        )}

        {/* CREATE */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.saveButton,

            saving &&
              styles.saveButtonDisabled,
          ]}
          disabled={saving}
          onPress={
            saveAutomation
          }
        >
          {saving ? (
            <View
              style={styles.savingRow}
            >
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.saveButtonText
                }
              >
                Creating...
              </Text>
            </View>
          ) : (
            <Text
              style={
                styles.saveButtonText
              }
            >
              Create Automation
            </Text>
          )}
        </TouchableOpacity>

        {/* CANCEL */}

        <TouchableOpacity
          style={styles.cancelButton}
          disabled={saving}
          onPress={() =>
            router.back()
          }
        >
          <Text
            style={
              styles.cancelButtonText
            }
          >
            Cancel
          </Text>
        </TouchableOpacity>

        {/* INFORMATION */}

        <View
          style={styles.infoCard}
        >
          <Text
            style={styles.infoIcon}
          >
            ⚡
          </Text>

          <View
            style={styles.infoContent}
          >
            <Text
              style={
                styles.infoTitle
              }
            >
              Cloud Automation
            </Text>

            <Text
              style={
                styles.infoText
              }
            >
              Your schedule is saved in
              Firebase. The SmartNest
              simulator and backend
              scheduler will receive the
              automation automatically.
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
      paddingBottom: 50,
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
      marginBottom: 22,
    },

    formCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 22,
      padding: 18,
    },

    fieldLabel: {
      color: "#0F172A",
      fontSize: 13,
      fontWeight: "800",
      marginBottom: 8,
    },

    fieldSpacing: {
      marginTop: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: "#E2E8F0",
      borderRadius: 13,
      paddingHorizontal: 14,
      paddingVertical: 13,
      color: "#0F172A",
      backgroundColor: "#F8FAFC",
      fontSize: 14,
    },

    helperText: {
      marginTop: 5,
      color: "#94A3B8",
      fontSize: 10,
    },

    deviceList: {
      gap: 8,
    },

    deviceLoading: {
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    deviceLoadingText: {
      marginLeft: 8,
      color: "#64748B",
      fontSize: 12,
    },

    noDevices: {
      backgroundColor: "#F8FAFC",
      padding: 18,
      borderRadius: 14,
      alignItems: "center",
    },

    noDevicesTitle: {
      color: "#0F172A",
      fontWeight: "800",
    },

    noDevicesText: {
      marginTop: 4,
      color: "#94A3B8",
      fontSize: 11,
      textAlign: "center",
    },

    deviceOption: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#E2E8F0",
      backgroundColor: "#F8FAFC",
      padding: 12,
      borderRadius: 14,
    },

    deviceOptionSelected: {
      borderColor: "#2563EB",
      backgroundColor: "#EFF6FF",
    },

    deviceOptionContent: {
      flex: 1,
    },

    deviceName: {
      color: "#0F172A",
      fontSize: 13,
      fontWeight: "800",
    },

    deviceNameSelected: {
      color: "#1D4ED8",
    },

    deviceMeta: {
      marginTop: 4,
      color: "#94A3B8",
      fontSize: 10,
    },

    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#CBD5E1",
      alignItems: "center",
      justifyContent: "center",
    },

    radioSelected: {
      borderColor: "#2563EB",
    },

    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#2563EB",
    },

    selectedDeviceBox: {
      marginTop: 12,
      backgroundColor: "#ECFDF5",
      borderRadius: 12,
      padding: 10,
    },

    selectedLabel: {
      color: "#047857",
      fontSize: 9,
      fontWeight: "800",
      textTransform: "uppercase",
    },

    selectedDeviceName: {
      color: "#065F46",
      marginTop: 3,
      fontSize: 12,
      fontWeight: "800",
    },

    enabledRow: {
      marginTop: 22,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F8FAFC",
      borderRadius: 14,
      padding: 13,
    },

    enabledTitle: {
      color: "#0F172A",
      fontSize: 13,
      fontWeight: "800",
    },

    enabledDescription: {
      marginTop: 4,
      color: "#94A3B8",
      fontSize: 10,
      lineHeight: 15,
      maxWidth: 280,
    },

    errorBox: {
      marginTop: 14,
      backgroundColor: "#FEF2F2",
      borderWidth: 1,
      borderColor: "#FECACA",
      borderRadius: 14,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
    },

    errorIcon: {
      fontSize: 16,
      marginRight: 8,
    },

    errorText: {
      flex: 1,
      color: "#B91C1C",
      fontSize: 11,
      fontWeight: "700",
    },

    saveButton: {
      marginTop: 18,
      backgroundColor: "#2563EB",
      paddingVertical: 15,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },

    saveButtonDisabled: {
      opacity: 0.65,
    },

    savingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "900",
    },

    cancelButton: {
      marginTop: 10,
      paddingVertical: 14,
      alignItems: "center",
    },

    cancelButtonText: {
      color: "#64748B",
      fontSize: 13,
      fontWeight: "800",
    },

    infoCard: {
      marginTop: 14,
      backgroundColor: "#EFF6FF",
      padding: 16,
      borderRadius: 18,
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