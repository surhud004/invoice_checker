import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from "@mui/material";

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
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h3" gutterBottom align="center">
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
            sx={{ marginTop: 2 }}
          >
            Check Payment Date
          </Button>
        </Box>

        {paymentDate && (
          <Alert severity="success" sx={{ marginTop: 3 }}>
            Your invoice pay date will be {paymentDate}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default PaymentDateChecker;
