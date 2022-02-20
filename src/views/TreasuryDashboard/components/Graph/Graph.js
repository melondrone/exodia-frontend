import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ExodiaLineChart,
  ExodiaStackedLineChart,
  ExodiaMultiLineChart,
  ExodiaPieChart,
  ExodiaComposedineChart,
  ExodiaStackedBarChart,
  trimNumber,
} from "src/components/Chart/ExodiaChart.jsx";
import { Trans } from "@lingui/macro";
import { useSelector } from "react-redux";
import {
  FormControl,
  Select,
  MenuItem,
  SvgIcon,
  Grid,
  Container,
  Typography,
  useMediaQuery,
  Box,
} from "@material-ui/core";
import gOhmData from "./gohmHistory";
import { useTheme } from "@material-ui/core/styles";
import { trim, formatCurrency } from "../../../../helpers";
import { useTreasuryMetrics } from "../../hooks/useTreasuryMetrics";
import { bulletpoints, tooltipItems, tooltipInfoMessages, itemType } from "../../treasuryData";
import { EPOCH_INTERVAL, OHM_TICKER } from "../../../../constants";
import { parse } from "date-fns";
import { TrendingDown, TrendingUp, TrendingFlat, AccountBalance } from "@material-ui/icons";
import { getBondDiscountDetails, getBondValuesPerDay } from "./bondGraphHelpers";
import { getTokenBalances, getAssetTypeWeight } from "./treasuryGraphHelpers";

export const Graph = ({ children }) => <>{children}</>;

export const TotalValueDepositedGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  return (
    <ExodiaLineChart
      data={data && data.protocolMetrics}
      dataKey={["tvl"]}
      dataFormat="$"
      itemType={itemType.dollar}
      itemNames={tooltipItems.tvl}
      headerText="Total Value Deposited"
      color={theme.palette.chartColors[0]}
      stroke={theme.palette.chartColors[0]}
      bulletpoints={bulletpoints.tvl}
      infoTooltipMessage={tooltipInfoMessages.tvl}
      headerSubText={`${data && formatCurrency(data.protocolMetrics[0].tvl)}`}
      todayMessage=""
    />
  );
};

export const MarketValueGraph = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const { tokenValues, dataKeys, value, lastValue, colors, formattedValue } = getTokenBalances(data, theme);

  return (
    <ExodiaStackedLineChart
      data={tokenValues.length ? tokenValues : null}
      dataKey={dataKeys}
      colors={colors}
      dataFormat="$"
      headerText={
        isDashboard ? (
          <>Treasury {<Trend formattedValue={formatCurrency(value)} value={value} lastValue={lastValue} />}</>
        ) : (
          "Market Value of Treasury Assets"
        )
      }
      headerSubText={isDashboard ? "" : formattedValue}
      todayMessage={isDashboard ? "" : undefined}
      bulletpoints={bulletpoints.coin}
      itemNames={dataKeys}
      itemType={itemType.dollar}
      infoTooltipMessage={tooltipInfoMessages.mvt}
      todayMessage=""
      showTotal
    />
  );
};

export const RiskFreeValueGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const { tokenValues, dataKeys, value, lastValue, colors, formattedValue } = getTokenBalances(data, theme, {
    isRiskFree: true,
  });

  return (
    <ExodiaStackedLineChart
      data={tokenValues.length ? tokenValues : null}
      format="currency"
      dataKey={dataKeys}
      colors={colors}
      dataFormat="$"
      headerText="Risk Free Value of Treasury Assets"
      headerSubText={formattedValue}
      bulletpoints={bulletpoints.rfv}
      itemNames={dataKeys}
      itemType={itemType.dollar}
      infoTooltipMessage={tooltipInfoMessages.rfv}
      todayMessage=""
      showTotal
    />
  );
};

