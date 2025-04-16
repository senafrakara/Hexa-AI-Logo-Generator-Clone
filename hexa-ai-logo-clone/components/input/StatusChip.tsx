import React, { useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "@/assets/theme/ThemeProvider";
import { useTranslation } from "react-i18next";
import { STATUS } from "@/constants/ProcessStatus";
import { LinearGradient } from "expo-linear-gradient";

type Status = keyof typeof STATUS;

interface StatusChipProps {
  status: Status;
  minutes?: number;
  onPress: () => void;
}

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  minutes,
  onPress,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [message, setMessage] = React.useState<string>("");
  const [submessage, setSubmessage] = React.useState<string>("");

  useEffect(() => {
    if (status === STATUS.CREATING) {
      setMessage(t("input.creatingProcess"));
      setSubmessage(t("input.timeLeft", { count: minutes }));
    } else if (status === STATUS.DONE) {
      setMessage(t("input.doneDesign"));
      setSubmessage(t("input.tapToSeeDesign"));
    } else if (status === STATUS.ERROR) {
      setMessage(t("input.errorDesign"));
      setSubmessage(t("input.tryAgain"));
    }
  }, [status]);

  const renderIcon = () => {
    switch (status) {
      case STATUS.CREATING:
        return (
          <View style={[styles.iconContainer, { backgroundColor: "#18181B" }]}>
            <View style={[styles.loadingSpinner, { borderColor: "#FFFFFF" }]} />
          </View>
        );
      case STATUS.DONE:
        const logoSource = require("@/assets/images/defaultLogo.jpeg");
        return (
          <View style={[styles.iconContainer, { backgroundColor: "#FFFFFF" }]}>
            <Image
              source={logoSource}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        );
      case STATUS.ERROR:
        return (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.errorColor },
            ]}
          >
            <Image
              source={require("@/assets/images/error.png")}
              style={styles.errorIcon}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const renderText = () => {
    switch (status) {
      case STATUS.CREATING:
        return (
          <View
            style={[
              styles.textContainer,
              {
                backgroundColor: theme.colors.cardSecondaryBackground,
                opacity: 0.9,
              },
            ]}
          >
            <Text
              style={{
                fontSize: theme.fontSizes.medium,
                color: theme.colors.textPrimary,
                fontFamily: "ManropeBold",
                fontWeight: "800",
                letterSpacing: 0.5,
                textAlign: "left",
              }}
            >
              {message}
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizes.small,
                color: theme.colors.textSecondary,
                fontFamily: "ManropeRegular",
                fontWeight: "500",
                letterSpacing: 0.5,
                textAlign: "left",
                marginTop: 2,
              }}
            >
              {submessage}
            </Text>
          </View>
        );
      case STATUS.DONE:
        return (
          <LinearGradient
            colors={["#3953FF", "#9F3DFF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1, height: "100%" }}
          >
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: theme.fontSizes.medium,
                  color: "#FFFFFF",
                  fontFamily: "ManropeBold",
                  fontWeight: "800",
                  letterSpacing: 0.5,
                  textAlign: "left",
                }}
              >
                {message}
              </Text>
              <Text
                style={{
                  fontSize: theme.fontSizes.small,
                  color: "rgba(255, 255, 255, 0.8)",
                  fontFamily: "ManropeRegular",
                  fontWeight: "500",
                  letterSpacing: 0.5,
                  textAlign: "left",
                  marginTop: 2,
                }}
              >
                {submessage}
              </Text>
            </View>
          </LinearGradient>
        );
      case STATUS.ERROR:
        return (
          <View
            style={[
              styles.textContainer,
              {
                backgroundColor: theme.colors.errorTertiary,
              },
            ]}
          >
            <Text
              style={{
                fontSize: theme.fontSizes.medium,
                color: theme.colors.textPrimary,
                fontFamily: "ManropeBold",
                fontWeight: "800",
                letterSpacing: 0.5,
                textAlign: "left",
              }}
            >
              {message}
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizes.small,
                color: theme.colors.errorTextColor,
                fontFamily: "ManropeRegular",
                fontWeight: "500",
                letterSpacing: 0.5,
                textAlign: "left",
                marginTop: 2,
              }}
            >
              {submessage}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {renderIcon()}
      {renderText()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 10,
    height: 72,
  },
  iconContainer: {
    width: 72,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
    height: "100%",
  },
  loadingSpinner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderTopColor: "transparent",
    borderRightColor: "white",
    borderBottomColor: "white",
    borderLeftColor: "white",
  },
  logo: {
    width: 48,
    height: 48,
  },
  errorIcon: {
    width: 32,
    height: 32,
  },
});

export default StatusChip;
