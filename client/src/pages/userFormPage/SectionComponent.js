import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { Add, Delete } from "@mui/icons-material";

const Section = ({
  details,
  count,
  sectionName,
  activeStep,
  fieldNames,
  addOne,
  deleteOne,
  handleChange,
  handleDateChange,
  handleBack,
  handleNext,
  handleSave,
  isLastStep,
  errors
}) => {
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
        {[...Array(count).keys()].map((val, i) => (
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
                      required={field.required ?? false}
                      fullWidth
                      id={field.key}
                      label={field.label}
                      name={field.key}
                      type={field.type}
                      helperText={field.helperText ?? ""}
                      disabled={field.disabled ?? false}
                      value={
                        sectionName === "Achievements" || sectionName === "Hobbies" 
                        ? (details[i] ?? "") 
                        : (details[i][field.key] ?? "")
                      }
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
                        required={field.required ?? false}
                        fullWidth
                        id={field.key}
                        label={field.required ? `${field.label} *`: field.label}
                        name={field.key}
                        value={details[i][field.key] ? dayjs(details[i][field.key]) : null}
                        onChange={(date) => {
                          const ISODate = dayjs(date).toISOString();
                          handleDateChange(ISODate, field.key, i)
                        }}
                        sx={{
                          width: "40%",
                          marginTop: "16px",
                          marginBottom: "8px",
                        }}
                        renderInput={(params) => <TextField {...params} required />}
                      />
                    </LocalizationProvider>
                  );
                } else if (field.type === "file") {
                  if (details[i][field.key] !==  null) {
                    return (
                      <Box
                        sx={{
                            width: "40%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                      >
                        <img
                          src={details[i][field.key]}
                          width="20%"
                          height="50px"
                        />
                        <TextField
                          key={field.key}
                          margin="normal"
                          required={field.required ?? false}
                          fullWidth
                          id={field.key}
                          name={field.key}
                          type={field.type}
                          helperText={field.helperText ?? ""}
                          onChange={(e) =>handleChange(e, i)}
                          sx={{ width: "80%" }}
                        />
                      </Box>
                    );
                  }
                  return (
                    <TextField
                      key={field.key}
                      margin="normal"
                      required={field.required ?? false}
                      fullWidth
                      id={field.key}
                          // label={field.label}
                          // value={
                          //     details[sectionName][i][
                          //         field.key
                          //     ]
                          // }
                      name={field.key}
                      type={field.type}
                      helperText={field.helperText ?? ""}
                      onChange={(e) => handleChange(e, i)}
                      sx={{ width: "40%" }}
                    />
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
                        label={field.required ? `${field.label} *`: field.label}
                        name={field.key}
                        value={details[i][field.key] ? dayjs(`${details[i][field.key]}-01-01`): null}
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
                <Delete sx={{ marginRight: '5px' }} />
                Delete
              </Button>
            )}
          </Box>
        ))}
        {sectionName !== "Basic Information" && (
          <Button
            variant="contained"
            onClick={addOne}
            sx={{ mt: 1, width: "fit-content" }}
          >
            <Add sx={{ marginRight: '5px' }} />
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
          <Button variant="contained" onClick={() => handleSave()}>
            Finish
          </Button>
        ) : (
          <>
            <Button variant="contained"  sx={{ mr: 1 }} onClick={() => handleNext()}>
              Next
            </Button>
            <Button variant="contained" onClick={() => handleSave()}>
              Save & Next
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Section;
