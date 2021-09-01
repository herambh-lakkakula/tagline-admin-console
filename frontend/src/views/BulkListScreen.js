/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  Dialog,
  Tooltip,
  Hidden,
  IconButton,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import HomeIcon from "@material-ui/icons/Home";
import ConfirmDialog from "./ConfirmDialog";
import DialogContent from "@material-ui/core/DialogContent";
import { deleteCategory } from "../actions/categoryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

import {
  listBulkByProductId,
  updateBulkByProductId,
} from "../actions/bulkAction";
import Message from "./Message.js";
import CustomBackdropSpinner from "./CustomBackdropSpinner.js";

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

const BulkListScreen = ({ history, match }) => {
  let productId = match.params.id;
  console.log(match.params);
  console.log("productId : " + productId);
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [open, setOpen] = useState(() => false);
  const [confirmOpen, setConfirmOpen] = useState(() => false);
  const [editableBulkRecord, setEditableBulkRecord] = useState(() => {});
  const [action, setAction] = useState(() => {});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBulkByProductId(productId));
  }, [dispatch, productId]);

  const bulkList = useSelector((state) => state.bulkListByProductId);
  const { loading, bulk, error } = bulkList;

  let renderBulk = "";

  if (bulk && bulk.length > 0) {
    renderBulk = (
      <div>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            aria-label="sticky table"
            striped
            bordered
            hover
            responsive
            size="sm"
          >
            <TableHead></TableHead>
            <thead>
              <tr>
                <th>
                  <Typography align="center">Unit Of Messure</Typography>
                </th>
                <th>
                  <Typography align="center">Selling Price</Typography>
                </th>
                <th>
                  <Typography align="center">Edit</Typography>
                </th>
                <th>
                  <Typography align="center">Delete</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {bulk.map((eachRec) => (
                <tr key={eachRec._id}>
                  <td align="center">{eachRec.unitOfMessure}</td>
                  <td align="center">{eachRec.sellingPrice}</td>
                  <td align="center">
                    <Tooltip title="Edit" arrow>
                      <EditRoundedIcon
                        style={{ color: "Gray" }}
                        onClick={() => handleEdit(eachRec)}
                      />
                    </Tooltip>
                  </td>
                  <td align="center">
                    <Tooltip title="Delete" arrow>
                      <DeleteIcon
                        style={{ color: "red" }}
                        onClick={() => handleDelete(eachRec._id)}
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  const unitOfMessureChangeHandler = (unitOfMessure) => {
    setEditableBulkRecord({
      ...editableBulkRecord,
      unitOfMessure: unitOfMessure,
    });
    console.log(editableBulkRecord);
  };

  const sellingPriceChangeHandler = (sellPrice) => {
    setEditableBulkRecord({ ...editableBulkRecord, sellingPrice: sellPrice });
    console.log(editableBulkRecord);
  };

  const handleEdit = (bulkRec) => {
    setOpen(true);
    console.log("ID SELECTED : " + bulkRec._id);
    setEditableBulkRecord(bulkRec);
    setAction("edit");
  };

  const handleDelete = (bulkRec) => {
    console.log("handleDelete Exec..." + bulkRec._id);
    setAction("delete");
    setConfirmOpen(true);
    console.log("ID SELECTED : " + bulkRec._id);
  };

  const createBulkItemHandler = (product) => {
    console.log("Before Push  product :" + product);
    history.push(`/admin/bulk/new/${product}`);
  };

  const submitHandler = () => {
    console.log("EXEC submitHandler");
    if (action === "edit") {
      console.log(editableBulkRecord);
      dispatch(
        updateBulkByProductId(
          editableBulkRecord._id,
          editableBulkRecord.unitOfMessure,
          editableBulkRecord.sellingPrice
        )
      );
      setOpen(false);
      setEditableBulkRecord({});
    } else if (action === "delete") {
      console.log(editableBulkRecord);
      dispatch(deleteCategory(editableBulkRecord._id));
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      {loading && <Message variant="danger">{loading}</Message>}
      {loading && <CustomBackdropSpinner />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div>
            <Tooltip title="Create User" arrow>
              <IconButton aria-label="delete" className={classes.margin}>
                <AddCircleIcon
                  fontSize="medium"
                  style={{
                    color: "#86B817",
                  }}
                  onClick={() => createBulkItemHandler(productId)}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Home" arrow>
              <IconButton aria-label="Home" className={classes.margin}>
                <HomeIcon
                  fontSize="medium"
                  style={{
                    color: "#86B817",
                  }}
                  onClick={() => history.push("/")}
                />
              </IconButton>
            </Tooltip>
          </div>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Bulk List </h4>
            </CardHeader>
            <CardBody>{renderBulk ? renderBulk : ""}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <ConfirmDialog
        title="Delete Category ?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => console.log("...DELETING")}
      >
        Are you sure you want to delete ?
      </ConfirmDialog>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Bulk Record </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.inputText}
                          placeholder="Units Of Messure"
                          variant="outlined"
                          name="unitOfMessure"
                          onChange={(e) =>
                            unitOfMessureChangeHandler(e.target.value)
                          }
                          type="text"
                          size="small"
                          value={
                            editableBulkRecord &&
                            editableBulkRecord.unitOfMessure
                              ? editableBulkRecord.unitOfMessure
                              : ""
                          }
                          fullWidth
                          InputProps={{
                            classes: { input: classes.input },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.inputText}
                          placeholder="Selling Price"
                          variant="outlined"
                          name="sellingPrice"
                          id="sellingPrice"
                          onChange={(e) =>
                            sellingPriceChangeHandler(e.target.value)
                          }
                          type="text"
                          size="small"
                          value={
                            editableBulkRecord &&
                            editableBulkRecord.sellingPrice
                              ? editableBulkRecord.sellingPrice
                              : ""
                          }
                          fullWidth
                          InputProps={{
                            classes: { input: classes.input },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          size="small"
                          variant="contained"
                          type="submit"
                          color="primary"
                          fullWidth
                        >
                          UPDATE
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default BulkListScreen;
