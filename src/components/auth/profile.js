import { Layout, Col, Row, Typography, Input, Space } from "antd";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { PhotoCamera } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "auto",
  },
  input: {
    display: "none",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ProfilePage = ({ auth, logoutUser }) => {
  const { user } = auth;
  const classes = useStyles();
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    server_ip: "",
    key: "",
    root: "",

  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile/${user._id}`);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user._id]);

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({
      server_ip: profile.server_ip,
      key: profile.key,
      root: profile.root,

    });
    setFormErrors({});
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFormData({
      server_ip: profile.server_ip,
      key: profile.key,
      root: profile.root,

    });
    setFormErrors({});
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const updatedProfile = {
          server_ip: formData.server_ip,
          key: formData.key,
          root: formData.root,
        };

        

        const response = await axios.patch(
          `/api/profile/${user._id}`,
          updatedProfile
        );

        setProfile(response.data);
        setEditMode(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.server_ip) {
      errors.server_ip = "Server IP is required";
    }

    if (!formData.key) {
      errors.key = "Key is required";
    }

    if (!formData.root) {
      errors.root = "Root is required";
    }

    return errors;
  };

 
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/api/profile/${user._id}`);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container className={classes.root}>
      <Box display="flex" justifyContent="center">
          {user.name.charAt(0)}
      </Box>
      <Box display="flex" justifyContent="center">
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload photo"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
       
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Server IP</InputLabel>
              <TextField
                name="server_ip"
                value={formData.server_ip}
                onChange={handleInputChange}
                disabled={!editMode}
                error={!!formErrors.server_ip}
                helperText={formErrors.server_ip}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Key</InputLabel>
              <TextField
                name="key"
                value={formData.key}
                onChange={handleInputChange}
                disabled={!editMode}
                error={!!formErrors.key}
                helperText={formErrors.key}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Root</InputLabel>
              <TextField
                name="root"
                value={formData.root}
                onChange={handleInputChange}
                disabled={!editMode}
                error={!!formErrors.root}
                helperText={formErrors.root}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <>
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                  onClick={() => setOpenDialog(true)}
                >
                  Delete
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

ProfilePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(ProfilePage);
