import { useState } from "react";
import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material";
import COLORS from "../constants/Colors";

function PaymentDateChecker() {
  const [invoiceDate, setInvoiceDate] = useState("");
  const [payCycleDate, setPayCycleDate] = useState("");
  const [paymentDate, setPaymentDate] = useState<string | null>(null);

  /**
   * Formats the date and returns a number array. e.g "2025-04-04" returns number array [2025, 04, 04]
   * @param dateStr date string in format "YYYY-MM-DD"
   * @returns number date array in format [YYYY, MM, DD]
   */
  const formatDate = (dateStr: string) => {
    const formatDateArr = dateStr.split("-");
    return formatDateArr.map(Number);
  };

  const calculatePaymentDate = () => {
    if (invoiceDate && payCycleDate) {
      // once the variables are set, we format the date in number array
      // we need to do this to fix the JavaScript date offset occurs due to timezone differences between local time and UTC
      const invoiceDateArr = formatDate(invoiceDate);
      const payCycleDateArr = formatDate(payCycleDate);
      const invoice = new Date(
        invoiceDateArr[0], // YYYY
        invoiceDateArr[1] - 1, // MM minus one because month array starts from zero i.e. 0 = Jan, 1 = Feb, etc.
        invoiceDateArr[2] // DD
      );
      const cycle = new Date(
        payCycleDateArr[0], // YYYY
        payCycleDateArr[1] - 1, // MM minus one because month array starts from zero i.e. 0 = Jan, 1 = Feb, etc.
        payCycleDateArr[2] // DD
      );
      const payment = new Date(
        invoice.getFullYear(),
        invoice.getMonth(),
        cycle.getDate()
      );
      if (payment < invoice) {
        // if payment date calculated is earlier than invoice date, add one to month so it would display next month's date
        // e.g. invoice = 2025-04-15
        // pay cycle = 2025-04-01 (pay on 1st of every month)
        // then, payment = 2025-05-01 (next payment is 1st May 2025)
        payment.setMonth(payment.getMonth() + 1);
      }
      // otherwise, keep as it is
      // e.g. invoice = 2025-04-15
      // pay cycle = 2025-04-30 (pay on 30th of every month)
      // then, payment = 2025-04-30 (next payment is 30th April 2025)
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
