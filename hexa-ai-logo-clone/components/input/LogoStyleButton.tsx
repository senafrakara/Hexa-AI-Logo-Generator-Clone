import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "@/assets/theme/ThemeProvider";
import { useTranslation } from "react-i18next";

interface LogoStyleButtonProps {
  icon: any;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const LogoStyleButton: React.FC<LogoStyleButtonProps> = ({
  icon,
  label,
  selected,
  onPress,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            borderColor: selected ? theme.colors.textPrimary : "none",
            borderWidth: selected ? 2 : 0,
            borderRadius: 16,
            backgroundColor: label == "noStyle" ? "#31316d" : "none",
          },
        ]}
      >
        <Image
          style={{
            width: label == "noStyle" ? 40 : 90,
            height: label == "noStyle" ? 40 : 90,
          }}
          source={icon}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          color: selected
            ? theme.colors.textPrimary
            : theme.colors.textSecondary,
          fontSize: theme.fontSizes.small,
          textAlign: "center",
          fontWeight: "700",
          fontFamily: "ManropeBold",
        }}
      >
        {t(`input.styles.${label}`)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 120,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconContainer: {
    marginBottom: 8,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
});

export default LogoStyleButton;
