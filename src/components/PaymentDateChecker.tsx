import { useState } from "react";
import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material";
import COLORS from "../constants/Colors";

function PaymentDateChecker() {
  const [invoiceDate, setInvoiceDate] = useState("");
  const [payCycleDate, setPayCycleDate] = useState("");
  const [paymentDate, setPaymentDate] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const formatDateArr = dateStr.split("-");
    return formatDateArr.map(Number);
  };

  const calculatePaymentDate = () => {
    if (invoiceDate && payCycleDate) {
      const invoiceDateArr = formatDate(invoiceDate);
      const payCycleDateArr = formatDate(payCycleDate);
      const invoice = new Date(
        invoiceDateArr[0],
        invoiceDateArr[1] - 1,
        invoiceDateArr[2]
      );
      const cycle = new Date(
        payCycleDateArr[0],
        payCycleDateArr[1] - 1,
        payCycleDateArr[2]
      );
      const payment = new Date(
        invoice.getFullYear(),
        invoice.getMonth(),
        cycle.getDate()
      );
      if (payment < invoice) {
        payment.setMonth(payment.getMonth() + 1);
      }
      setPaymentDate(payment.toDateString());
    }
  };

  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: COLORS.lightest,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          align="center"
          sx={{ color: COLORS.accent }}
        >
          Payment Date Checker
        </Typography>

        <Box sx={{ width: "100%" }}>
          <TextField
            label="Invoice Date"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            label="Pay Cycle Date"
            type="date"
            value={payCycleDate}
            onChange={(e) => setPayCycleDate(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <Button
            onClick={calculatePaymentDate}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, backgroundColor: COLORS.secondary }}
          >
            Check Payment Date
          </Button>
        </Box>

        {paymentDate && (
          <Alert severity="success" sx={{ mt: 3, fontSize: "20px" }}>
            Your invoice pay date will be <strong>{paymentDate}</strong>
          </Alert>
        )}
      </Box>
    </Grid>
  );
}

export default PaymentDateChecker;
