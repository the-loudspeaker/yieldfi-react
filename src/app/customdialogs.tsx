import { useState } from "react";
import { Chain } from "wagmi/chains";
import {
  Button,
  DialogActions,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export interface CustomChainSwitchDialogProps {
  id: string;
  keepMounted: boolean;
  value: number;
  open: boolean;
  chains: any;
  onClose: (value?: number) => void;
}

export function CustomChainSwitchDialog(props: CustomChainSwitchDialogProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);

  const handleCancel = () => {
    onClose();
  };

  const handleChange = (value: number) => {
    setValue(value);
    onClose(value);
  };

  return (
    <Dialog
      fullWidth={false}
      open={open}
      {...other}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "4px",
        },
      }}
      onClose={handleCancel}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        Switch Networks
      </DialogTitle>
      <DialogContent>
        <List>
          {other.chains.map((chain: Chain) => (
            <ListItemButton
              key={chain.id}
              onClick={() => handleChange(chain.id)}
              sx={{
                backgroundColor:
                  chain.id === value ? "#0e76fd" : "background.default",
                borderRadius: "16px",
                color: chain.id === value ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    chain.id === value ? "#0e76fd" : "hover.default",
                  color: chain.id === value ? "white" : "black",
                  boxShadow:
                    chain.id === value
                      ? "0px 10px 10px rgba(0, 0, 0, 0.1)"
                      : null,
                },
                boxShadow:
                  chain.id === value
                    ? "0px 10px 10px rgba(0, 0, 0, 0.1)"
                    : null,
              }}
            >
              <MonetizationOnIcon />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={{ display: "inline", marginLeft: "8px" }}
                  >
                    {chain.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body1"
                    style={{ display: "inline", marginLeft: "128px" }}
                  >
                    {chain.id === value ? "connected" + " 🟢" : ""}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export interface CustomWalletDialogProps {
  id: string;
  keepMounted: boolean;
  address: string;
  balance: string;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function CustomWalletDialog(props: CustomWalletDialogProps) {
  const { onClose, address, balance, open, onLogout, ...other } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "24px",
        },
      }}
      {...other}
    >
      <DialogTitle sx={{ backgroundColor: "#f3f4f4" }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#f3f4f4" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
            fontSize: 74,
          }}
        >
          🐭
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ margin: 10 }}>{address}</h3>
          <p style={{ margin: 0 }}> {balance}</p>
        </div>
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: "#f3f4f4", justifyContent: "center" }}
      >
        <Button
          onClick={() => {
            navigator.clipboard.writeText(String(address));
          }}
          startIcon={<ContentCopyIcon />}
          sx={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "16px",
            color: "black",
          }}
        >
          Copy Address
        </Button>
        <Button
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "16px",
            color: "black",
          }}
        >
          Disconnect
        </Button>
      </DialogActions>
    </Dialog>
  );
}
