"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useChains,
  useChainId,
  useBalance,
} from "wagmi";
import { useState } from "react";

import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Fab,
  ListItemButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import SavingsIcon from "@mui/icons-material/Savings";
import RedeemIcon from "@mui/icons-material/Redeem";
import PaymentsIcon from "@mui/icons-material/Payments";
import PieChartIcon from "@mui/icons-material/PieChart";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { CustomChainSwitchDialog, CustomWalletDialog } from "./customdialogs";

import "./globals.css";

const drawerWidth = 240;

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff5c00",
      },
    },
  });

  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chains = useChains();
  const balance = useBalance({ address: account.address });
  const [walletDialogState, setWalletDialog] = useState(false);

  const [chainDialogState, setChainDialog] = useState(false);
  const chainId = useChainId();

  const handleWalletDialogOpen = () => {
    console.log("Wallet button clicked when account connected");
    setWalletDialog(true);
  };

  const handleWalletDialogClose = () => {
    setWalletDialog(false);
  };

  const handleLogout = () => {
    handleWalletDialogClose();
    disconnect();
  };

  const handleChainDialogOpen = () => {
    setChainDialog(true);
  };

  const handleChainDialogClose = (newValue?: any) => {
    if (newValue) {
      switchChain({ connector: connectors[0], chainId: newValue });
    }
    setChainDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="static"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Yieldfi React Demo
            </Typography>
            <div //button cannot be a child of button error fix.
            >
              <CurrencyBitcoinIcon
                style={{ marginRight: "8px", color: "white" }}
              />
            </div>
            <Fab variant="extended">
              <IconButton
                disabled={!account.isConnected}
                onClick={handleChainDialogOpen}
              >
                <MonetizationOnIcon />
              </IconButton>
              <Button
                disableElevation={true}
                onClick={
                  account.isConnected
                    ? handleWalletDialogOpen
                    : () => {
                        connect({ connector: connectors[0] });
                      }
                }
                sx={{ color: "black" }}
              >
                {account.isDisconnected
                  ? "Connect Metamask Wallet"
                  : account.isConnecting
                    ? "Connecting"
                    : account.address}
              </Button>
            </Fab>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar //To keep space above menu items
          />
          <List>
            {["Buy", "Mint"].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton className="list-item-button">
                  {index % 2 === 0 ? <SavingsIcon /> : <RedeemIcon />}

                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Earn", "PortFolio"].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton className="list-item-button">
                  {index % 2 === 0 ? <PaymentsIcon /> : <PieChartIcon />}

                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <CustomWalletDialog
          id="wallet details"
          keepMounted
          open={walletDialogState}
          onClose={handleWalletDialogClose}
          onLogout={handleLogout}
          address={String(account.address)}
          balance={
            (balance.data?.value ? balance.data?.value : 0) +
            " " +
            balance.data?.symbol
          }
        ></CustomWalletDialog>
        <CustomChainSwitchDialog
          id="select chain box"
          keepMounted
          open={chainDialogState}
          onClose={handleChainDialogClose}
          value={chainId}
          chains={chains}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
