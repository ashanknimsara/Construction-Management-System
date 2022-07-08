import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MyTheme } from "..";
import { useFormik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import { QuotationService } from "../../Services";
import { useState } from "react";
function RespondToQuotation(props) {
  const [isFieldEdited, setIsFieldEdited] = useState(true);
  const formik = useFormik({
    initialValues: {
      needed_before: new Date(),
      expected_price: "1000",
      possible_before: new Date(),
      offering_price: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 10));
      const q_req = {
        possible_before: values.possible_before.toLocaleDateString(),
        offering_price: values.offering_price,
        customer: {
          cusId: 1,
          customer_name: "Milo Kulathunga",
        },
      };

      QuotationService.createRequest(q_req).then((response) => {
        if (response.data == null) {
          alert("Failed");
        } else {
          alert("Success");
        }
      });
    },
  });

  const handleNegotiate = () => {
      
  };

  const handleReject = () => {
      
  };
  
  return (
    <form onSubmit={formik.handleSubmit} method="POST">
      <Grid
        container
        spacing={7}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4} xs={12} lg={4}></Grid>
        <Grid item md={4} xs={12} lg={4}>
          <Typography variant="h4" align="center" sx={{ mt: 5 }}>
            Respond to Quotation
          </Typography>
        </Grid>
        <Grid item md={4} lg={4}></Grid>
        <Grid item md={3} lg={3}></Grid>
        <Grid item md={3} xs={12} lg={3}>
          <TextField
            label="Expected Price"
            id="expected_price"
            sx={{ width: 260 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rs.</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>,
            }}
            onChange={formik.handleChange}
            type="number"
            
            min={0}
          />
        </Grid>
        <Grid item md={3} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Needed before"
              id="needed_before"
              name="needed_before"
              value={formik.values.needed_before}
              minDate={new Date()}
              onChange={(val) => {
                formik.setFieldValue("needed_before", val);
              }}
              renderInput={(params) => <TextField {...params} />}
              
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3} lg={3}></Grid>
        <Grid item md={3} lg={3}></Grid>
        <Grid item md={3} lg={3}>
          <TextField
            label="Offering Price"
            id="offering_price"
            sx={{ width: 260 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rs.</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>,
            }}
            
            type="number"
            disabled="true"
          />
        </Grid>
        <Grid item md={3} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Possible before"
              id="possible_before"
              name="possible_before"
              value={formik.values.needed_before}
              minDate={new Date()}
              renderInput={(params) => <TextField {...params} />}
              disabled="true"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3} lg={3}></Grid>
        <Grid item md={1} lg={1}>
          <ThemeProvider theme={MyTheme}>
            <Button variant="contained" color="secondary" type="submit">
              ACCEPT
            </Button>
          </ThemeProvider>
        </Grid>
        <Grid item md={1} lg={1} sx={{ mr: 2 }}>
          <ThemeProvider theme={MyTheme}>
            <Button variant="outlined" color="primary" type="button" onClick={handleNegotiate}>
              NEGOTIATE
            </Button>
          </ThemeProvider>
        </Grid>
        <Grid item md={1} lg={1} sx={{ mr: 4 }}>
          <ThemeProvider theme={MyTheme}>
            <Button variant="text" color="error" type="submit">
              REJECT
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </form>
  );
}

export default RespondToQuotation;
