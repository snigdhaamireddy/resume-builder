import { Box, Button, TextField } from "@mui/material";

const BasicInfo = ({
  activeStep,
  fieldNames,
  handleBack,
  handleNext,
  handleComplete,
  isLastStep,
}) => {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {fieldNames.map((field) => (
        <TextField
          margin="normal"
          required
          fullWidth
          id={field.key}
          label={field.key}
          name={field.key}
          type={field.type}
          onChange={() => {}}
        />
      ))}
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
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BasicInfo;
