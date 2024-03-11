import * as React from "react";
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import BasicInfo from "./BasicInfoComponent";

const steps = [
  "Basic Information",
  "Education",
  "Projects",
  "Certifications",
  "Achievements",
  "Hobbies",
];

const fieldNames = {
  "Basic Information": [
    { key: "Photo", type: "text" },
    { key: "Name", type: "text" },
    { key: "Email", type: "text" },
    { key: "Phone Number", type: "text" },
    { key: "DOB", type: "text" },
    { key: "Address", type: "text" },
    { key: "Job Role", type: "text" },
    { key: "Career Objective", type: "text" },
    { key: "LinkedIn", type: "text" },
    { key: "Github", type: "text" },
  ],
  "Education": [
    { key: "Degree Name", type: "text" },
    { key: "Board", type: "text" },
    { key: "Institute Name", type: "text" },
    { key: "Place", type: "text" },
    { key: "Score", type: "text" },
    { key: "Start Year", type: "text" },
    { key: "End Year", type: "text" },
  ],
  "Projects": [
    { key: "Title", type: "text" },
    { key: "Description", type: "text" },
    { key: "Technologies Used", type: "text" },
    { key: "Demo Link", type: "text" },
    { key: "Source Code Link", type: "text" },
    { key: "Application Link", type: "text" },
  ],
  "Certifications": [
    { key: "Name", type: "text" },
    { key: "Organisation", type: "text" },
  ],
  "Achievements": [
    { key: "Achievement", type: "text" },
  ],
  "Hobbies": [
    { key: "Hobby", type: "text" },
  ]
};

const UserForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    // const newActiveStep =
    //   isLastStep() && !allStepsCompleted()
    //     ? // It's the last step, but not all steps have been completed,
    //       // find the first step that has been completed
    //       steps.findIndex((step, i) => !(i in completed))
    //     : activeStep + 1;
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Thank you for filling. Form is submitted successfully.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handleReset}>
                Return to home
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton
                    color="inherit"
                    onClick={handleStep(index)}
                  ></StepButton>
                </Step>
              ))}
            </Stepper>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {steps[activeStep]}
            </Typography>
            <BasicInfo
              activeStep={activeStep}
              fieldNames={fieldNames[steps[activeStep]]}
              handleBack={handleBack}
              handleNext={handleNext}
              handleComplete={handleComplete}
              isLastStep={isLastStep}
            />
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};

export default UserForm;
