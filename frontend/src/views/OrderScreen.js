/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getOrderDetailsById, updateOrderStatus } from "../actions/orderAction";
// import StepperScreen from "./StepperScreen";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CustomBackdropSpinner from "./CustomBackdropSpinner";
import { OrderStatesDialog } from "./OrderStatesDialog";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import rupeeSvgIcon from "../assets/img/svg/currency-inr.svg";
import HomeIcon from "@material-ui/icons/Home";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  Button,
  Paper,
  useMediaQuery,
  Grid,
  Typography,
  Icon,
  Card,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import {
  CANCELED,
  DELIVERED,
  ORDER_CONFIRMED,
  ORDER_PACKED,
  ORDER_PLACED,
  OUT_FOR_DELIVERY,
  WAITING_FOR_PICKUP,
} from "../constants/orderConstants";
import Cancel from "@material-ui/icons/Cancel";
import CustomizedSnackbars from "./CustomizedSnackBar";
import CustomizedSteppers from "./CustomizedSteppers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    marginTop: "4em",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "2em",
    },
  },
  heroTextContainer: {
    minWidth: "21em",
    maxWidth: "50em",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      maxWidth: "30em",
      marginTop: "1em",
    },
  },
  animation: {
    maxWidth: "50em",
    minWidth: "21em",
    marginLeft: "1%",
    // marginTop: "-8%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      maxWidth: "30em",
      marginTop: "1em",
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  imageIcon: {
    height: "1rem",
  },
  iconRoot: {
    textAlign: "center",
  },
  cardTitleWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,10)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleGreen: {
    color: "#26A541",
    marginTop: "0px",
    minHeight: "auto",
    fontFamily: "Roboto",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: "capitalize",
    textAlign: "left",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));

const OrderScreen = ({ match, history }) => {
  console.log("Loading OrderScreen..!");
  const classes = useStyles();
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const orderStates = [
    ORDER_PLACED,
    ORDER_CONFIRMED,
    ORDER_PACKED,
    WAITING_FOR_PICKUP,
    OUT_FOR_DELIVERY,
    DELIVERED,
  ];
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(orderStates[0]);

  const handleClickOpen = () => {
    console.log("Handle Updarte Status  : ");
    setOpen(true);
  };

  const handleClose = (order_status_selected) => {
    console.log("Value Selected is  : " + order_status_selected);
    setOpen(false);
    setSelectedValue(order_status_selected);
    if (order) {
      dispatch(updateOrderStatus(order, order_status_selected));
    }
  };

  const orderId = match.params.id;

  const dispatch = useDispatch();

  const available_status = [
    ORDER_PLACED,
    ORDER_CONFIRMED,
    ORDER_PACKED,
    WAITING_FOR_PICKUP,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELED,
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderStatusUpdated = useSelector((state) => state.orderStatusUpdated);
  const {
    update_order_status_loading,
    update_order_status_error,
    update_order_status_success,
  } = orderStatusUpdated;

  const handleCancelOrder = (id) => {
    console.log("Order Cancel by ID : " + id);
  };

  useEffect(() => {
    // if (!userInfo) history.push("/login");

    if (orderId) dispatch(getOrderDetailsById(orderId));
  }, [dispatch, history, orderId, userInfo, update_order_status_success]);

  useEffect(() => { }, [order]);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log("Fetched Order by ID : " + orderId);

  return loading ? (
    <CustomBackdropSpinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <React.Fragment>
      {loading && <Message variant="danger">{error}</Message>}
      {update_order_status_loading && <CustomBackdropSpinner />}
      {loading && <CustomBackdropSpinner />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div>
                <Tooltip title="Home" arrow>
                  <IconButton
                    aria-label="home"
                    className={classes.margin}
                    onClick={() => history.push("/")}
                  >
                    <HomeIcon
                      style={{
                        color: "#86B817",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomizedSteppers />
        </GridItem>
      </GridContainer>
      <Grid container direction="column" className={classes.mainContainer}>
        <Grid item>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="row"
          >
            <Grid sm item className={classes.heroTextContainer}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h5">
                              Order # {orderId}
                            </Typography>
                            <Divider />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            container
                            justify="flex-start"
                          // marginBottom="1rem"
                          >
                            <Typography variant="h5">
                              Shipping Details
                            </Typography>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">Name:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>{order.user.name}</strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>Email: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>
                                      <a href={`mailto:${order.user.email}`}>
                                        {order.user.email}
                                      </a>
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>Address: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body2">
                                    <strong>
                                      {order.shippingAddress.address}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>City: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>
                                      {order.shippingAddress.city}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={5}>
                                  <Typography variant="body1">
                                    <strong>Postal Code: </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography variant="body1">
                                    <strong>
                                      {order.shippingAddress.postalCode}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid
                        item
                        xs={12}
                        container
                        justify="flex-start"
                      // marginBottom="1rem"
                      >
                        <Typography variant="h5">Order Details</Typography>
                      </Grid>
                      {order.orderItems.map((item, index) => (
                        <Grid item key={index}>
                          <Grid container>
                            <Grid item xs={2}>
                              <img
                                className="img-thumbnail"
                                src={item.imageUrl}
                                alt={item.name}
                                style={{
                                  height: "3.5rem",
                                  width: "3.5rem",
                                  marginRight: "5rem",
                                }}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <Grid container>
                                <Grid
                                  item
                                  xs={3}
                                  style={{
                                    justify: "left",
                                    alignContent: "left",
                                    // marginRight: "5rem",
                                    // marginTop: "1rem",
                                  }}
                                >
                                  <Typography variant="body1">
                                    {item.name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body1">
                                    {item.quantityOrdered} X
                                    <Icon classes={{ root: classes.iconRoot }}>
                                      <img
                                        alt="curency inr"
                                        src={rupeeSvgIcon}
                                        className={classes.imageIcon}
                                      />
                                    </Icon>
                                    {item.totalPrice} =
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} align="left">
                                  <Typography variant="body1">
                                    <Icon classes={{ root: classes.iconRoot }}>
                                      <img
                                        alt="curency inr"
                                        src={rupeeSvgIcon}
                                        className={classes.imageIcon}
                                      />
                                    </Icon>

                                    {item.quantityOrdered * item.totalPrice}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            container
                            justify="flex-start"
                          // marginBottom="1rem"
                          >
                            <Typography variant="h5">
                              Payment Details
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              Payment Method
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              {order.paymentMethod}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid sm item className={classes.animation}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    container
                    justify="flex-start"
                  // marginBottom="3rem"
                  >
                    <Typography variant="h5" justify="flex-start">
                      Order Summary
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container spacing={1} justify="center">
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Items Cost</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.totalPrice -
                            order.shippingPrice -
                            order.taxPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Shipping Cost</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.shippingPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Tax</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.taxPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Total</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {order.totalPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">STATUS</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{order.status}</Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleClickOpen}
                      style={{ width: "15rem" }}
                      startIcon={<EditIcon style={{ color: "white" }} />}
                    >
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        align="center"
                        style={{ color: "white" }}
                      >
                        Update Order Status
                      </Typography>
                    </Button>
                    <OrderStatesDialog
                      selectedValue={selectedValue}
                      open={open}
                      onClose={handleClose}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={handleCancelOrder}
                      style={{ width: "15rem" }}
                      startIcon={<Cancel style={{ color: "red" }} />}
                    >
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        align="center"
                        style={{ color: "white" }}
                      >
                        Cancel Order
                      </Typography>
                    </Button>
                  </Grid>

                  <Divider />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderScreen;
