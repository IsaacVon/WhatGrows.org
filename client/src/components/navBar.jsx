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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import Grid from "@material-ui/core/Grid";

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
  else if (path === "/SearchZip") return 1;
  else if (path === "/Favorites") return 2;
  else if (path === "/Contact") return 3;
  else if (path === "/SignUp") return 4;
};

export default function NavBar(props) {
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
              to="/SearchZip"
              {...a11yProps(1)}
            />
            <Tab
              label="Favorites"
              component={Link}
              icon={<FavoriteBorderIcon />}
              to="/Favorites"
              {...a11yProps(2)}
            />
            <Tab
              label="Search Plant"
              component={Link}
              icon={<ContactPhoneOutlinedIcon />}
              to="/SearchPlant"
              {...a11yProps(3)}
            />  
            <Tab
              label="Sign up"
              component={Link}
              icon={<ContactPhoneOutlinedIcon />}
              to="/SignUp"
              {...a11yProps(3)}
            />
          </Tabs>
        </Paper>
      </Grid>
    </Grid>
  );
}
