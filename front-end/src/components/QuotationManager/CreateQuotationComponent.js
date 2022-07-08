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
import InputAdornment from '@mui/material/InputAdornment';
import QuotationService from '../../Services/QuotationService';
import RequestService from "../../Services/RequestService";
import {useLocation} from 'react-router-dom';
import {useState} from 'react';

function CreateQuotation(props) {
  const location = useLocation();
  const [qReq , setQRec] = useState();

  React.useEffect(() => {
    RequestService.getRequestById(location.state.req_id).then((response) => {
    setQRec(response.data)
    formik.setFieldValue("needed_before" , new Date(response.data.expected_before));
    formik.setFieldValue("expected_price" , response.data.expected_price)
  }).catch((err)=>console.log(err))
},[])

  console.log("location" + location.state.req_id)
  const formik = useFormik({
    initialValues: {
      needed_before: new Date(),
      expected_price: 1000,
      possible_before: new Date(),
      offering_price: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values,null,10));
      const quotation = {
        expected_before : values.needed_before.toLocaleDateString(),
        expected_price : values.expected_price,
        possible_before : values.possible_before.toLocaleDateString(),
        possible_price : values.offering_price,
        request : {qReq},
        customer : {
          cusId: 2,
          customer_name: "Milo Kulathunga"
        }
      }
/*
        expected_before : "2000/01/01",
        expected_price : 1234561,
        possible_before : "2000/02/01",
        possible_price : 1234561,
        q_req : {
          {
        "project_type": "Plumbing",
        "expected_before": "2022-10-29",
        "expected_price": 8900565.0,
        "project_description": "testing 8",
        "location": "kegall333333333333333333e",
        "customer": {
            "cusId": 1,
            "customer_name": "fghfh"
        }
    }
        },
        customer : {
          cusId: 1,
          customer_name: "Milo Kulathunga"
        }
*/
      console.warn(quotation)
      QuotationService.createQuotation(quotation).then(response => {
        console.log("response after create = " , response)
        if(response.data == null){
          alert("Failed");
          console.log("response after create fail = " , response)
        }else{
          alert("Success");
          console.log("response after create success= " , response)
        }
      });

    },
  });
  return (
    <form onSubmit={formik.handleSubmit} method="POST">
      <Grid
        container
        spacing={7}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4} xs={12}></Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h4" align="center" sx={{ mt: 5 }}>
            Create Quotation
          </Typography>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3} xs={12}>
        <TextField
          label="Expected Price"
          id="expected_price"
          sx={{ width: 260 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
            endAdornment: <InputAdornment position="end">.00</InputAdornment>,
          }}
          value={formik.values.expected_price}
          type="number"
          disabled
          min = {0}
        />
        </Grid>
        <Grid item md={3}>
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
              disabled
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3}>
         
          <TextField
          label="Offering Price"
          id="offering_price"
          sx={{ width: 260 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
            endAdornment: <InputAdornment position="end">.00</InputAdornment>,
          }}
          onChange={formik.handleChange}
          required
          type="number"
        />
        </Grid>
        <Grid item md={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Possible before"
              id="possible_before"
              name="possible_before"
              value={formik.values.possible_before}
              minDate={new Date()}
              onChange={(val) => {
                formik.setFieldValue("possible_before", val);
              }}
              renderInput={(params) => <TextField {...params} />}
              required
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={2}>
          <ThemeProvider theme={MyTheme}>
            <Button variant="contained" color="secondary" type="submit">
              Create Quotation
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateQuotation;
