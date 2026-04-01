import { Redirect, Tabs } from "expo-router";
import { View } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

interface TabBarIconProps {
  focused: boolean;
  icon: string;
  title: string;
}

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? "#FE8C00" : "#5D5F6D"}
    />
    <Text>{title}</Text>
  </View>
);
export default function TabLayout() {
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.auth.isAuthenticated,
  );
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" icon={} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