export const TokenQuantities = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const [selectedData, setSelectedData] = useState();
  const { tokenValues, dataKeys, value, lastValue, colors, formattedValue } = getTokenBalances(data, theme, {
    type: "balance",
  });

  useEffect(() => {
    if (dataKeys.length) setSelectedData(dataKeys.find(token => token === "WFTM"));
  }, [dataKeys.length]);

  const SelectDataType = () => (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: "0 10px",
        height: "33px",
        minWidth: "69px",
      }}
    >
      <Select
        id="time-select"
        value={selectedData}
        label="Timeframe"
        onChange={e => setSelectedData(e.target.value)}
        disableUnderline
      >
        {dataKeys.map(key => (
          <MenuItem value={key}>{key}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const color = colors && colors[dataKeys.findIndex(key => key === selectedData)];

  return (
    <ExodiaLineChart
      data={tokenValues.length ? tokenValues : null}
      dataKey={[selectedData]}
      color={color}
      stroke={color}
      SelectOptions={SelectDataType}
      dataFormat="OHM"
      headerText={selectedData && `${selectedData} token balance`}
      headerSubText={
        selectedData && `${formatCurrency(tokenValues[0][selectedData], 1).replace("$", "")} ${selectedData}`
      }
      bulletpoints={bulletpoints.coin}
      itemNames={[selectedData]}
      itemType={selectedData}
      todayMessage=""
      isDashboard
      showTotal
    />
  );
};

export const Holders = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  return (
    <ExodiaLineChart
      data={data && data.protocolMetrics}
      dataKey={["holders"]}
      color={theme.palette.chartColors[0]}
      stroke={theme.palette.chartColors[0]}
      dataFormat="OHM"
      headerText="Total holders"
      headerSubText={data && `${data.protocolMetrics[0].holders} Exodians`}
      bulletpoints={bulletpoints.coin}
      itemNames={["Exodians"]}
      itemType="Exodians"
      todayMessage=""
      isDashboard
      showTotal
    />
  );
};

export const ProtocolOwnedLiquidityGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  // Remove 0's
  const formattedData =
    data &&
    data.treasuries.reduce((formatting, dataEntry) => {
      const monolithEntry = dataEntry.liquidities.find(liquidity => liquidity.token.ticker === "BPT-MNLT");
      if (monolithEntry) formatting.push(monolithEntry);
      return formatting;
    }, []);

  return (
    <ExodiaLineChart
      isPOL
      underglow
      data={formattedData}
      dataFormat="percent"
      itemNames={tooltipItems.pol}
      itemType={itemType.percentage}
      dataKey={["pol"]}
      bulletpoints={bulletpoints.pol}
      infoTooltipMessage={tooltipInfoMessages.pol}
      headerText="Protocol Owned Liquidity The Monolith LP"
      headerSubText={`${formattedData && trim(formattedData[0].pol, 2)}% `}
      color={theme.palette.chartColors[0]}
      stroke={theme.palette.chartColors[0]}
      todayMessage=""
    />
  );
};

export const AssetTypeBreakdown = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const assetTypeBreakDown = getAssetTypeWeight(data);

  return (
    <ExodiaStackedLineChart
      data={assetTypeBreakDown.length ? assetTypeBreakDown : null}
      dataKey={["liquidity", "riskFree", "reserves"]}
      colors={[theme.palette.chartColors[0], theme.palette.chartColors[1], theme.palette.chartColors[4]]}
      dataFormat="%"
      headerText="Treasury Breakdown by Asset Type"
      headerSubText={`${assetTypeBreakDown.length && trim(assetTypeBreakDown[0].liquidity, 2)}% Liquidity`}
      todayMessage=""
      bulletpoints={bulletpoints.coin}
      itemNames={["Liquidity", "Risk Free Reserves", "Risky Reserves"]}
      itemType={itemType.percentage}
      todayMessage=""
      isDashboard
      isPOL
      showTotal
    />
  );
};

