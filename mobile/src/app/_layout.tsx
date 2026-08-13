import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#111827",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "700",
        },
        contentStyle: {
          backgroundColor: "#F5F7FB",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="floors"
        options={{
          title: "Floors",
        }}
      />

      <Stack.Screen
        name="devices"
        options={{
          title: "Smart Devices",
        }}
      />

      <Stack.Screen
        name="automation"
        options={{
          title: "Automation",
        }}
      />

      <Stack.Screen
        name="reports"
        options={{
          title: "Reports",
        }}
      />

      <Stack.Screen
        name="alerts"
        options={{
          title: "Alerts",
        }}
      />

      <Stack.Screen
        name="floor/[id]"
        options={{
          title: "Floor Details",
        }}
      />
    </Stack>
  );
}