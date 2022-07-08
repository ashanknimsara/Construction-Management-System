import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Lottie from 'react-lottie';
import animationData from '../lotties/95434-history.json';


function QuotationProcessIntro(){

    return (
        <Grid container>
            <Grid item md={12}>
                <Typography
                    variant="h4"
                    align="center"
                    justifyContent="center"
                    sx={{mt:3}}
                >
                        Let us build your dream for you...
                </Typography>
            </Grid>
            <Grid container item md={12}>
                <Grid 
                    item 
                    md={6}
                    // align="right"
                    sx={{mt:11}}
                >
                    <LottieAnim/>
                </Grid>
                <Grid item md={6}> <QPSteps/> </Grid>
            </Grid>
        </Grid>
    );
}

function QPSteps(){
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        {
            text:"Request a quotation",
        },
        {
            
            text:"We provide you the quotation",
        },
        {
            
            text:"Negotiation phase",
        },
        {
            
            text : "Concluding final price",
        },
        {
            text:"Make an advance payment",
        },
        {
            text:"Commencement of project",
        },
        {
            text: "Continuing the project",
        },
        {
            text: "Make final payment",
        }
    ]
    return(
        <Box sx={{ maxWidth: 400 , ml:10 , mt : 3}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography variant="h5">{step.text}</Typography>
              <Box sx={{ mb: 1}}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    );
}

function LottieAnim(){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return(
        <Lottie 
            options={defaultOptions}
            height={400}
            width={400}
        />
    );
}
export default QuotationProcessIntro