import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { ThemeProvider } from "@/assets/theme/ThemeProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    ManropeRegular: require("./../assets/fonts/Manrope-Regular.ttf"),
    ManropeBold: require("./../assets/fonts/Manrope-Bold.ttf"),
    ManropeMedium: require("./../assets/fonts/Manrope-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <I18nextProvider i18n={i18n}>
          <Stack
            screenOptions={{
              headerTransparent: true,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="screens/OutputScreen"
              options={{
                headerShown: false,
                animation: "fade_from_bottom",
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </I18nextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
