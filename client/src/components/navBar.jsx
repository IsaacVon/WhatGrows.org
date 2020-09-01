import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from "@material-ui/core";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import NaturePeopleOutlinedIcon from '@material-ui/icons/NaturePeopleOutlined';import Grid from "@material-ui/core/Grid";
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {},
});

const currentTab = () => {
  let path = window.location.pathname;
  if (path === "/") return 0;
  else if (path === "/searchzip") return 1;
  else if (path === "/favorites") return 2;
  else if (path === "/contact") return 3;
  else if (path === "/signin") return 2;
  else if (path === "/contact") return 3;
};

export default function NavBar({ name, loggedIn }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(currentTab); // This choses which one is highlighted

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const tabProps = {
    variant: isSmallScreen ? "scrollable" : "standard",
    centered: isSmallScreen ? false : true,
  };

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Paper className={classes.root} elevation={2}>
          <Tabs
            {...tabProps}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Home"
              component={Link}
              to="/"
              icon={<FilterHdrOutlinedIcon />}
              {...a11yProps(0)}
            />
            <Tab
              label="Search Zip"
              component={Link}
              icon={<ImageSearchIcon />}
              to="/searchzip"
              {...a11yProps(1)}
            />
            {loggedIn && (
              <Tab
                label="Favorites"
                component={Link}
                icon={<FavoriteBorderIcon />}
                to="/favorites"
                {...a11yProps(2)}
              />
            )}
            {loggedIn && (
              <Tab
                label="Sign Out"
                component={Link}
                icon={<NaturePeopleOutlinedIcon />}
                to="/logout"
                {...a11yProps(2)}
              />
            )}
            {!loggedIn && (
              <Tab
                label="Sign In"
                component={Link}
                icon={<DirectionsRunOutlinedIcon />}
                to="/signin"
                {...a11yProps(3)}
              />
            )} 
            {!loggedIn && (
              <Tab
                label="Sign Up"
                component={Link}
                icon={<DirectionsRunOutlinedIcon />}
                to="/signup"
                {...a11yProps(3)}
              />
            )}
          </Tabs>
        </Paper>
      </Grid>
    </Grid>
  );
}