export const OHMStakedGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const staked =
    data &&
    data.simpleStakings
      .map((metric, index) => ({
        staked: (metric.stakedSupply / data.protocolMetrics[index].circulatingSupply) * 100,
        timestamp: metric.id,
      }))
      .filter(metric => metric.staked < 100 && metric.staked > 0.05);

  return (
    <ExodiaLineChart
      isStaked
      underglow
      data={staked}
      dataKey={["staked"]}
      dataFormat="percent"
      itemNames={tooltipItems.staked}
      itemType={itemType.percentage}
      headerText="Staked Supply"
      color={theme.palette.chartColors[4]}
      stroke={theme.palette.chartColors[4]}
      bulletpoints={bulletpoints.staked}
      infoTooltipMessage={tooltipInfoMessages.staked}
      headerSubText={`${staked && trim(staked[0].staked, 2)}% `}
      todayMessage=""
    />
  );
};

export const APYOverTimeGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const blockRateSeconds = useSelector(state => {
    return state.app.blockRateSeconds;
  });

  const apy =
    data &&
    blockRateSeconds &&
    data.simpleStakings.map(entry => ({
      timestamp: entry.id,
      apy: Math.floor(
        Math.pow(parseFloat(entry.rebaseRate / 100 + 1), (86400 * 365) / (blockRateSeconds * EPOCH_INTERVAL)) * 100,
      ),
    }));

  return (
    <ExodiaLineChart
      type="line"
      data={apy}
      dataKey={["apy"]}
      dataFormat="percent"
      headerText="APY over time"
      itemNames={tooltipItems.apy}
      itemType={itemType.percentage}
      color={theme.palette.chartColors[3]}
      stroke={theme.palette.chartColors[3]}
      bulletpoints={bulletpoints.apy}
      infoTooltipMessage={tooltipInfoMessages.apy}
      headerSubText={`${apy && apy[0].apy.toLocaleString("en-us")}%`}
      todayMessage=""
    />
  );
};

export const RunwayAvailableGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const [current, ...others] = bulletpoints.runway;

  return (
    <ExodiaMultiLineChart
      data={data && data.protocolMetrics}
      dataKey={["runway"]}
      colors={[theme.palette.chartColors[0]]}
      headerText="Runway Available"
      headerSubText={`${data && trim(data.protocolMetrics[0].runway, 1)} Days`}
      dataFormat={["days"]}
      bulletpoints={[current]}
      itemNames={tooltipItems.runway}
      itemType={""}
      infoTooltipMessage={tooltipInfoMessages.runway}
      todayMessage=""
    />
  );
};

export const DilutionGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const dilution =
    data &&
    data.simpleStakings.map((entry, index) => ({
      timestamp: entry.timestamp,
      percentage: (entry.index / (data.protocolMetrics[index].circulatingSupply / 2000)) * 100, //initial total supply of 2000
      index: entry.index,
    }));

  return (
    <ExodiaMultiLineChart
      data={dilution}
      dataKey={["percentage", "index"]}
      dataAxis={["left", "right"]}
      colors={[theme.palette.chartColors[0], theme.palette.chartColors[3]]}
      headerText="Dilution Over Time"
      dataFormat={["percent", "number"]}
      headerSubText={`${dilution && trim(dilution[0].percentage, 2)}%`}
      bulletpoints={bulletpoints.dilution}
      itemNames={tooltipItems.dilution}
      itemType={[itemType.percentage, "sEXOD"]}
      infoTooltipMessage={tooltipInfoMessages.dilution}
      todayMessage=""
      isDilution
    />
  );
};

