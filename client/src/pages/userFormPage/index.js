import * as React from "react";
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import Section from "./SectionComponent";
import { api } from "../../api";

const steps = [
  "Basic Information",
  "Education",
  "Projects",
  "Certifications",
  "Achievements",
  "Hobbies",
];

const sectionKeys = [
  "basicInfo",
  "academicInfo",
  "projects",
  "certifications",
  "achievements",
  "hobbies"
];

const fieldNames = {
  "Basic Information": [
    { key: "photo", label: "Photo", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "dob", label: "DOB", type: "date" },
    { key: "address", label: "Address", type: "text" },
    { key: "jobRole", label: "Job Role", type: "text" },
    { key: "careerObjective", label: "Career Objective", type: "text" },
    { key: "linkedIn", label: "LinkedIn URL", type: "text" },
    { key: "gitHub", label: "GitHub URL", type: "text" },
    { key: "leetcode", label: "LeetCode URL", type: "text", required: false },
    { key: "hackerrank", label: "HackerRank URL", type: "text", required: false },
    { key: "hackerearth", label: "HackerEarth URL", type: "text", required: false },
    { key: "codechef", label: "CodeChef URL", type: "text", required: false },
    { key: "codeforces", label: "CodeForces URL", type: "text", required: false },
    { key: "geeksforgeeks", label: "GeeksForGeeks URL", type: "text", required: false },
  ],
  Education: [
    { key: "degreeName", label: "Degree Name", type: "text" },
    { key: "board", label: "Board", type: "text" },
    { key: "instituteName", label: "Institute Name", type: "text" },
    { key: "place", label: "Place", type: "text" },
    { key: "score", label: "Score", type: "text" },
    { key: "startYear", label: "Start Year", type: "year" },
    { key: "endYear", label: "End Year", type: "year" },
  ],
  Projects: [
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "technologies", label: "Technologies Used", type: "text", helperText: "Enter values seperated by comma(,)" },
    { key: "demoLink", label: "Demo Link", type: "text" },
    { key: "sourceCodeLink", label: "Source Code Link", type: "text" },
    { key: "applicationLink", label: "Application Link", type: "text" },
  ],
  Certifications: [
    { key: "name", label: "Certificate Name", type: "text" },
    { key: "organisation", label: "Organisation", type: "text" },
  ],
  Achievements: [{ key: "Achievement", label: "Achievement", type: "text" }],
  Hobbies: [{ key: "Hobby", label: "Hobby", type: "text" }],
};

const UserForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [errors, setErrors] = React.useState({
    "Basic Information": [],
    "Education": [],
    "Projects": [],
    "Certifications": [],
    "Achievements": [],
    "Hobbies": []
  });

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

  const handleNext = (data) => {
    // const newActiveStep =
    //   isLastStep() && !allStepsCompleted()
    //     ? // It's the last step, but not all steps have been completed,
    //       // find the first step that has been completed
    //       steps.findIndex((step, i) => !(i in completed))
    //     : activeStep + 1;
    const userData = steps[activeStep] === "Basic Information" ? data[0] : data;
    if(steps[activeStep] === "Projects"){
      userData.forEach(ele => {
        ele.technologies = JSON.stringify(ele.technologies.split(","));
      });
    }
    api
      .post("/form", { userID: localStorage.getItem("id"), sectionName: sectionKeys[activeStep], data: userData })
      .then((res) => {
        console.log(res);
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep(activeStep + 1);
        setErrors({
          ...errors,
          [steps[activeStep]]: []
        });
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors({
          ...errors,
          [steps[activeStep]]: err.response.data.errors
        });
      })
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
          <Box
            sx={{
              backgroundColor: "white",
              position: "fixed",
              width: "100%",
              zIndex: 2,
              padding: "2rem 2rem",
            }}
          >
            <Stepper
              nonLinear
              activeStep={activeStep}
              alternativeLabel
              sx={{ padding: "0.5rem 1rem" }}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton
                    color="inherit"
                    onClick={handleStep(index)}
                  ></StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Section
            sectionName={steps[activeStep]}
            activeStep={activeStep}
            fieldNames={fieldNames[steps[activeStep]]}
            handleBack={handleBack}
            handleNext={handleNext}
            handleComplete={handleComplete}
            isLastStep={isLastStep}
            errors={errors[steps[activeStep]]}
          />
        </React.Fragment>
      )}
    </Box>
  );
};

export default UserForm;
