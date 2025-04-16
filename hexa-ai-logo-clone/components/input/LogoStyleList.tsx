import React, { useState } from "react";
import { View, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import LogoStyleButton from "./LogoStyleButton";
import { LOGO_STYLES } from "@/constants/LogoStyles";

interface LogoStyle {
  id: string;
  icon: any;
  labelKey: string;
}
interface LogoStyleListProps {
  setSelectedStyle: (id: string) => void;
}
const LogoStyleList: React.FC<LogoStyleListProps> = ({ setSelectedStyle }) => {
  const [selectedStyle, setLocalSelectedStyle] = useState<string>(
    LOGO_STYLES.find((style) => style.id === "none")?.id || ""
  );

  const renderItem = ({ item }: ListRenderItemInfo<LogoStyle>) => (
    <LogoStyleButton
      icon={item.icon}
      label={item.labelKey}
      selected={selectedStyle === item.id}
      onPress={() => {
        setLocalSelectedStyle(item.id);
        setSelectedStyle(item.labelKey);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={LOGO_STYLES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default LogoStyleList;