export const OhmMintedGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const { mintedPerDay } = getBondValuesPerDay(data, theme);

  const minted = mintedPerDay
    .map((entry, index) => {
      const lastFiveDays = mintedPerDay.slice(index, Math.min(index + 5, mintedPerDay.length));
      const fiveDayAverage =
        lastFiveDays.reduce((previous, current) => current.totalMinted + previous, 0).toFixed(2) / 5;
      return {
        timestamp: entry.timestamp,
        totalMinted: entry.totalMinted,
        fiveDayAverage: index < mintedPerDay.length - 5 ? fiveDayAverage : null,
      };
    })
    .slice(0, mintedPerDay.length - 1);

  const fiveDayTotal = minted.length && minted.slice(0, 5).reduce((sum, current) => sum + current.totalMinted, 0);

  return (
    <ExodiaMultiLineChart
      dataFormat={["OHM", "OHM"]}
      data={minted.length ? minted : null}
      dataKey={["totalMinted", "fiveDayAverage"]}
      itemNames={tooltipItems.minted}
      itemType={itemType.OHM}
      headerText={`${OHM_TICKER} minted`}
      colors={[theme.palette.chartColors[4], theme.palette.chartColors[0]]}
      stroke={[theme.palette.chartColors[4], theme.palette.chartColors[0]]}
      bulletpoints={bulletpoints.staked}
      infoTooltipMessage={tooltipInfoMessages.minted}
      headerSubText={`${(fiveDayTotal && fiveDayTotal / 5).toFixed(2)} EXOD`}
      todayMessage="5-day Average"
      glowDeviation="4"
      showNulls
    />
  );
};

export const OhmMintedPerTotalSupplyGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const { mintedPerDay } = getBondValuesPerDay(data, theme);

  const minted = mintedPerDay
    .map((entry, index) => {
      const lastFiveDays = mintedPerDay.slice(index, Math.min(index + 5, mintedPerDay.length));
      const totalSupply = data.protocolMetrics.find(metric => metric.timestamp === entry.timestamp).totalSupply;
      const fiveDayAverage =
        lastFiveDays.reduce((previous, current) => (current.totalMinted / totalSupply) * 100 + previous, 0).toFixed(2) /
        5;
      return {
        timestamp: entry.timestamp,
        mintedPercent: (entry.totalMinted / totalSupply) * 100,
        fiveDayAveragePercent: index < mintedPerDay.length - 5 ? fiveDayAverage : null,
      };
    })
    .slice(0, mintedPerDay.length - 1);

  const fiveDayTotal = minted.length && minted.slice(0, 5).reduce((sum, current) => current.mintedPercent);

  return (
    <ExodiaMultiLineChart
      glowDeviation="4"
      dataFormat={["percent", "percent"]}
      data={minted.length ? minted : null}
      dataKey={["mintedPercent", "fiveDayAveragePercent"]}
      itemNames={tooltipItems.mcs}
      itemType={itemType.percentage}
      headerText={`${OHM_TICKER} Minted/Total Supply`}
      colors={[theme.palette.chartColors[3], theme.palette.chartColors[0]]}
      stroke={[theme.palette.chartColors[3], theme.palette.chartColors[0]]}
      bulletpoints={bulletpoints.tvl}
      infoTooltipMessage={tooltipInfoMessages.mcs}
      headerSubText={`${(minted.length && minted[0].fiveDayAveragePercent).toFixed(2)}%`}
      todayMessage="5-day Average"
      showNulls
    />
  );
};

export const BondDiscounts = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const discounts =
    data &&
    data.bondDeposits
      .map(entry => {
        const value = ((entry.valueOut - entry.valueIn) / entry.valueIn) * 100;
        if (value > 50) return {};

        return {
          timestamp: entry.timestamp,
          discount: value,
        };
      })
      .reverse()
      .filter(entry => Object.keys(entry).length);

  const discountsWithEma =
    discounts &&
    discounts
      .map((entry, index) => {
        if (index < 50) return entry;
        const last50 = discounts.slice(index - 50, index);
        const ma = last50.reduce((sum, current) => sum + current.discount, 0) / 50;
        return { ...entry, last50Ma: ma };
      })
      .reverse();

  return (
    <ExodiaMultiLineChart
      glowDeviation="0"
      type="line"
      data={discountsWithEma}
      dataKey={["discount", "last50Ma"]}
      dataFormat="percent"
      headerText="Bond Discounts (at time of bonding)"
      headerSubText={discountsWithEma && `Last 50 MA: ${trim(discountsWithEma[0].last50Ma, 2)}%`}
      itemNames={["Discount", "Last 50 Average"]}
      itemType={itemType.percentage}
      colors={[theme.palette.chartColors[4], theme.palette.chartColors[0]]}
      stroke={[theme.palette.chartColors[4], theme.palette.chartColors[0]]}
      bulletpoints={bulletpoints.apy}
      isDashboard
      isDiscount
      todayMessage=""
    />
  );
};

