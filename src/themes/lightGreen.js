import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import commonSettings from "./global.js";
import lightBase from "./lightBase";
import makeMuiTheme from "./makeMuiTheme";

export const theme = {
  ...lightBase,
  gold: "#46ab15", // Light green
  goldDimmed: "#376e1d",
  goldBright: "#6dd63a",
  textHighlightColor: "#5bc422",
  primaryButtonHoverBG: "#379414", //gold became dark green
  outlinedPrimaryButtonHoverBG: "#379414", //gold became dark green
  outlinedSecondaryButtonHoverColor: "#379414", //gold became dark green
  chartColors: ["#46ab15", "#598fb5", "#775bb5"],
  mainBackground:
    "linear-gradient(180deg, rgba(247, 251, 252, 0.8), rgba(247, 251, 252, 0.9)), " +
    "linear-gradient(333deg, rgba(247, 251, 252, 0.7), rgba(247, 251, 252, 0.08)), " +
    "radial-gradient(circle at 77% 89%, rgba(247, 251, 252, 0.8), rgba(247, 251, 252, 0) 50%), " +
    "radial-gradient(circle at 15% 95%, rgba(150, 251, 150, 0.8), rgba(247, 251, 252, 0) 43%), " +
    "radial-gradient(circle at 65% 23%, rgba(150, 251, 150, 0.4), rgba(247, 251, 252, 0) 70%), " +
    "radial-gradient(circle at 10% 0%, rgba(247, 251, 252, 0.33), rgba(247, 251, 252, 0) 35%), " +
    "radial-gradient(circle at 11% 100%, rgba(247, 251, 252, 0.3), rgba(247, 251, 252, 0) 30%)",
};

export const lightGreen = responsiveFontSizes(createTheme(makeMuiTheme(theme, "light"), commonSettings));
