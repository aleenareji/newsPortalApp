import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import AppBar from "../AppBar/AppBar.component";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "60%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimun 4 characters length")
    .max(20, "Password should be of maximum 20 characters length")
    .required("Password is required"),
  display_name: yup
    .string("Enter Display Name")
    .required("Display Name is required")
    .matches(
      /^[a-zA-Z0-9]{4,10}$/,
      "Display name not support any special characters and minimum of 4 characters"
    ),
});

export const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const formik = useFormik({
    initialValues: {
      email: user ? user.email : "",
      password: user ? user.password : "",
      display_name: user ? user.display_name : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
    },
  });

  const onDeleteAccount =()=>{
    localStorage.clear();
    history.push("/");
  }

  return (
    <>
      <AppBar />
      <Box pt={2}>
        <Typography Typography variant="h6" gutterBottom>Edit Profile</Typography>
      </Box>
      <Box pl="30%">
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            disabled
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="text"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="display_name"
            label="Display Name"
            type="text"
            value={formik.values.display_name}
            onChange={formik.handleChange}
            error={
              formik.touched.display_name && Boolean(formik.errors.display_name)
            }
            helperText={
              formik.touched.display_name && formik.errors.display_name
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick ={onDeleteAccount}
          >
            Delete Account
          </Button>
        </form>
      </Box>
    </>
  );
};
export default Profile;
