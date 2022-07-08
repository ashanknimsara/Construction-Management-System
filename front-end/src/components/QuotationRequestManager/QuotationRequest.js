import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MyTheme } from "..";
import { useFormik } from "formik";
import InputAdornment from '@mui/material/InputAdornment';
import {cities , projectType} from "../../data"
import {QuotationService} from '../../Services';

function QuotationRequest(props) {
  const formik = useFormik({
    initialValues: {
      project_type: "Construction",
      needed_before: new Date(),
      expected_price: '1000',
      city: "Kegalle",
      project_description: "Enter description",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values,null,10));

      if(values.needed_before < new Date()){
        alert("Needed before field should contain a value less than the current date");
        return;
      }

      if(parseInt(values.expected_price) < 5000){
        alert("We accept only projects above a budget of Rs.5000.00");
        return;
      }
     
      const q_req = {
        project_type : values.project_type,
        expected_before:values.needed_before.toLocaleDateString(),
        expected_price : values.expected_price,
        location : values.city,
        project_description : values.project_description,
        customer : {
          cusId: 1,
          customer_name: "Milo Kulathunga"
        }
      }

      QuotationService.createRequest(q_req).then(response => {
        if(response.data == null){
          alert("Failed");
        }else{
          alert("Success");
        }
      });

    },
  });
  return (
    <form onSubmit={formik.handleSubmit} method="POST">
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4} xs={12}></Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h4" align="center" sx={{ mt: 5 }}>
            Project Details
          </Typography>
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3} xs={12}>
          <Autocomplete
            disablePortal
            id="project_type"
            options={projectType}
            sx={{ width: 260 }}
            renderInput={(params) => (
              <TextField {...params} label="Project Type" required/>
            )}
            onChange={(e, value) => formik.setFieldValue("project_type", value)}
            
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
              required
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3}>
         
          <TextField
          label="Expected Price"
          id="expected_price"
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
          <Autocomplete
            disablePortal
            name="city"
            id="city"
            options={cities}
            sx={{ width: 260 }}
            renderInput={(params) => (
              <TextField {...params} label="Location" required/>
            )}
            onChange={(e, value) => formik.setFieldValue("city", value)}
          />
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3}></Grid>
        <Grid item md={9}>
          <TextareaAutosize
            name="project_description"
            id="project_description"
            aria-label="minimum height"
            minRows={10}
            placeholder="Project description"
            style={{ width: 607 }}
            onChange={formik.handleChange}
            required
          />
        </Grid>
        <Grid item md={2}>
          <ThemeProvider theme={MyTheme}>
            <Button variant="contained" color="secondary" type="submit">
              Request Quotation
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </form>
  );
}

export default QuotationRequest;
