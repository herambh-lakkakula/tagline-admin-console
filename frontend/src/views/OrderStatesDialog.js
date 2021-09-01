/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {
  DELIVERED,
  ORDER_CONFIRMED,
  ORDER_PACKED,
  ORDER_PLACED,
  OUT_FOR_DELIVERY,
  WAITING_FOR_PICKUP,
} from "../constants/orderConstants";
import React from "react";

export const OrderStatesDialog = (props) => {
  const orderStates = [
    DELIVERED,
    ORDER_CONFIRMED,
    ORDER_PACKED,
    ORDER_PLACED,
    OUT_FOR_DELIVERY,
    WAITING_FOR_PICKUP,
  ];
  const useStyles = makeStyles({});
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Update Order Status</DialogTitle>
        <List>
          {orderStates.map((eachState) => (
            <ListItem
              button
              onClick={() => handleListItemClick(eachState)}
              key={eachState}
            >
              <ListItemText primary={eachState} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </React.Fragment>
  );
};

OrderStatesDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
