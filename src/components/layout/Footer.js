import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#effffa",
    fontFamily: "Poppins-Regular",
    fontSize: "19px",
    padding: "24px",
    marginTop: "auto",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
  },
  link: {
    margin: "4px 0",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={4}
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: "19px",
              padding: "24px",
            }}
          >
            <Typography variant="h6">Contact Us</Typography>
            <Typography>
              Society Address:
              <br />
              123 Main Street
              <br />
              Anytown, USA 12345
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">More Information</Typography>
            <div className={classes.linkContainer}>
              <Link href="/jobs" color="inherit" className={classes.link}>
                Jobs
              </Link>
              <Link href="/partners" color="inherit" className={classes.link}>
                Our Partners
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Links</Typography>
            <div className={classes.linkContainer}>
              <Link
                href="https://www.facebook.com/"
                color="inherit"
                target="_blank"
                rel="noopener"
                className={classes.link}
              >
                Facebook
              </Link>
              <Link
                href="https://twitter.com/"
                color="inherit"
                target="_blank"
                rel="noopener"
                className={classes.link}
              >
                Twitter
              </Link>
              <Link
                href="https://www.linkedin.com/"
                color="inherit"
                target="_blank"
                rel="noopener"
                className={classes.link}
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.example.com/"
                color="inherit"
                target="_blank"
                rel="noopener"
                className={classes.link}
              >
                Our Website
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
