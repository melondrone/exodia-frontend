import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import commonSettings from "./global.js";
import lightBase from "./lightBase";
import makeMuiTheme from "./makeMuiTheme";

export const theme = {
  ...lightBase,
  gold: "#ca4456", // Light green
  goldDimmed: "#962f3d",
  goldBright: "#f54e65",
  textHighlightColor: "#f54e65",
  primaryButtonHoverBG: "#962f3d", //gold became dark green
  outlinedPrimaryButtonHoverBG: "#962f3d", //gold became dark green
  outlinedSecondaryButtonHoverColor: "#962f3d", //gold became dark green
  chartColors: ["#ca4456", "#2b374a", "#51b6b8"],
  mainBackground:
    "linear-gradient(180deg, rgba(247, 251, 252, 0.8), rgba(247, 251, 252, 0.9)), " +
    "linear-gradient(333deg, rgba(247, 251, 252, 0.7), rgba(247, 251, 252, 0.08)), " +
    "radial-gradient(circle at 77% 89%, rgba(247, 251, 252, 0.8), rgba(247, 251, 252, 0) 50%), " +
    "radial-gradient(circle at 15% 95%, rgba(150, 150, 251, 0.8), rgba(247, 251, 252, 0) 43%), " +
    "radial-gradient(circle at 65% 23%, rgba(150, 150, 251, 0.4), rgba(247, 251, 252, 0) 70%), " +
    "radial-gradient(circle at 10% 0%, rgba(247, 251, 252, 0.33), rgba(247, 251, 252, 0) 35%), " +
    "radial-gradient(circle at 11% 100%, rgba(247, 251, 252, 0.3), rgba(247, 251, 252, 0) 30%)",
};

export const lightRed = responsiveFontSizes(createTheme(makeMuiTheme(theme, "light", "lightRed"), commonSettings));
