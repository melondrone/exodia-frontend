import { ReferenceObject } from "popper.js";
import { useState, MouseEvent } from "react";
import { Popper, Button, Paper, Typography, Box, Fade } from "@material-ui/core";
import { t } from "@lingui/macro";
import styled from "styled-components";
import "./localesmenu.scss";

const THEME_LOGOS = {
  darkGreen: "linear-gradient(135deg, #46ab15 0%, #1F1F1F 75%, #1F1F1F 100%)",
  darkBlue: "linear-gradient(135deg, #3c9de0 0%, #1F1F1F 75%, #1F1F1F 100%)",
  darkRed: "linear-gradient(135deg, #bd1313 0%, #1F1F1F 75%, #1F1F1F 100%)",
  darkYellow: "linear-gradient(135deg, #eec900 0%, #1F1F1F 75%, #1F1F1F 100%)",
  lightGreen: "linear-gradient(135deg, #388a11 0%, #ffffff 75%, #ffffff 100%)",
  lightBlue: "linear-gradient(135deg, #164269 0%, #ffffff 75%, #ffffff 100%)",
  lightRed: "linear-gradient(135deg, #8c0a0a 0%, #ffffff 75%, #ffffff 100%)",
  lightYellow: "linear-gradient(135deg, #bfa30a 0%, #ffffff 75%, #ffffff 100%)",
};

const ThemeSwitcher = ({ theme, toggleTheme }: { theme: string; toggleTheme: (theme: string) => void }) => {
  const id = "locales-popper";
  const [anchorEl, setAnchorEl] = useState<ReferenceObject | null>(null);
  const open = Boolean(anchorEl);

  const onMouseEnter = (event: MouseEvent) => {
    if (anchorEl) return;
    setAnchorEl(event.currentTarget);
  };

  const onMouseLeave = (event: MouseEvent) => {
    if (!anchorEl) return;
    setAnchorEl(null);
  };

  return (
    <Box component="div" id="toggle-menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Button
        className="toggle-button"
        size="large"
        variant="outlined"
        color="primary"
        title={t`Change theme`}
        aria-describedby={id}
      >
        <span>&nbsp;</span>
        <ThemeDot background={THEME_LOGOS[theme]} />
        <span>&nbsp;</span>
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="locales-menu" elevation={1}>
                <Box component="div">
                  {Object.entries(THEME_LOGOS).map(([themeName, background]) => (
                    <Button
                      key={themeName}
                      size="large"
                      variant="contained"
                      fullWidth
                      onClick={() => toggleTheme(themeName)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Typography align="left">
                        <ThemeDot background={background} />
                      </Typography>
                    </Button>
                  ))}
                </Box>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
};

export default ThemeSwitcher;

const ThemeDot = styled.div<{ background: string }>`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background: ${({ background }) => background};
`;
