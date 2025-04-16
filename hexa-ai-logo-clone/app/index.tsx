import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/assets/theme/ThemeProvider";
import StatusChip from "@/components/input/StatusChip";
import { router } from "expo-router";
import { STATUS } from "@/constants/ProcessStatus";
import LogoStyleList from "@/components/input/LogoStyleList";
import { createLogoRequest } from "@/services/LogoService";
import { LinearGradient } from "expo-linear-gradient";
import { LOGO_STYLES } from "@/constants/LogoStyles";
import NavigationBar from "@/components/NavigationBar";

export default function InputScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  type Status = keyof typeof STATUS;

  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("none");
  const [status, setStatus] = useState<any>(null);
  const [minutes, setMinutes] = useState<number>(2);
  const [processingStartTime, setProcessingStartTime] = useState<number | null>(
    null
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleChipPress = () => {
    if (status === STATUS.DONE) {
      const selectedStyleObject = LOGO_STYLES.find(
        (style) => style.id === selectedStyle
      );

      router.push({
        pathname: "/screens/OutputScreen",
        params: {
          prompt,
          style: JSON.stringify(selectedStyleObject || {}),
        },
      });
    } else if (status === STATUS.ERROR) {
      handleCreateLogo();
    }
  };

  const handleCreateLogo = async () => {
    if (!prompt.trim()) return;

    setStatus(STATUS.CREATING);
    setProcessingStartTime(Date.now());
    setButtonDisabled(true);

    try {
      createLogoRequest({
        prompt,
        style: selectedStyle,
      })
        .then((response) => {
          console.log("Logo request created successfully:", response);
          setButtonDisabled(false);
        })
        .catch((error) => {
          console.error("Error creating logo request:", error);
          setButtonDisabled(false);
        });

      const processingTime = Math.floor(Math.random() * 31000) + 30000;

      console.log("processing time:", processingTime);

      setTimeout(() => {
        const success = Math.random() < 0.95;

        if (success) {
          setStatus(STATUS.DONE);
        } else {
          setStatus(STATUS.ERROR);
        }
      }, processingTime);
    } catch (error) {
      console.error("Error creating logo request:", error);
      setStatus(STATUS.ERROR);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (status === STATUS.CREATING && processingStartTime) {
      const interval = setInterval(() => {
        const elapsedSeconds = (Date.now() - processingStartTime) / 1000;
        const remainingMinutes = Math.max(
          0,
          Math.ceil((60 - elapsedSeconds) / 60)
        );
        setMinutes(remainingMinutes || 1);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [status, processingStartTime]);

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.backgroundMain },
      ]}
    >
      <NavigationBar />

      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {status && (
          <StatusChip
            status={status}
            minutes={minutes}
            onPress={handleChipPress}
          />
        )}

        <View>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.fontSizes.large,
              fontFamily: "ManropeBold",
              fontWeight: "bold",
              marginTop: theme.spacing.small,
              marginBottom: theme.spacing.medium,
              textAlign: "left",
            }}
          >
            {t("input.title")}
          </Text>

          <TouchableOpacity style={styles.surpriseButton}>
            <Text
              style={{
                fontSize: theme.fontSizes.small,
                color: theme.colors.textPrimary,
                fontWeight: "400",
                gap: 8,
                textAlign: "right",
                fontFamily: "ManropeRegular",
              }}
            >
              {t("input.surpriseMe")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: theme.spacing.medium }}>
          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.cardSecondaryBackground,
                borderColor: isFocused
                  ? theme.colors.textPrimary
                  : "transparent",
                borderWidth: isFocused ? 1 : 0,
                borderRadius: theme.borderRadius.lg,
                fontSize: theme.fontSizes.medium,
                fontFamily: "ManropeRegular",
                padding: theme.spacing.medium,
              },
            ]}
            placeholder={t("input.promptPlaceholder")}
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="sentences"
            autoCorrect={false}
            autoComplete="off"
            textAlignVertical="top"
            selectionColor={theme.colors.primary}
            cursorColor={theme.colors.primary}
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={500}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <Text
            style={{
              position: "absolute",
              bottom: theme.spacing.small,
              left: theme.spacing.medium,
              color: theme.colors.textSecondary,
              fontSize: theme.fontSizes.small,
            }}
          >
            {t("input.charactersRemaining", {
              count: prompt ? prompt.length : 0,
            })}
          </Text>
        </View>

        <View style={{ marginBottom: 100 }}>
          {" "}
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.fontSizes.large,
              fontWeight: "800",
              fontFamily: "ManropeBold",
              marginBottom: theme.spacing.medium,
              marginTop: theme.spacing.large,
            }}
          >
            {t("input.logoStyles")}
          </Text>
          <LogoStyleList setSelectedStyle={setSelectedStyle} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={["#3953FF", "#9F3DFF"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.createButton}
        >
          <TouchableOpacity
            onPress={handleCreateLogo}
            style={styles.buttonTouchable}
            disabled={buttonDisabled}
            activeOpacity={0.8}
          >
            <View style={styles.createButtonContent}>
              <Text
                style={{
                  fontSize: theme.fontSizes.large,
                  fontFamily: "ManropeBold",
                  color: theme.colors.textPrimary,
                  fontWeight: "800",
                  marginRight: 8,
                }}
              >
                {t("input.createButton")}
              </Text>
              <Image
                source={require("@/assets/images/star.png")}
                style={styles.starsIcon}
              />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  input: {
    padding: 12,
    minHeight: 175,
    textAlignVertical: "top",
  },
  surpriseButton: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: "transparent",
  },
  createButton: {
    borderRadius: 50,
    overflow: "hidden",
  },
  buttonTouchable: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starsIcon: {
    width: 20,
    height: 20,
  },
});
