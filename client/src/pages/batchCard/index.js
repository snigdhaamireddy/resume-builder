import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar/Navbar";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { lightTheme } from "../../Constants";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    height: "150px",
    width: "300px",
    backgroundColor: "lightblue",
    "&:hover": {
      transform: "scale(1.05)",
      "& $editDeleteButtons": {
        opacity: 1,
      },
    },
  },
  batchCard: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  editDeleteButtons: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
  addBatchButton: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const BatchGrid = () => {
  const classes = useStyles();
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

  useEffect(() => {
    fetch("http://localhost:8080/batches")
      .then((response) => {
        if (!response.ok) {
          throw new Error("network error");
        }
        return response.json();
      })
      .then((data) => {
        setBatches(data);
      })
      .catch((error) => {
        console.error("problem with fetch", error);
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
    console.log(batch)
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
        )
      })
      .catch((error) => {
        console.error("error updating batch:", error);
      });
  }

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
      <Navbar></Navbar>
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
          sx={{ color: lightTheme.palette.secondary.main }}
          className={classes.addBatchButton}
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
              className={classes.card}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <CardContent>
                <Link
                  to={`/batches/${batch._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    className={classes.batchCard}
                  >
                    {batch.name}
                  </Typography>
                </Link>
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

                <div
                  className={`${classes.editDeleteButtons} ${
                    isHovered ? "visible" : "hidden"
                  }`}
                >
                  <Button
                    onClick={() => handleEditClick(batch)}
                    color="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(batch._id)}
                    color="primary"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
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
