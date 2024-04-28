import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { lightTheme } from "../../Constants";
import { useNavigate } from "react-router-dom";
import {api} from '../../api';

const BatchGrid = () => {
  const navigate = useNavigate();

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  // const [editStartDate, setEditStartDate] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isHovered, setHovered] = useState(false);
  const [batches, setBatches] = useState([]);
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // useEffect(() => {
  //   fetch("http://localhost:8080/batches")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("network error");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setBatches(data);
  //     })
  //     .catch((error) => {
  //       console.error("problem with fetch", error);
  //     });
  // }, []);
  useEffect(() => {
    api
      .get("http://localhost:8080/batches")
        .then((response) => {
          setBatches(response.data);
      })
      .catch((error) => {
        console.error("problem with axios", error);
      });
  }, []);


  // const [batches, setBatches] = useState([
  //   "Batch-1",
  //   "Batch-2",
  //   "Batch-3",
  //   "Batch-4",
  //   "Batch-5",
  //   "Batch-6",
  // ]);

  const handleEditClick = (batch) => {
    console.log(batch);
    setEditName(batch.name);
    // setEditStartDate(batch.startDate);
    setSelectedBatch(batch);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = () => {
    fetch("http://localhost:8080/batches", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedBatch._id,
        name: editName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to update batch");
        }
        return response.json();
      })
      .then((updatedBatch) => {
        setBatches((prevBatches) =>
          prevBatches.map((batch) =>
            batch._id === updatedBatch._id ? updatedBatch : batch
          )
        );
        console.log("batch updated:", updatedBatch);
      })
      .catch((error) => {
        console.error("error updating batch:", error);
      });
    handleEditDialogClose();
  };

  const handleDelete = (id) => {
    fetch("http://localhost:8080/batches", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to delete batch");
        }
        return response.json();
      })
      .then((deletedBatch) => {
        setBatches((prevBatches) =>
          prevBatches.filter((batch) => batch._id !== deletedBatch._id)
        );
      })
      .catch((error) => {
        console.error("error updating batch:", error);
      });
  };

  const handleAddBatch = () => {
    setEditName("");
    setAddDialogOpen(true);
  };

  const handleAddBatchDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleSaveNewBatch = () => {
    fetch("http://localhost:8080/batches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to add new batch");
        }
        return response.json();
      })
      .then((newBatch) => {
        setBatches((prevBatches) => [...prevBatches, newBatch]);
        console.log("Batch added:", newBatch);
      })
      .catch((error) => {
        console.error("error adding new batch:", error);
      });
    handleAddBatchDialogClose();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 30px",
          // height: "50px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            BackgroundColor: lightTheme.palette.primary.main,
          }}
          // className={classes.addBatchButton}
          onClick={handleAddBatch}
        >
          Add Batch
        </Button>
      </div>

      <Grid container spacing={4} style={{ width: "100%" }}>
        {batches.map((batch) => (
          <Grid
            item
            xs={3}
            key={batch}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              // className={classes.card}
              sx={{
                position: "relative",
                height: "150px",
                width: "300px",
                backgroundColor: "lightblue",
                "& .editDeleteButtons": {
                  opacity: 0,
                },
                "&:hover": {
                  transform: "scale(1.05)",
                  "& .editDeleteButtons": {
                    opacity: 1,
                  },
                },
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <CardContent
                sx={{ height: "70%", padding: 0, cursor: "pointer" }}
                onClick={() => navigate(`/batches/${batch._id}`)}
              >
                <Typography
                  variant="h5"
                  component="div"
                  // className={classes.batchCard}
                  sx={{
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {batch.name}
                </Typography>
              </CardContent>
              {/* <IconButton
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    visibility: isHovered ? "visible" : "hidden",
                  }}
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                >
                  <MenuItem onClick={() => handleEditClick(batch)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(batch._id)}>
                    Delete
                  </MenuItem>
                </Menu> */}
              <CardActions
                className={`editDeleteButtons ${
                  isHovered ? "visible" : "hidden"
                }`}
                sx={{
                  transition: "opacity 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                  height: "30%",
                }}
              >
                <Button
                  onClick={() => handleEditClick(batch)}
                  color="secondary"
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(batch._id)} color="primary">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={isEditDialogOpen}
        onClose={handleEditDialogClose}
        // maxWidth="xs"
        PaperProps={{ style: { width: "400px" } }}
      >
        <DialogTitle>Edit Batch</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          {/* <TextField
            label="Start Date"
            variant="outlined"
            fullWidth
            value={editStartDate}
            onChange={(e) => setEditStartDate(e.target.value)}
          /> */}
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAddDialogOpen}
        onClose={handleAddBatchDialogClose}
        PaperProps={{ style: { width: "400px" } }}
      >
        <DialogTitle>Add Batch</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          {/* <TextField
            label="Start Date"
            variant="outlined"
            fullWidth
            // value={editStartDate}
            // onChange={(e) => setEditStartDate(e.target.value)}
          /> */}
          <Button onClick={handleSaveNewBatch} color="primary">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchGrid;
