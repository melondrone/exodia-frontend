import { Drawer, useTheme } from "@material-ui/core";
import NavContent from "./NavContent.jsx";
import styled from "styled-components";
import darkNavBg from "../../assets/images/exod-sidebar.jpg";
import lightNavBg from "../../assets/images/exod-sidebar-light.png";
import "./sidebar.scss";

function Sidebar() {
  const theme = useTheme();

  console.log(theme.palette.type);
  return (
    <NavContainer
      className={`sidebar`}
      id="sidebarContent"
      navBg={theme.palette.type === "dark" ? darkNavBg : lightNavBg}
      themeType={theme.palette.type}
    >
      <Drawer variant="permanent" anchor="left">
        <NavContent />
      </Drawer>
    </NavContainer>
  );
}

export default Sidebar;

const NavContainer = styled.div`
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
