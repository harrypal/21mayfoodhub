import {
  SET_RESTAURANTS,
  LOADING_DATA,
  SET_RESTAURANT,
  LOADING_UI,
  SET_ERROR_ITEM,
  SERVER_ERROR,
  CLEAR_ERRORS,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
  SET_CART,
  DELETE_ITEM_CART,
  SET_ERRORS,
  SET_ORDERS,
  EDIT_STATUS,
} from "../types";

// const checksum_lib = require('./paytm/checksum');
// const config = require('./paytm/config');
// import {genchecksum} from './paytm/checksum';
// import {PaytmConfig} from './paytm/config';


import axios from "../../util/axios";
import axiosNewInstance from "axios";
import { getUserData } from "./authActions";
// import { PaytmConfig } from "../../../../Backend/controllers/paytm/config";

export const fetchRestaurants = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/restaurants")
    .then((res) => {
      dispatch({
        type: SET_RESTAURANTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_RESTAURANTS,
        payload: [],
      });
    });
};

export const fetchRestaurantsByAddress = (lat, lng) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/restaurants-location/${lat}/${lng}`)
    .then((res) => {
      console.log(res)
      dispatch({
        type: SET_RESTAURANTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_RESTAURANTS,
        payload: [],
      });
    });
};

export const fetchRestaurant = (restId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/restaurant/${restId}`)
    .then((res) => {
      dispatch({
        type: SET_RESTAURANT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_RESTAURANT,
        payload: {},
      });
    });
};

export const addItem = (itemData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/seller/create-item`, itemData)
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data.item,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_ITEM,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteItem = (itemId) => (dispatch) => {
  axios
    .delete(`/seller/delete-item/${itemId}`)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        payload: itemId,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editItem = (itemData, itemId) => (dispatch) => {
  axios
    .put(`/seller/edit-item/${itemId}`, itemData)
    .then((res) => {
      dispatch({
        type: EDIT_ITEM,
        payload: res.data.item,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_ITEM,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addToCart = (itemData) => (dispatch) => {
  axios
    .post("/cart", itemData)
    .then((res) => {
      dispatch({
        type: ADD_CART_SUCCESS,
        payload: itemData.itemId,
      });
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: ADD_CART_FAIL,
      });
    });
};

export const getCart = () => (dispatch) => {
  axios
    .get("/cart")
    .then((res) => {
      dispatch({
        type: SET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_CART,
        payload: [],
      });
    });
};

export const deleteCartItem = (itemData) => (dispatch) => {
  axios
    .post("/delete-cart-item", itemData)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM_CART,
      });
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const removeCartItem = (itemID) => (dispatch) => {
  axios
    .post(`/remove-cart-item/${itemID}`)
    .then((res) => {
      console.log(res.data);
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const fetchAddress = (userData, history) => (dispatch) => {
  const location = `+${userData.aptName},+${userData.locality},+${userData.street},+${userData.zip}`;
  axiosNewInstance
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    })
    .then((result) => {
      const formattedAddress = result.data.results[0].formatted_address;
      console.log(formattedAddress);
      const lat = result.data.results[0].geometry.location.lat;
      const lng = result.data.results[0].geometry.location.lng;
      userData.lat = lat;
      userData.lng = lng;
      userData.formattedAddress = formattedAddress;
      dispatch(addAddress(userData, history));
    })
    .catch((err) => {
      console.log(err);
    });
};


export const fetchAddress1 = (userData, history) => (dispatch) => {
  const location = `+${userData.aptName},+${userData.locality},+${userData.street},+${userData.zip}`;
  axiosNewInstance
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    })
    .then((result) => {
      const formattedAddress = result.data.results[0].formatted_address;
      console.log(formattedAddress);
      const lat = result.data.results[0].geometry.location.lat;
      const lng = result.data.results[0].geometry.location.lng;
      userData.lat = lat;
      userData.lng = lng;
      userData.formattedAddress = formattedAddress;
      dispatch(addAddress1(userData, history));
    })
    .catch((err) => {
      console.log(err);
    });
};


// const PaytmCall = ()=>{
    

// var params = {};
// params['MID'] = PaytmConfig.mid;
// params['WEBSITE'] = PaytmConfig.website;
// params['CHANNEL_ID'] = 'WEB';
// params['INDUSTRY_TYPE_ID'] = 'Retail';
// params['ORDER_ID'] = 'TEST_' + new Date().getTime();
// params['CUST_ID'] = 'customer_' + Math.random(1,1000).toString();
// params['TXN_AMOUNT'] = '10'
// params['CALLBACK_URL'] = 'http://localhost:3000/callback';
// params['EMAIL'] = 'hello@gmail.com';
// params['MOBILE_NO'] = '6594654456';


// // checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
//   genchecksum(params, PaytmConfig.key, function (err, checksum) {
  
// var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
//   // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

//   var form_fields = "";
//   for (var x in params) {
//     form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
//   }
//   form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
//   const htmlpaytm = '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>';

//   var myWindow = window.open("", "MsgWindow", "width=200,height=100");
//   myWindow.document.write(htmlpaytm);
//   // res.writeHead(200, { 'Content-Type': 'text/html' });
//   // res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
//   // res.end();
//   // const htmlpaytm = '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>';
//   // res.json({paytm:htmlpaytm})
// });

// }

// }

export const addAddress = (userData, history) => (dispatch) => {
  console.log(userData.formattedAddress);
  axios
    .post("/user/address", userData)
    .then((res) => {
      // console.log(res.data);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch(placeOrder(history));
      // PaytmCall();
      window.open('https://paytm.com/paytmwallet','_blank')
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};



export const addAddress1 = (userData, history) => (dispatch) => {
  console.log(userData.formattedAddress);
  axios
    .post("/user/address", userData)
    .then((res) => {
      // console.log(res.data);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch(placeOrder(history));
      // PaytmCall();
      // window.open('https://paytm.com/paytmwallet','_blank')
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};


export const placeOrder = (history) => (dispatch) => {
  axios
    .post("/order")
    .then((res) => {
      history.push("/orders");
      dispatch(getOrders());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getOrders = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/orders")
    .then((res) => {
      dispatch({
        type: SET_ORDERS,
        payload: res.data.orders,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const changeOrderStatus = (orderId, body) => (dispatch) => {
  axios
    .post(`/order-status/${orderId}`, body)
    .then((res) => {
      dispatch({
        type: EDIT_STATUS,
        payload: res.data.updatedOrder,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const socketStatusUpdate = (order) => (dispatch) => {
  dispatch({
    type: EDIT_STATUS,
    payload: order,
  });
};
