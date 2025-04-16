import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTheme } from "@/assets/theme/ThemeProvider";
import { useTranslation } from "react-i18next";
import { Feather } from "@expo/vector-icons";

interface LogoStyle {
  id: string;
  name: string;
  icon?: string;
}
interface OutputScreenParams {
  prompt: string;
  style: LogoStyle | {};
}

export default function OutputScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const params = useLocalSearchParams<OutputScreenParams>();
  const { prompt, style } = params;

  let styleName = "No Style";

  if (style && typeof style === "object") {
    const styleObj = style as unknown as LogoStyle;
    if (styleObj.name) {
      styleName = styleObj.name;
    }
  } else if (typeof style === "string") {
    try {
      const styleObj = JSON.parse(style);
      styleName = styleObj.name || "No Style";
    } catch (e) {
      styleName = style || "No Style";
    }
  }

  const handleClose = () => {
    router.back();
  };

  const handleCopy = () => {
    if (params.prompt) {
      console.log("Promt copied:", params.prompt);

      setTooltipVisible(true);

      setTimeout(() => {
        setTooltipVisible(false);
      }, 1500);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundMain },
      ]}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("output.title")}</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/defaultLogo.jpeg")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View
        style={[
          styles.promptContainer,
          { backgroundColor: theme.colors.cardSecondaryBackground },
        ]}
      >
        <View style={styles.promptHeader}>
          <Text
            style={{
              fontFamily: "ManropeBold",
              fontWeight: 700,
              fontSize: theme.fontSizes.medium,
              color: theme.colors.textPrimary,
            }}
          >
            {t("output.prompt")}
          </Text>
          <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
            <Feather name="copy" size={20} color="#9F9F9F" />
            <Text
              style={{
                fontFamily: "ManropeRegular",
                fontWeight: 400,
                fontSize: theme.fontSizes.small,
                color: theme.colors.textDark,
                marginLeft: 6,
                marginBottom: 6,
              }}
            >
              {t("output.copy")}
            </Text>
          </TouchableOpacity>
          {tooltipVisible && (
            <View style={styles.tooltipContainer}>
              <Text style={styles.tooltipText}>Copied!</Text>
            </View>
          )}
        </View>

        <Text
          style={{
            color: theme.colors.textPrimary,
            fontFamily: "ManropeRegular",
            fontSize: 16,
            lineHeight: 21,
            marginBottom: 12,
          }}
        >
          {prompt}
        </Text>

        <View style={styles.styleTagContainer}>
          <Text
            style={{
              fontSize: theme.fontSizes.small,
              fontWeight: 400,
              fontFamily: "ManropeRegular",
              color: theme.colors.textPrimary,
            }}
          >
            {styleName}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const logoSize = width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    fontFamily: "ManropeBold",
  },
  closeButton: {
    padding: 8,
  },
  logoContainer: {
    width: logoSize,
    height: logoSize,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  promptContainer: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginHorizontal: 20,
  },
  promptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  styleTagContainer: {
    backgroundColor: "rgba(58, 58, 70, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  tooltipContainer: {
    position: "absolute",
    backgroundColor: "rgba(3, 3, 23, 0.6)",
    padding: 8,
    borderRadius: 4,
    top: -40,
    right: 0,
    zIndex: 100,
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
  },
});
