import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as WrapIcon } from "../../assets/icons/wrap.svg";
import { ReactComponent as OlympusIcon } from "../../assets/icons/olympus-nav-header.svg";
import { ReactComponent as PoolTogetherIcon } from "../../assets/icons/33-together.svg";
import { Trans } from "@lingui/macro";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon, useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import StarIcon from "@material-ui/icons/Stars";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import "./sidebar.scss";

import ExodiaLogoGreen from "../../assets/images/logo-wide.png";
import ExodiaLogoYellow from "../../assets/images/exodia-logo-wide-yellow.png";
import ExodiaLogoBlue from "../../assets/images/exodia-logo-wide-blue.png";
import ExodiaLogoRedDark from "../../assets/images/exodia-logo-wide-red-dark.png";
import ExodiaLogoRedLight from "../../assets/images/exodia-logo-wide-red-light.png";

const LOGO_MAP = {
  darkGreen: ExodiaLogoGreen,
  darkRed: ExodiaLogoRedDark,
  darkBlue: ExodiaLogoBlue,
  darkYellow: ExodiaLogoYellow,
  lightGreen: ExodiaLogoGreen,
  lightRed: ExodiaLogoRedLight,
  lightBlue: ExodiaLogoBlue,
  lightYellow: ExodiaLogoYellow,
};

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();
  const { bonds } = useBonds(chainID);
  const theme = useTheme();

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if (currentPath.indexOf("wrap") >= 0 && page === "wrap") {
      return true;
    }
    if (currentPath.indexOf("obliterator") >= 0 && page === "obliterator") {
      return true;
    }
    if (currentPath.indexOf("analytics") >= 0 && page === "analytics") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  console.log(theme.palette.themeName);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <ImageLink
              href="https://exodia.fi"
              target="_blank"
              isDefault={["darkGreen", "lightGreen"].includes(theme.palette.themeName)}
            >
              <img src={LOGO_MAP[theme.palette.themeName]} alt={"Exodia logo"} />
            </ImageLink>

            {address && (
              <div className="wallet-link">
                <Link href={`https://ftmscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link href={`https://www.exodia.fi/`} target="_blank">
                <Typography variant="h6">
                  <SvgIcon color="primary" component={HomeIcon} />
                  <Trans>Landing Page</Trans>
                </Typography>
              </Link>
              <Link
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DashboardIcon} />
                  <Trans>Dashboard</Trans>
                </Typography>
              </Link>
              <Link
                component={NavLink}
                id="dash-nav"
                to="/analytics"
                isActive={(match, location) => {
                  return checkPage(match, location, "analytics");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={ShowChartIcon} />
                  <Trans>Analytics</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/stake"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={StakeIcon} />
                  <Trans>Stake</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="wrap-nav"
                to="/wrap"
                isActive={(match, location) => {
                  return checkPage(match, location, "wrap");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={WrapIcon} />
                  <Trans>Wrap</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={BondIcon} />
                  <Trans>Bond</Trans>
                </Typography>
              </Link>

              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  <Typography variant="body1">
                    <Trans>Bond discounts</Trans>
                  </Typography>
                  {bonds.map((bond, i) => (
                    <Link component={NavLink} to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                      {!bond.bondDiscount ? (
                        <Skeleton variant="text" width={"150px"} />
                      ) : (
                        <Typography variant="body1">
                          {bond.displayName}

                          <span className="bond-pair-roi">
                            {!bond.isAvailable[chainID]
                              ? "Sold Out"
                              : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}
                          </span>
                        </Typography>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                component={NavLink}
                id="calc-nav"
                to="/obliterator"
                isActive={(match, location) => {
                  return checkPage(match, location, "obliterator");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""} obliterator`}
              >
                <Tooltip
                  title={<Trans>Estimate and visualize your potential returns over time by staking with Exodia</Trans>}
                >
                  <Typography variant="h6" className="obliterator">
                    <SvgIcon color="primary" component={StarIcon} />
                    <Trans>Obliterator</Trans>
                  </Typography>
                </Tooltip>
              </Link>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                  <Typography variant="h6">{externalUrls[link].icon}</Typography>
                  <Typography variant="h6">{externalUrls[link].title}</Typography>
                </Link>
              );
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;

const ImageLink = styled(Link)`
  img {
    ${({ isDefault }) => !isDefault && "margin-left: -14px; margin-top: -2px;"}
  }
`;
