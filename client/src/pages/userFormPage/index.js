import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import Section from "./SectionComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarAction } from "../../slice/snackbarReducer";
import api from "../../api";

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
    { key: "photo", label: "Photo", type: "file", required: true },
    { key: "name", label: "Name", type: "text", required: true, disabled: true },
    { key: "email", label: "Email", type: "text", required: true, disabled: true },
    { key: "phone", label: "Phone", type: "text", required: true, disabled: true },
    { key: "dob", label: "DOB", type: "date", required: true },
    { key: "address", label: "Address", type: "text", required: true },
    { key: "jobRole", label: "Job Role", type: "text", required: true },
    { key: "careerObjective", label: "Career Objective", type: "text", required: true },
    { key: "linkedIn", label: "LinkedIn URL", type: "text", required: true },
    { key: "github", label: "GitHub URL", type: "text", required: true },
    { key: "leetcode", label: "LeetCode URL", type: "text", required: false },
    { key: "hackerrank", label: "HackerRank URL", type: "text", required: false },
    { key: "hackerearth", label: "HackerEarth URL", type: "text", required: false },
    { key: "codechef", label: "CodeChef URL", type: "text", required: false },
    { key: "codeforces", label: "CodeForces URL", type: "text", required: false },
    { key: "geeksforgeeks", label: "GeeksForGeeks URL", type: "text", required: false },
  ],
  Education: [
    { key: "degreeName", label: "Degree Name", type: "text", required: true },
    { key: "board", label: "Board", type: "text", required: true },
    { key: "instituteName", label: "Institute Name", type: "text", required: true },
    { key: "place", label: "Place", type: "text", required: true },
    { key: "score", label: "Score", type: "text", required: true },
    { key: "startYear", label: "Start Year", type: "year", required: true },
    { key: "endYear", label: "End Year", type: "year", required: true },
  ],
  Projects: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "text", required: true },
    { key: "technologies", label: "Technologies Used", type: "text", helperText: "Enter values seperated by comma(,)", required: true },
    { key: "demoLink", label: "Demo Link", type: "text", required: true },
    { key: "sourceCodeLink", label: "Source Code Link", type: "text", required: true },
    { key: "applicationLink", label: "Application Link", type: "text", required: true },
  ],
  Certifications: [
    { key: "name", label: "Certificate Name", type: "text", required: true },
    { key: "organisation", label: "Organisation", type: "text", required: true },
  ],
  Achievements: [{ key: "Achievement", label: "Achievement", type: "text", required: true }],
  Hobbies: [{ key: "Hobby", label: "Hobby", type: "text", required: true }],
};

