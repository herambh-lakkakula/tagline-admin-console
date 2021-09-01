/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";

import { red } from "@material-ui/core/colors";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  Dialog,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
// import Paginate from "../components/Paginate";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import HomeIcon from "@material-ui/icons/Home";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CancelIcon from "@material-ui/icons/Cancel";
import Message from "./Message.js";
import CustomBackdropSpinner from "./CustomBackdropSpinner.js";
import { listMyOrders, listAllOrders } from "../actions/orderAction";

const styles = {
  formControl: {
    margin: "1rem",
    minWidth: "50%",
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
};

const OrderListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAllOrders());
  }, [dispatch]);

  const orderList = useSelector((state) => state.orderList);
  const { loading_orders, error_loading_orders, orders } = orderList;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const handleOrderItemDetails = (id) => {
    console.log("Clicked handleOrderItemDetails " + id);
    history.push(`/admin/order-details/${id}`);
  };
  const handleCancelOrder = (id) => {
    console.log("Canceling Order..!!!" + id);
  };

  let renderOrdersContent = "";
  if (orders) {
    renderOrdersContent = (
      <Table
        stickyHeader={true}
        aria-label="sticky table"
        striped="true"
        bordered="true"
        hover="true"
        responsive="true"
        size="small"
      >
        <TableHead></TableHead>
        <thead>
          <tr>
            <th>
              <Typography align="center">Order Id</Typography>
            </th>
            <th>
              <Typography align="center">User Name</Typography>
            </th>

            <th>
              <Typography align="center">Total Price</Typography>
            </th>
            {/* <th>
              <Typography align="center">Tax Price</Typography>
            </th>
            <th>
              <Typography align="center">Shipping Price</Typography>
            </th> */}
            <th>
              <Typography align="center">Order Date</Typography>
            </th>
            <th>
              <Typography align="center">Details</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td align="center">{order._id}</td>
              <td align="center">{order.user.name}</td>
              <td align="center">{order.totalPrice}</td>
              {/* <td align="center">{order.taxPrice}</td>
              <td align="center">{order.shippingPrice}</td> */}
              <td align="center">{order.createdAt}</td>
              <td align="center">
                <ListAltIcon
                  style={{
                    // color: "green",
                    justifyContent: "center",
                  }}
                  onClick={() => handleOrderItemDetails(order._id)}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return (
    <React.Fragment>
      {loading_orders && (
        <Message variant="danger">{error_loading_orders}</Message>
      )}
      {loading_orders && <CustomBackdropSpinner />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div>
                <Tooltip title="Home" arrow>
                  <IconButton
                    aria-label="delete"
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
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>My Orders </h4>
            </CardHeader>
            <CardBody>
              {renderOrdersContent ? renderOrdersContent : ""}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default OrderListScreen;
