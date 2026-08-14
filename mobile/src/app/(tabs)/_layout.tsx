import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
} from "expo-router/ui";

import {
  StyleSheet,
  Text,
} from "react-native";

export default function TabsLayout() {
  return (
    <Tabs style={styles.container}>
      <TabSlot style={styles.content} />

      <TabList style={styles.tabBar}>
        <TabTrigger
          name="home"
          href="/"
          style={styles.tab}
        >
          <Text style={styles.icon}>⌂</Text>
          <Text style={styles.label}>Home</Text>
        </TabTrigger>

        <TabTrigger
          name="floors"
          href="/floors"
          style={styles.tab}
        >
          <Text style={styles.icon}>▦</Text>
          <Text style={styles.label}>Floors</Text>
        </TabTrigger>

        <TabTrigger
          name="activity"
          href="/activity"
          style={styles.tab}
        >
          <Text style={styles.icon}>◷</Text>
          <Text style={styles.label}>Activity</Text>
        </TabTrigger>

        <TabTrigger
          name="settings"
          href="/settings"
          style={styles.tab}
        >
          <Text style={styles.icon}>⚙</Text>
          <Text style={styles.label}>Settings</Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F2",
  },

  content: {
    flex: 1,
  },

  tabBar: {
    height: 72,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 22,
    color: "#276749",
    marginBottom: 3,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },
});