export const DebtRatioGraph = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const { dataKeys, colors, currentDebtRatio, debtRatios } = getBondDiscountDetails(data, theme, true);

  return (
    <ExodiaMultiLineChart
      deviation="2"
      data={debtRatios.length ? debtRatios : null}
      dataKey={dataKeys}
      colors={colors}
      stroke={colors}
      headerText="Debt Ratios"
      headerSubText={`Total ${debtRatios && trim(currentDebtRatio, 2)}%`}
      dataFormat={["percent"]}
      bulletpoints={bulletpoints.runway}
      itemNames={dataKeys}
      itemType={itemType.percentage}
      infoTooltipMessage={tooltipInfoMessages.debtratio}
      isDebt={true}
      todayMessage=""
      showTotal
      showNulls
    />
  );
};

export const BondValuesChart = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const { dataKeys, colors, currentDebtRatio, bondValues, bondedToday } = getBondValuesPerDay(data, theme, true);

  return (
    <ExodiaStackedBarChart
      data={bondValues.length ? bondValues : null}
      dataKey={dataKeys}
      colors={colors}
      headerText="Bond Revenue"
      headerSubText={`Today: ${bondValues.length && formatCurrency(bondedToday, 2)}`}
      dataFormat="$"
      bulletpoints={bulletpoints.runway}
      itemNames={dataKeys}
      itemType={itemType.dollar}
      todayMessage=""
      isDashboard
      showTotal
    />
  );
};

export const IndexAdjustedPrice = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const indexAdjustedPrice =
    data &&
    data.protocolMetrics.map((entry, index) => ({
      timestamp: entry.timestamp,
      price: entry.price,
      indexAdjustedPrice: entry.price * data.simpleStakings[index].index,
    }));

  return (
    <ExodiaMultiLineChart
      data={indexAdjustedPrice}
      dataKey={["price", "indexAdjustedPrice"]}
      colors={[theme.palette.chartColors[0], theme.palette.chartColors[4]]}
      stroke={[theme.palette.chartColors[0], theme.palette.chartColors[4]]}
      headerText="Index Adjusted Price"
      headerSubText={`$${indexAdjustedPrice && trim(indexAdjustedPrice[0].indexAdjustedPrice, 2)}`}
      dataFormat={["$"]}
      bulletpoints={bulletpoints.indexAdjustedPrice}
      itemNames={tooltipItems.indexAdjustedPrice}
      itemType={itemType.dollar}
      infoTooltipMessage={tooltipInfoMessages.indexAdjustedPrice}
      todayMessage=""
    />
  );
};

export const GrowthOfSupply = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });

  const formattedData =
    data &&
    data.protocolMetrics.map((entry, index) => ({
      timestamp: entry.timestamp,
      circSupply: entry.circulatingSupply,
      indexCircSupply: data.simpleStakings[index].index * 2000,
    }));

  return (
    <ExodiaMultiLineChart
      data={formattedData}
      dataKey={["indexCircSupply", "circSupply"]}
      colors={[theme.palette.chartColors[4], theme.palette.chartColors[0]]}
      stroke={[theme.palette.chartColors[4], theme.palette.chartColors[0]]}
      headerText="Growth of Supply"
      headerSubText={`${
        formattedData && trim(Math.abs(1 - formattedData[0].indexCircSupply / formattedData[0].circSupply) * 100, 2)
      }%`}
      dataFormat={["number"]}
      bulletpoints={bulletpoints.growthOfSupply}
      itemNames={tooltipItems.growthOfSupply}
      itemType={itemType.OHM}
      infoTooltipMessage={tooltipInfoMessages.growthOfSupply}
      todayMessage=""
      isGrowthOfSupply
    />
  );
};

