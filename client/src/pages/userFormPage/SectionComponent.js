import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const Section = ({
  sectionName,
  activeStep,
  fieldNames,
  handleBack,
  handleNext,
  handleComplete,
  isLastStep,
  errors
}) => {
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
      'technologies': null,
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
  }

  useEffect(() => {
    console.log(count);
    console.log(details);
  });

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

  const handleChange = (event, id) => {
    if(sectionName === "Achievements" || sectionName === "Hobbies"){
      const values = details[sectionName];
      const updatedDetails = values.map((val, index) => {
        return index === id ? event.target.value : val; 
      });
      setDetails({ 
        ...details, 
        [sectionName]: updatedDetails
      });
    } else{
      const values = details[sectionName];
      const updatedDetails = values.map((val, index) => {
        return index === id ? {
          ...val,
          [event.target.name]: event.target.value
        } : val; 
      });
      setDetails({ 
        ...details, 
        [sectionName]: updatedDetails 
      });
    }
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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: "10%",
        paddingY: "4rem",
      }}
    >
      <Typography
        component="h1"
        variant="h6"
        mt={"2rem"}
        mb={"0rem"}
        fontWeight={600}
      >
        {sectionName}
      </Typography>
      {errors.length > 0 &&
        <Box sx={{ 
          minWidth: "100%",
          backgroundColor: "#FDEDED",
          color: 'red',
          padding: "1rem 2rem",
          borderRadius: "0.5rem", 
        }}>
          {errors.map((error) => (
            <li style={{ paddingBottom: '5px' }}>{error}</li>
          ))}
        </Box>
      }
      <Box width={"100%"}>
        {[...Array(count[sectionName]).keys()].map((val, i) => (
          <Box key={`entry${val}`}>
            <Box
              component="form"
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {fieldNames.map((field) => {
                if (field.type === "text") {
                  return (
                    <TextField
                      key={field.key}
                      margin="normal"
                      required={field.required ?? true}
                      fullWidth
                      id={field.key}
                      label={field.label}
                      name={field.key}
                      type={field.type}
                      helperText={field.helperText ?? ""}
                      value={sectionName === "Achievements" || sectionName === "Hobbies" ? details[sectionName][i] : details[sectionName][i][field.key]}
                      onChange={(e) => handleChange(e, i)}
                      sx={{
                        width: "40%",
                      }}
                    />
                  );
                } else if (field.type === "date") {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        key={field.key}
                        margin="normal"
                        required
                        fullWidth
                        id={field.key}
                        label={`${field.label} *`}
                        name={field.key}
                        value={details[sectionName][i][field.key]}
                        onChange={(date) => handleDateChange(date, field.key, i)}
                        sx={{
                          width: "40%",
                          marginTop: "16px",
                          marginBottom: "8px",
                        }}
                        renderInput={(params) => <TextField {...params} required />}
                      />
                    </LocalizationProvider>
                  );
                } else if (field.type === "year") {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["year"]}
                        key={field.key}
                        margin="normal"
                        required
                        fullWidth
                        id={field.key}
                        label={`${field.label} *`}
                        name={field.key}
                        value={details[sectionName][i][field.key] ? dayjs(`${details[sectionName][i][field.key]}-01-01`): null}
                        onChange={(date) => {
                          const year = dayjs(date).year();
                          handleDateChange(year, field.key, i);
                        }}
                        sx={{
                          width: "40%",
                          marginTop: "16px",
                          marginBottom: "8px",
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        slotProps={{ desktopPaper: { sx: { maxHeight: '280px' } }, popper: { placement: 'top-start' } }}
                      />
                    </LocalizationProvider>
                  );
                }
              })}
            </Box>
            {sectionName !== "Basic Information" && (
              <Button
                variant="contained"
                onClick={() => deleteOne(val)}
                sx={{ mr: 1, width: "fit-content" }}
              >
                Delete
              </Button>
            )}
          </Box>
        ))}
        {sectionName !== "Basic Information" && (
          <Button
            variant="contained"
            onClick={addOneMore}
            sx={{ mt: 1, width: "fit-content" }}
          >
            Add
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          variant="contained"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isLastStep() ? (
          <Button variant="contained" onClick={handleComplete}>
            Finish
          </Button>
        ) : (
          <Button variant="contained" onClick={() => handleNext(details[sectionName])}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Section;
