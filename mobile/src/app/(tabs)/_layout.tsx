import { Slot, router, usePathname } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabsLayout() {
  const pathname = usePathname();

  const items = [
    {
      label: "Home",
      icon: "🏠",
      route: "/",
    },
    {
      label: "Floors",
      icon: "🏢",
      route: "/floors",
    },
    {
      label: "Automation",
      icon: "⏰",
      route: "/automation",
    },
    {
      label: "Reports",
      icon: "📊",
      route: "/reports",
    },
    {
      label: "Alerts",
      icon: "🔔",
      route: "/alerts",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.tabBar}>
        {items.map((item) => {
          const isActive =
            item.route === "/"
              ? pathname === "/"
              : pathname.startsWith(item.route);

          return (
            <TouchableOpacity
              key={item.label}
              style={styles.tabItem}
              onPress={() =>
                router.replace(item.route as any)
              }
              activeOpacity={0.7}
            >
              <Text style={styles.icon}>
                {item.icon}
              </Text>

              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                ]}
              >
                {item.label}
              </Text>

              {isActive && (
                <View style={styles.activeIndicator} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    flex: 1,
  },

  tabBar: {
    height: 74,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -3,
    },

    elevation: 12,
  },

  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  icon: {
    fontSize: 21,
    marginBottom: 3,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  activeLabel: {
    color: "#111827",
    fontWeight: "800",
  },

  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 30,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#111827",
  },
});