export const DashboardPriceGraph = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const [selectedData, setSelectedData] = useState("marketCap");

  const entries = { price: 0, wsEXOD: 1, marketCap: 2 };
  const formattedData =
    data &&
    data.protocolMetrics.map((entry, index) => ({
      timestamp: entry.timestamp,
      price: entry.price,
      wsEXOD: entry.price * data.simpleStakings[index].index,
      marketCap: entry.marketCap,
    }));

  const value =
    formattedData &&
    (selectedData == "price"
      ? formattedData[0].price
      : selectedData == "wsEXOD"
      ? formattedData[0].wsEXOD
      : formattedData[0].marketCap);

  const lastValue =
    formattedData &&
    (selectedData == "price"
      ? formattedData[1].price
      : selectedData == "wsEXOD"
      ? formattedData[1].wsEXOD
      : formattedData[1].marketCap);

  const SelectDataType = () => (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: "0 10px",
        height: "33px",
        minWidth: "69px",
      }}
    >
      <Select
        id="time-select"
        value={selectedData}
        label="Timeframe"
        onChange={e => setSelectedData(e.target.value)}
        disableUnderline
      >
        <MenuItem value={"price"}>EXOD</MenuItem>
        <MenuItem value={"wsEXOD"}>wsEXOD</MenuItem>
        <MenuItem value={"marketCap"}>Market Cap</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <ExodiaLineChart
      data={formattedData}
      dataKey={[selectedData]}
      SelectOptions={SelectDataType}
      color={theme.palette.chartColors[0]}
      stroke={theme.palette.chartColors[0]}
      initialTimeSelected="3 month"
      headerText={
        <>
          {selectedData == "price" ? "EXOD Price" : selectedData == "wsEXOD" ? "wsEXOD Price" : "Market Cap"}{" "}
          {<Trend formattedValue={formatCurrency(value)} value={value} lastValue={lastValue} />}
        </>
      }
      headerSubText=""
      todayMessage=""
      dataFormat="$"
      bulletpoints={bulletpoints.indexAdjustedPrice}
      itemNames={[tooltipItems.dashboardPrice[entries[selectedData]]]}
      itemType={itemType.dollar}
      infoTooltipMessage=""
      isDashboard={isDashboard}
    />
  );
};

