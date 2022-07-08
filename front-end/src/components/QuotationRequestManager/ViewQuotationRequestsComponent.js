import React from "react";
import { Table, Space } from 'antd';
import Grid from "@mui/material/Grid";
import 'antd/dist/antd.css';
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { MyTheme } from "..";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState , useEffect } from "react";
import RequestService from '../../Services/RequestService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [snackState, setSnackState] = useState(false);
  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSnackState(false);
  };

  const handleOK = (option)=>{
    if(1 == option){
      
      handleClose();
      
      history.push({
        pathname: '/create-quotation',
        state: {req_id : props.req_id} 
    });
  }
    if(-1 == option ){
      RequestService.deleteRequest(props.req_id)
      setSnackState(true);
      handleClose();
      setTimeout(function() { window.location.reload(false); }, 3000);
    }

    if(0 == option ){
      handleClose();
    }


  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Button variant={props.buttonVariant} startIcon={props.startIcon} onClick = {handleClickOpen} color={props.buttonColor}>
        {props.buttonText}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {props.modalContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOK(props.handleOKOption)}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackState}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Successfully rejected!"
        action={action}
      />
    </div>
  );
}

const columns = [
  {
    title: 'REQUEST ID',
    dataIndex: 'request_id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'CUSTOMER NAME',
    dataIndex: ["customer", "customer_name"]
  },
  {
    title: 'CUSTOMER ID',
    dataIndex: ["customer" , "cusId"],
  },
  {
    title: 'PROJECT TYPE',
    dataIndex: 'project_type',

  },
  {
    title: 'NEED COMPLETED BEFORE',
    dataIndex: 'expected_before',

  },
  {
    title: 'EXPECTED PRICE',
    dataIndex: 'expected_price',

  },
  {
    title: 'LOCATION',
    dataIndex: 'location',

  },
  {
    title: 'QUOTATION CREATED',
    dataIndex: 'quotation_created',

  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      
      <ThemeProvider theme={MyTheme}>
      <Space size="middle">
      <AlertDialogSlide modalContent={record.project_description} dialogTitle="Project Description" buttonText="VIEW" buttonColor="secondary" buttonVariant="text" startIcon={<AssignmentIcon/>} handleOKOption={0}/>
      {/* <Button variant="outlined" startIcon={<AssignmentTurnedInIcon />} >
        ACCEPT
      </Button> */}
      <AlertDialogSlide modalContent="Do you want to create a quotation using this request?" dialogTitle="CONFIRM ACTION" buttonText="ACCEPT" buttonColor="primary" buttonVariant="outlined" startIcon={<AssignmentTurnedInIcon />} handleOKOption={1} req_id={record.request_id}/>
      <AlertDialogSlide modalContent="Do you want to reject this quotation?" dialogTitle="CONFIRM ACTION" buttonText="REJECT" buttonColor="error" buttonVariant="contained" startIcon={<DeleteIcon />} handleOKOption={-1} req_id={record.request_id}/>
      </Space>
      </ThemeProvider>
    ),
  },
];

//export default () => <Table columns={columns} dataSource={data} />;
function ViewQuotationRequestsComponent(){
    const [tableData , setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [modalConatent, setModalContent] = useState({});

    useEffect(() => {
      setLoading(true);
      RequestService.getAllRequests()
      .then((response) => {
        console.log(response)
        const mydata = response.data;
        setTableData(mydata);
        setLoading(false);
      });
      
    }, []);
    
    console.log(tableData);

    return(
        <Grid
         container
         spacing={3}
         direction="row"
         justifyContent="center"
          alignItems="center"
        >

            <Grid item xs={4} md={4} lg={4}sx={{ml : 15 , mt : 3}} > <Typography variant="h4">Quotation Requests</Typography> </Grid>
            <Grid item xs={12} md={12}>
            <Table 
            columns={columns} 
            dataSource={tableData}
            pagination={false}
            loading = {loading}
             />;
            </Grid>
            {/* <Grid item xs={3} md={3}><Button variant="contained" color="primary" onClick={setData([QuotationService.getAllQuotations()])}>Refresh</Button></Grid> */}
        </Grid>
    );
       
}

//onClick={setData(QuotationService.getAllQuotations())}

export default ViewQuotationRequestsComponent;