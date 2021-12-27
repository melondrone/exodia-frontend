import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import commonSettings from "./global.js";
import darkBase from "./darkBase";
import makeMuiTheme from "./makeMuiTheme";

export const theme = {
  ...darkBase,
  gold: "#eec900", // Light green
  goldDimmed: "#b88d00",
  goldBright: "#dbc025",
  textHighlightColor: "#dbc025",
  primaryButtonColor: "#1F1F1F",
  primaryButtonHoverBG: "#b88d00", //gold became dark green
  outlinedPrimaryButtonHoverBG: "#b88d00", //gold became dark green
  outlinedSecondaryButtonHoverColor: "#b88d00", //gold became dark green
  chartColors: ["#eec900", "#ba6227", "#806439"],
  mainBackground:
    "linear-gradient(180deg, rgba(25, 25, 25, 0), rgba(30, 30, 30, 0.9)), " +
    "linear-gradient(333deg, rgba(2, 2, 2, 0.2), rgba(13, 15, 17, 0.08)), " +
    "radial-gradient(circle at 77% 89%, rgba(15, 15, 15, 0.8), rgba(11, 12, 13, 0) 50%), " +
    "radial-gradient(circle at 15% 95%, rgba(7, 7, 7, 0.8), rgba(16, 17, 13, 0) 43%), " +
    "radial-gradient(circle at 65% 23%, rgba(15, 15, 10, 0.4), rgba(21, 21, 13, 0) 70%), " +
    "radial-gradient(circle at 10% 0%, rgba(12, 12, 15, 0.33), rgba(14, 14, 11, 0) 35%), " +
    "radial-gradient(circle at 11% 100%, rgba(6, 6, 6, 0.3), rgba(6, 6, 6, 0) 30%)",
};

export const darkYellow = responsiveFontSizes(createTheme(makeMuiTheme(theme, "dark"), commonSettings));