export const TreasuryBreakdownPie = () => {
  const theme = useTheme();
  const { data } = useTreasuryMetrics({ refetchOnMount: false });
  const isVerySmallScreen = useMediaQuery("(max-width: 450px)");
  const { tokenValues, dataKeys, value: totalValue, lastValue, colors } = getTokenBalances(data, theme);

  const currentValues = tokenValues && dataKeys.map(key => tokenValues[0][key]);
  const previousValues = tokenValues && dataKeys.map(key => tokenValues[1][key]);

  const formattedValue = formatCurrency(totalValue);

  const pieData =
    currentValues &&
    dataKeys.map((key, index) => {
      return { value: Number(trim((tokenValues[0][key] / totalValue) * 100, 2)), name: key };
    });

  return (
    <Grid container>
      <Box display="flex" justifyContent="space-between" style={{ width: "100%" }}>
        <Typography
          variant="h6"
          color="textPrimary"
          style={{
            marginBottom: "6px",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <SvgIcon
            color="textPrimary"
            component={AccountBalance}
            style={{ marginRight: "10px", overflow: "visible" }}
          />
          Treasury Breakdown
        </Typography>
        <Typography variant="h6" style={{ textAlign: "right" }}>
          <Trend formattedValue={formattedValue} value={totalValue} lastValue={lastValue} />
        </Typography>
      </Box>

      <Grid
        xs={isVerySmallScreen ? 12 : 5}
        sm={5}
        md={5}
        lg={5}
        style={{ margin: "0", height: isVerySmallScreen ? "140px" : "auto" }}
      >
        <ExodiaPieChart
          data={pieData.length ? pieData : null}
          colors={colors}
          headerText=""
          todayMessage=""
          dataFormat="$"
          bulletpoints={bulletpoints.coin}
          itemNames={dataKeys}
          itemType={itemType.percentage}
          timeSelection={false}
          isDashboard
          fullScreenDisabled
        />
      </Grid>
      <Grid xs={isVerySmallScreen ? 12 : 7} sm={7} md={7} lg={7} style={{ height: "50%" }}>
        <TreasuryTable
          currentData={currentValues}
          previousData={previousValues}
          itemNames={dataKeys}
          colors={colors}
          totalValue={totalValue}
          lastValue={lastValue}
        />
      </Grid>
    </Grid>
  );
};

const TreasuryTable = ({ currentData, previousData, totalValue, lastValue, itemNames, colors }) => {
  const isSmallScreen = useMediaQuery("(max-width: 550px)");

  return (
    <div>
      <TableGrid header isSmallScreen={isSmallScreen}>
        <Cell>
          <Typography variant="body1" color="textSecondary">
            <Trans>Asset</Trans>
          </Typography>
        </Cell>
        <Cell center>
          <Typography variant="body1" color="textSecondary">
            <Trans>Value</Trans>
          </Typography>
        </Cell>
        <Cell center>
          <Typography variant="body1" color="textSecondary">
            <Trans>%</Trans>
          </Typography>
        </Cell>
        <Cell center>
          <Typography variant="body1" color="textSecondary">
            <Trans>Change</Trans>
          </Typography>
        </Cell>
      </TableGrid>
      <TableGrid isSmallScreen={isSmallScreen}>
        {itemNames.map((name, index) => {
          return (
            <>
              <Cell>
                <ColorMark color={colors[index]} />
                <Typography variant="body1">{name}</Typography>
              </Cell>
              <Cell center>
                <Typography variant="body1">
                  {isSmallScreen ? `$${trimNumber(currentData[index])}` : formatCurrency(currentData[index])}
                </Typography>
              </Cell>
              <Cell center>
                <Typography variant="body1">
                  {trim((currentData[index] / totalValue) * 100, isSmallScreen ? 0 : 1)}%
                </Typography>
              </Cell>
              <Cell center>
                <Typography variant="body1">
                  <Trend
                    value={currentData[index]}
                    lastValue={previousData[index]}
                    small
                    isSmallScreen={isSmallScreen}
                  />
                </Typography>
              </Cell>
            </>
          );
        })}
      </TableGrid>
    </div>
  );
};

const Trend = ({ value, lastValue, formattedValue, small, isSmallScreen = false }) => {
  const theme = useTheme();
  const pctChange = trim((value / lastValue - 1) * 100, small ? 1 : 2);

  if (value > lastValue) {
    return (
      <span style={{ color: theme.palette.trendUp }}>
        {formattedValue}{" "}
        <SvgIcon
          component={TrendingUp}
          color="green"
          style={{ fontSize: isSmallScreen ? "0.75rem" : "1rem", width: isSmallScreen ? "16px" : "24px" }}
        />{" "}
        {pctChange}%
      </span>
    );
  }
  if (value < lastValue) {
    return (
      <span style={{ color: theme.palette.trendDown }}>
        {formattedValue}
        <SvgIcon
          component={TrendingDown}
          color="green"
          style={{ fontSize: isSmallScreen ? "0.75rem" : "1rem", width: isSmallScreen ? "16px" : "24px" }}
        />{" "}
        {pctChange}%
      </span>
    );
  }
  return (
    <span>
      {formattedValue}
      <SvgIcon
        component={TrendingFlat}
        color="primary"
        style={{ fontSize: isSmallScreen ? "0.75rem" : "1rem", width: isSmallScreen ? "16px" : "24px" }}
      />
    </span>
  );
};

const TableGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 25% 35% 15% 30%;
  ${({ isSmallScreen }) => isSmallScreen && "grid-template-columns: 30% 25% 15% 35%;"}
  padding-left: 12px;
  grid-row-gap: 12px;

  ${({ header }) => header && "padding-bottom: 12px;  margin-top: 32px;"}
  ${({ header, isSmallScreen }) => header && isSmallScreen && "margin-top: 42px;"}
`;

const ColorMark = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: ${({ color }) => color};
  margin-right: 8px;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  ${({ center }) => center && "justify-self: center;"}
`;
