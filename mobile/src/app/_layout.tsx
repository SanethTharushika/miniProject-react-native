import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="devices"
        options={{
          title: "Devices",
        }}
      />

      <Stack.Screen
        name="floor/[id]"
        options={{
          title: "Floor Details",
        }}
      />

      <Stack.Screen
        name="device/[id]"
        options={{
          title: "Device Details",
        }}
      />
    </Stack>
  );
}