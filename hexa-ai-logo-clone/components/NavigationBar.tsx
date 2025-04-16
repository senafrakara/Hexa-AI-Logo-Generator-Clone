import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/assets/theme/ThemeProvider";

const NavigationBar = () => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: theme.colors.backgroundMain,
        },
      ]}
    >
      <View style={styles.headerContent}>
        <Text
          style={{
            fontSize: theme.fontSizes.large,
            color: theme.colors.textPrimary,
            fontFamily: "ManropeBold",
            textAlign: "center",
            flex: 1,
          }}
        >
          {t("appName")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContent: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default NavigationBar;
