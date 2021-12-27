import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import commonSettings from "./global.js";
import darkBase from "./darkBase";
import makeMuiTheme from "./makeMuiTheme";

export const theme = {
  ...darkBase,
  gold: "#3c9de0", // Light green
  goldDimmed: "#3078ab",
  goldBright: "#46b0fa",
  textHighlightColor: "#46b0fa",
  primaryButtonHoverBG: "#3078ab", //gold became dark green
  outlinedPrimaryButtonHoverBG: "#3078ab", //gold became dark green
  outlinedSecondaryButtonHoverColor: "#3078ab", //gold became dark green
  chartColors: ["#3c9de0", "#d1cc41", "#ba6cd4"],
  mainBackground:
    "linear-gradient(180deg, rgba(2, 23, 35, 0), rgba(4, 10, 13, 0.9)), " +
    "linear-gradient(333deg, rgba(29, 125, 191, 0.2), rgba(2, 15, 27, 0.08)), " +
    "radial-gradient(circle at 77% 89%, rgba(4, 15, 25, 0.8), rgba(2, 12, 23, 0) 50%), " +
    "radial-gradient(circle at 15% 95%, rgba(4, 15, 23, 0.8), rgba(4, 17, 23, 0) 43%), " +
    "radial-gradient(circle at 65% 23%, rgba(4, 35, 50, 0.4), rgba(2, 21, 33, 0) 70%), " +
    "radial-gradient(circle at 10% 0%, rgba(6, 12, 15, 0.33), rgba(5, 14, 21, 0) 35%), " +
    "radial-gradient(circle at 11% 100%, rgba(6, 23, 25, 0.3), rgba(2, 23, 255, 0) 30%)",
};

export const darkBlue = responsiveFontSizes(createTheme(makeMuiTheme(theme, "dark"), commonSettings));
