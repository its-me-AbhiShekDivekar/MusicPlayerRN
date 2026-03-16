import { PixelRatio, useColorScheme, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { SPACING_BASE } from "../constants/spacing";
import { TYPOGRAPHY_BASE } from "../constants/typography";

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const systemFontScale = PixelRatio.getFontScale();

  const isDark = colorScheme === "dark";
  const theme = isDark ? COLORS.dark : COLORS.light;

  const layoutWidth = width > 600 ? 600 : width;
  const scaleFactor = layoutWidth / 375;
  const responsiveSize = (size: number) => size * scaleFactor;
  const responsiveFont = (size: number) =>
    Math.round(
      PixelRatio.roundToNearestPixel(size * scaleFactor * systemFontScale),
    );

  return {
    theme,
    isDark,
    insets,
    isLandscape: width > height,
    spacing: {
      tiny: responsiveSize(SPACING_BASE.tiny),
      small: responsiveSize(SPACING_BASE.small),
      medium: responsiveSize(SPACING_BASE.medium),
      large: responsiveSize(SPACING_BASE.large),
      xlarge: responsiveSize(SPACING_BASE.xlarge),
    },
    typography: {
      header: {
        fontSize: responsiveFont(TYPOGRAPHY_BASE.header),
        fontWeight: "700" as const,
      },
      subheader: {
        fontSize: responsiveFont(TYPOGRAPHY_BASE.subheader),
        fontWeight: "600" as const,
      },
      body: {
        fontSize: responsiveFont(TYPOGRAPHY_BASE.body),
        fontWeight: "400" as const,
      },
      caption: {
        fontSize: responsiveFont(TYPOGRAPHY_BASE.caption),
        fontWeight: "400" as const,
      },
    },
  };
};
