import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import commonSettings from "./global.js";
import darkBase from "./darkBase";
import makeMuiTheme from "./makeMuiTheme";

export const theme = {
  ...darkBase,
  gold: "#46ab15", // Light green
  goldDimmed: "#376e1d",
  goldBright: "#6dd63a",
  textHighlightColor: "#5bc422",
  primaryButtonHoverBG: "#379414", //gold became dark green
  outlinedPrimaryButtonHoverBG: "#379414", //gold became dark green
  outlinedSecondaryButtonHoverColor: "#379414", //gold became dark green
  chartColors: ["#46ab15", "#598fb5", "#775bb5"],
  mainBackground:
    "linear-gradient(180deg, rgba(8, 35, 23, 0), rgba(10, 13, 10, 0.9)), " +
    "linear-gradient(333deg, rgba(13, 27, 15, 0.2), rgba(18, 25, 17, 0.08)), " +
    "radial-gradient(circle at 77% 89%, rgba(15, 25, 15, 0.8), rgba(15, 23, 19, 0) 50%), " +
    "radial-gradient(circle at 15% 95%, rgba(15, 23, 15, 0.8), rgba(15, 23, 19, 0) 43%), " +
    "radial-gradient(circle at 65% 23%, rgba(20, 42, 19, 0.4), rgba(23, 32, 21, 0) 70%), " +
    "radial-gradient(circle at 10% 0%, rgba(12, 33, 12, 0.33), rgba(17, 21, 14, 0) 35%), " +
    "radial-gradient(circle at 11% 100%, rgba(11, 25, 23, 0.3), rgba(11, 35, 23, 0) 30%)",
};

export const darkGreen = responsiveFontSizes(createTheme(makeMuiTheme(theme, "dark"), commonSettings));
