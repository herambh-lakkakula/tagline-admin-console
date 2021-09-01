/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Alert from "@material-ui/lab/Alert";

const Message = ({ variant, children }) => {
  return <Alert>{children}</Alert>;
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;
