import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import NavContent from "./NavContent.jsx";
import darkNavBg from "../../assets/images/exod-sidebar.jpg";
import lightNavBg from "../../assets/images/exod-sidebar-light.png";

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
  },
}));

function NavDrawer({ mobileOpen, handleDrawerToggle }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className="sidebar">
      <NavContainer
        variant="temporary"
        anchor={"left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onClick={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        navBg={theme.palette.type === "dark" ? darkNavBg : lightNavBg}
        themeType={theme.palette.type}
      >
        <NavContent />
      </NavContainer>
    </div>
  );
}

export default NavDrawer;

const NavContainer = styled(Drawer)`
  .MuiDrawer-paper::before {
    background-image: ${({ themeType }) =>
        themeType === "dark"
          ? "linear-gradient(0deg, rgba(31, 31, 31, 1) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)"
          : "linear-gradient(0deg, rgba(221, 221, 221, 1) 0%, rgba(221, 221, 221, 0) 50%, rgba(221, 221, 221, 0) 100%)"},
      url(${({ navBg }) => navBg});
    background-repeat: no-repeat;
    background-color: ${({ themeType }) => (themeType === "dark" ? "#131313" : "rgb(249, 249, 249)")};
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: ${({ themeType }) => (themeType === "dark" ? "0.75" : "1")};
    content: "";
  }
`;