const UserForm = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [errors, setErrors] = useState({
    "Basic Information": [],
    "Education": [],
    "Projects": [],
    "Certifications": [],
    "Achievements": [],
    "Hobbies": []
  });
  const [count, setCount] = useState({
    'Basic Information': 1,
    'Education': 0,
    'Projects': 0,
    'Certifications': 0,
    'Achievements': 0,
    'Hobbies': 0
  });
  const [details, setDetails] = useState({
    'Basic Information': [{
      'name': null,
      'photo': null, 
      'email': null, 
      'phone': null, 
      'dob': null, 
      'address': null, 
      'jobRole': null, 
      'careerObjective': null, 
      'linkedIn': null, 
      'gitHub': null
    }],
    'Education': [], 
    'Projects': [], 
    'Certifications': [],
    'Achievements': [],
    'Hobbies': []
  });
  const template = {
    'Basic Information': {
      'name': null,
      'photo': null, 
      'email': null, 
      'phone': null, 
      'dob': null, 
      'address': null, 
      'jobRole': null, 
      'careerObjective': null, 
      'linkedIn': null, 
      'gitHub': null
    },
    'Education': {
      'degreeName': null,
      'board': null,
      'instituteName': null,
      'place': null,
      'score': null,
      'startYear': null,
      'endYear': null
    }, 
    'Projects': {
      'title': null,
      'description': null,
      'technologies': [],
      'demoLink': null,
      'sourceCodeLink': null,
      'applicationLink': null
    }, 
    'Certifications': {
      'name': null,
      'organisation': null
    },
    'Achievements': null,
    'Hobbies': null
  };
  const [sectionName, setSectionName] = useState("Basic Information");

  const fetchData = () => {
    const id = userState.id;
    api
      .get(`/form/${id}`)
      .then((res) => {
        const userData = res.data.data;
        if(userData){
          setDetails({
            ...details,
            "Basic Information": [userData.basicInfo ? userData.basicInfo : template["Basic Information"]],
            "Education": userData.academicInfo ?? [],
            "Projects": userData.projects ?? [],
            "Certifications": userData.certifications ?? [],
            "Achievements": userData.achievements ?? [],
            "Hobbies": userData.hobbies ?? []
          });
          setCount({
            "Basic Information": 1,
            "Education": userData.academicInfo ? userData.academicInfo.length : 0,
            "Projects": userData.projects ? userData.projects.length : 0,
            "Certifications": userData.certifications ? userData.certifications.length : 0,
            "Achievements": userData.achievements ? userData.achievements.length : 0,
            "Hobbies": userData.hobbies ? userData.hobbies.length : 0
          });
          setCompleted({
            0: userData.basicInfo ? true : false,
            1: userData.academicInfo ? true : false,
            2: userData.projects ? true : false,
            3: userData.certifications ? true : false,
            4: userData.achievements ? true : false,
            5: userData.hobbies ? true : false
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setSnackbarAction({
            snackbarOpen: true,
            snackbarMessage: err.response.data.message,
            snackbarType: "error",
          })
        );
      });
  };

  const fetchUserBasicDetails = () => {
    const userID = userState.id;
    api
      .get(`/users/${userID}`)
      .then((res) => {
        const userData = res.data.data;
        setDetails({
          ...details,
          "Basic Information": [{
            ...["Basic Information"],
            'name': userData.name,
            'email': userData.email,
            'phone': userData.phoneNumber
          }]
        })
      })
      .catch((err) => { 
        console.log(err);
        dispatch(
          setSnackbarAction({
            snackbarOpen: true,
            snackbarMessage: err.response.data.message,
            snackbarType: "error",
          })
        );
      });
  };

  useEffect(() => {
    fetchUserBasicDetails();
    fetchData();
  }, []);

  const addOneMore = () => {
    const values = details[sectionName];
    values.push(template[sectionName]);
    setDetails({
      ...details, 
      [sectionName]: values 
    });
    setCount({
      ...count,
      [sectionName]: count[sectionName] + 1
    });
  };

  const deleteOne = (id) => {
    const values = details[sectionName];
    const updatedDetails = [];
    for(let i=0; i<values.length; i++){
      if(i !== id){
        updatedDetails.push(values[i]);
      }
    }
    setDetails({
      ...details, 
      [sectionName]: updatedDetails 
    });
    setCount({
      ...count,
      [sectionName]: count[sectionName] - 1
    });
  };

  const getBase64Image = async (image) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      var dlImage;
      reader.onload = function () {
        dlImage = reader.result;
        resolve(dlImage);
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  };

  const handleChange = (event, id) => {
    if(sectionName === "Achievements" || sectionName === "Hobbies"){
      const values = details[sectionName];
      const updatedDetails = values.map((val, index) => {
        return index === id ? event.target.value.trimStart() : val; 
      });
      setDetails({ 
        ...details, 
        [sectionName]: updatedDetails
      });
    } else{
      const values = details[sectionName];
      const data = event.target.name === "technologies" ? event.target.value.split(",") : event.target.value.trimStart();
      if(event.target.name === "photo"){
        getBase64Image(event.target.files[0]).then((str) => {
          setDetails((previousDetails) => {
            const basicInfo = previousDetails[sectionName];
            basicInfo[0].photo = str;
            return {
              ...previousDetails,
              [sectionName]: basicInfo,
            };
          });
        });
      }
      const updatedDetails = values.map((val, index) => {
        return index === id ? {
          ...val,
          [event.target.name]: data
        } : val; 
      });
      setDetails({ 
        ...details, 
        [sectionName]: updatedDetails 
      });
    }
    handleComplete(false);
  };

  const handleDateChange = (date, key, id) => {
    const values = details[sectionName];
    const updatedDetails = values.map((val, index) => {
      return index === id ? {
        ...val,
        [key]: date
      } : val; 
    });
    setDetails({ 
      ...details, 
      [sectionName]: updatedDetails 
    });
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    let completedsteps = 0;
    steps.forEach(step => {
      if(completed[step] === true){
        completedsteps++;
      }
    });
    return completedsteps;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    handleNextStep();
  };

  const handleSave = () => {
    const sectionName = steps[activeStep];
    const userData = sectionName === "Basic Information" ? details[sectionName][0] : details[sectionName];
    api
      .post("/form", { userID: localStorage.getItem("id"), sectionName: sectionKeys[activeStep], data: userData })
      .then((res) => {
        console.log(res);
        handleComplete(true);
        handleNextStep();
        setErrors({
          ...errors,
          [steps[activeStep]]: []
        });
        dispatch(
          setSnackbarAction({
            snackbarOpen: true,
            snackbarMessage: res.data.message,
            snackbarType: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setErrors({
          ...errors,
          [steps[activeStep]]: err.response.data.errors
        });
      });
  };

  const handleNextStep = () => {
    const newActiveStep =
    isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(completed[i]))
      : activeStep + 1;
    setActiveStep(newActiveStep);
    setSectionName(steps[newActiveStep]);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    setSectionName(steps[step]);
  };

  const handleComplete = (status) => {
    setCompleted({
      ...completed,
      [activeStep]: status
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // React.useEffect(() => {
  //   const id = localStorage.getItem("id");
  //   api
  //     .get(`/form/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       setUserData({
  //         ...userData,
  //         ...res.data.data,
  //       })
  //     })
  //     .catch((err) => console.log(err));
  // }, [])

  return (
    <Box sx={{ width: "100%" }}>
      {allStepsCompleted() ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Thank you for filling. Form is submitted successfully.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" onClick={handleReset}>
              Return to home
            </Button>
          </Box>
        </>
      ) : (
        <>
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
            details={details[steps[activeStep]]}
            count={count[steps[activeStep]]}
            sectionName={steps[activeStep]}
            activeStep={activeStep}
            fieldNames={fieldNames[steps[activeStep]]}
            addOne={addOneMore}
            deleteOne={deleteOne}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleBack={handleBack}
            handleNext={handleNext}
            handleSave={handleSave}
            isLastStep={isLastStep}
            errors={errors[steps[activeStep]]}
          />
        </>
      )}
    </Box>
  );
};

export default UserForm;
