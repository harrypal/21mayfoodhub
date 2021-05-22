import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import HomeStart from "../components/HomeStart";
import SearchBar from "../components/SearchBar";
import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";

// import store from "../redux/store";
// import { fetchRestaurantsByAddress } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  SearchBar: {
    margin: "24px 0 28px 360px",
  },
  ctaOrder: {
    fontSize: 22,
    backgroundColor: "green",
    textAlign: "center",
    color:'white',
   marginLeft:'auto',
   marginRight:'auto'
  },
  buttonStyleTwo: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginLeft: 10,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    left:'50%',
    paddingBottom:5,
    fontSize:20,
    marginTop: 8,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  
}));

const Home = () => {
  const classes = useStyles();
  const restUrl='something';
  const { loading } = useSelector((state) => state.data);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);
  const [locationStatus, setLocationStatus] = useState(
    localStorage.getItem("location") ? true : false
  );

  // let latlng = localStorage.getItem("latlng");

  // if (latlng) {
  //   const latlngArray = latlng.split(", ");
  //   dispatch(fetchRestaurantsByAddress(latlngArray[0], latlngArray[1]));
  // }

  let restaurantMarkup = loading ? <Spinner /> : <RestaurantContent />;
  return (
    <>
      {authenticated && role === "ROLE_SELLER" ? (
        <Redirect to="/seller/dashboard" />
      ) : (
        <>
          <HomeStart />
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5" className={classes.center} noWrap>
                Your favourite food, delivered with FoodHub&nbsp;&nbsp;
                <span style={{ fontSize: 40 }}>🍽</span>
              </Typography>
            </Grid>
            <Grid item >
              <Link
          to={{
            pathname: `order/${restUrl}`,
            state: {
              restId:'60a2a6cc320fa11c7c74731a',
            },
          }}
          
        >
        <Button size="small" color="primary" className={classes.buttonStyleTwo}> 
        Explore
          </Button>
          </Link>
            </Grid>
            <Grid item container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                {locationStatus ? (
                  restaurantMarkup
                ) : (
                  <Typography variant="body1" className={classes.center} noWrap>
                  {/*  Enter your location to view nearby restaurants */}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
