import fonts from "./fonts";

export default (theme, type) => {
  return {
    primary: {
      main: theme.color,
    },
    palette: {
      type: type,
      background: {
        default: theme.backgroundColor,
        paper: theme.paperBg,
        mainBackground: theme.mainBackground,
      },
      contrastText: theme.color,
      primary: {
        main: theme.color,
      },
      neutral: {
        main: theme.color,
        secondary: theme.gray,
      },
      text: {
        primary: theme.color,
        secondary: theme.gray,
      },
      border: {
        primary: theme.paperBorder,
      },
      primaryColor: theme.gold,
      primaryColorDimmed: theme.goldDimmed,
      primaryColorBright: theme.goldBright,
      chartColors: theme.chartColors,
      trendUp: theme.trendUp,
      trendDown: theme.trendDown,
      graphStrokeColor: theme.graphStrokeColor,
    },
    typography: {
      fontFamily: "Square",
    },
    props: {
      MuiSvgIcon: {
        color: theme.color,
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": fonts,
          body: {
            background: theme.background,
          },
        },
      },
      MuiDrawer: {
        paper: {
          backgroundColor: theme.paperBg,
          zIndex: 7,
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: theme.paperBg,
          "&.ohm-card": {
            boxShadow: theme.paperBoxShadow ? `${theme.paperBoxShadow} !important` : "none",
            backgroundColor: `${theme.paperBg}AA`,
            border: "1px solid " + theme.paperBorder,
          },
          "&.ohm-modal": {
            backgroundColor: theme.modalBg,
          },
          "&.ohm-menu": {
            backgroundColor: theme.paperBg,
            backdropFilter: "blur(33px)",
          },
          "&.ohm-popover": {
            color: theme.color,
            backdropFilter: "blur(15px)",
          },
        },
      },
      MuiTooltip: {
        tooltip: {
          fontSize: "1.1em",
        },
      },
      MuiBackdrop: {
        root: {
          backgroundColor: theme.backdropBg,
        },
      },
      MuiLink: {
        root: {
          color: theme.color,
          "&:hover": {
            color: theme.textHighlightColor,
            textDecoration: "none",
            "&.active": {
              color: theme.color,
            },
          },
          "&.active": {
            color: theme.color,
            textDecoration: "underline",
          },
        },
      },
      MuiTableCell: {
        root: {
          color: theme.color,
        },
      },
      MuiInputBase: {
        root: {
          "& .MuiSvgIcon-root": {
            color: theme.color,
            fill: theme.color,
          },
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: `${theme.color}33`,
        },
      },

      MuiOutlinedInput: {
        root: {
          "& fieldset": {
            borderColor: theme.inputBorder,
          },

          "&:hover $notchedOutline": {
            borderColor: theme.goldDimmed,
          },
          "&$focused $notchedOutline": {
            borderColor: theme.gold,
          },
        },
      },
      MuiTab: {
        textColorPrimary: {
          color: theme.gray,
          "&$selected": {
            color: theme.gold,
          },
        },
      },
      PrivateTabIndicator: {
        colorPrimary: {
          backgroundColor: theme.gold,
        },
      },
      MuiToggleButton: {
        root: {
          backgroundColor: theme.paperBg,
          "&:hover": {
            color: theme.color,
            backgroundColor: `${theme.containedSecondaryButtonHoverBG} !important`,
          },
          selected: {
            backgroundColor: theme.containedSecondaryButtonHoverBG,
          },
          "@media (hover:none)": {
            "&:hover": {
              color: theme.color,
              backgroundColor: theme.paperBg,
            },
            "&:focus": {
              color: theme.color,
              backgroundColor: theme.paperBg,
              borderColor: "transparent",
              outline: "#00000000",
            },
          },
        },
      },
      MuiButton: {
        root: {
          "&$disabled": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          color: theme.primaryButtonColor,
          backgroundColor: theme.gold,
          boxShadow: `0px 0px 10px 5px ${theme.gold}55`,

          "&:hover": {
            backgroundColor: theme.primaryButtonHoverBG,
            color: theme.primaryButtonHoverColor,
            boxShadow: `0px 0px 5px 3px ${theme.gold}55`,
          },
          "&:active": {
            backgroundColor: theme.primaryButtonHoverBG,
            color: theme.primaryButtonHoverColor,
          },
          "&$disabled": {
            color: theme.disabledColor,
            backgroundColor: "transparent",
            border: `1px solid ${theme.disabledColor}`,
            boxShadow: "none",
          },
          "@media (hover:none)": {
            color: theme.primaryButtonColor,
            backgroundColor: theme.gold,
            "&:hover": {
              backgroundColor: theme.primaryButtonHoverBG,
            },
          },
        },
        containedSecondary: {
          backgroundColor: theme.paperBg,
          color: theme.color,
          "&:hover": {
            backgroundColor: `${theme.containedSecondaryButtonHoverBG} !important`,
          },
          "&:active": {
            backgroundColor: theme.containedSecondaryButtonHoverBG,
          },
          "&:focus": {
            backgroundColor: theme.paperBg,
          },
          "&$disabled": {
            color: theme.disabledColor,
            backgroundColor: "transparent",
            borderColor: theme.disabledColor,
            boxShadow: "none",
          },
          "@media (hover:none)": {
            color: theme.color,
            backgroundColor: theme.paperBg,
            "&:hover": {
              backgroundColor: `${theme.containedSecondaryButtonHoverBG} !important`,
            },
          },
        },
        outlinedPrimary: {
          color: theme.gold,
          borderColor: theme.gold,
          "&:hover": {
            color: theme.outlinedPrimaryButtonHoverColor,
            backgroundColor: theme.primaryButtonHoverBG,
            borderColor: "#f9f9f9",
          },
          "&$disabled": {
            color: theme.disabledColor,
            backgroundColor: "transparent",
            borderColor: theme.disabledColor,
            boxShadow: "none",
          },
          "@media (hover:none)": {
            color: theme.gold,
            borderColor: theme.gold,
            "&:hover": {
              color: theme.outlinedPrimaryButtonHoverColor,
              backgroundColor: `${theme.primaryButtonHoverBG} !important`,
              textDecoration: "none !important",
            },
          },
        },
        outlinedSecondary: {
          color: theme.color,
          borderColor: theme.color,
          "&:hover": {
            color: theme.outlinedSecondaryButtonHoverColor,
            backgroundColor: theme.outlinedSecondaryButtonHoverBG,
            borderColor: theme.gold,
          },
        },
        textPrimary: {
          color: "#A3A3A3",
          "&:hover": {
            color: theme.gold,
            backgroundColor: "#00000000",
          },
          "&:active": {
            color: theme.gold,
            borderBottom: "#F8CC82",
          },
        },
        textSecondary: {
          color: theme.color,
          "&:hover": {
            color: theme.textHighlightColor,
          },
        },
        disabled: {
          boxShadow: "none",
        },
      },
      MuiRadio: {
        colorPrimary: {
          color: theme.color,
          "&$checked": {
            color: theme.gold,
          },
          "&:hover": {
            color: theme.gold,
          },
        },
      },
      MuiSelect: {
        selectMenu: {
          color: theme.gold,
        },
      },
      MuiSlider: {
        thumb: {
          border: `2px solid ${theme.gold}`,
          color: theme.paperBg,
          boxShadow: `0px 0px 10px ${theme.gold}`,
          height: 18,
          width: 18,
        },
        track: {
          background: `linear-gradient(90deg,${theme.goldBright},${theme.gold} 90%)`,
          boxShadow: `0px 0px 10px ${theme.gold}`,
          height: 8,
          borderRadius: 7,
        },
        rail: {
          border: `2px solid ${theme.gold}`,
          color: theme.paperBg,
          height: 5,
          borderRadius: 7,
        },
      },
    },
  };
};
