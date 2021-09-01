/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
// import { Table } from "react-bootstrap";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeIcon from "@material-ui/icons/Home";
import Dialog from "@material-ui/core/Dialog";
import ConfirmDialog from "./ConfirmDialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  updateCategory,
  deleteCategory,
  listCategories,
} from "../actions/categoryAction";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { CATEGORY_UPDATE_RESET } from "../constants/categoryConstants";
import CustomBackdropSpinner from "./CustomBackdropSpinner.js";
import Message from "./Message.js";
const styles = {
  cardTitleWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,10)",
      margin: "0",
      fontSize: "14px",
      fontWeight:"700",
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
  trStyle:{
    borderBottom:'3px',
    borderColor:'gray',
  }
};

const CategoryListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const valueTrue=true;

  const [open, setOpen] = useState(() => false);
  const [confirmOpen, setConfirmOpen] = useState(() => false);
  const [filteredCat, setFilteredCat] = useState(() => {});
  const [action, setAction] = useState(() => {});

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const catgs = categories.categories;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success_update } = categoryUpdate;

  useEffect(() => {
    console.log("useEffect Getting Called CategoryListScreen");
    if (success_update) {
      setAction("");
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch(listCategories());
    } else {
      dispatch(listCategories());
      setAction("");
    }
  }, [dispatch, history, success_update]);

  const createCategoryHandler = (category) => {
    history.push("/admin/category/new");
  };

  const nameChangeHandler = (nm) => {
    setFilteredCat({ ...filteredCat, name: nm });
    console.log(filteredCat);
  };

  const descChangeHandler = (dsc) => {
    setFilteredCat({ ...filteredCat, description: dsc });
    console.log(filteredCat);
  };

  const handleEdit = (catg) => {
    setOpen(true);
    console.log("ID SELECTED : " + catg._id);
    setFilteredCat(catg);
    setAction("edit");
  };

  const handleDelete = (catg) => {
    console.log("handleDelete Exec..." + catg._id);
    setAction("delete");
    setConfirmOpen(true);
    console.log("ID SELECTED : " + catg._id);
  };

  const submitHandler = () => {
    console.log("EXEC submitHandler");
    if (action === "edit") {
      console.log(filteredCat);
      dispatch(
        updateCategory(
          filteredCat._id,
          filteredCat.name,
          filteredCat.description
        )
      );
      setOpen(false);
      setFilteredCat({});
    } else if (action === "delete") {
      console.log(filteredCat);
      dispatch(deleteCategory(filteredCat._id));
      setOpen(false);
    }
  };

  let renderContent = "";
  if (catgs) {
    renderContent = (
      <div>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            aria-label="sticky table"
            size="small"
          >
            <TableHead></TableHead>

            <thead>
              <tr >
                <th>
                  <Typography align="center">Name</Typography>
                </th>
                <th>
                  <Typography align="center">Decsription</Typography>
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
              {catgs.map((ec) => (
                <tr key={ec._id} className={classes.trStyle}>
                  <td align="center">{ec.name}</td>
                  <td align="center">{ec.description}</td>
                  <td align="center">
                    <Tooltip title="Edit" arrow>
                      <EditRoundedIcon
                        style={{ color: "Gray" }}
                        onClick={() => handleEdit(ec)}
                      />
                    </Tooltip>
                  </td>
                  <td align="center">
                    <Tooltip title="Delete" arrow>
                      <DeleteIcon
                        style={{ color: red[500] }}
                        onClick={() => handleDelete(ec)}
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
  return (
    <React.Fragment>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <CustomBackdropSpinner />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div>
                <Tooltip title="Create User" arrow>
                  <IconButton aria-label="delete" className={classes.margin} onClick={() => console.log("Clicked New")}>
                    <AddCircleIcon
                      fontSize="default"
                      style={{
                        color: "#86B817",
                      }}
                      
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Home" arrow>
                  <IconButton aria-label="Home" className={classes.margin}  onClick={() => history.push("/")}>
                    <HomeIcon
                      fontSize="default"
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Categories </h4>
            </CardHeader>
            <CardBody>{renderContent ? renderContent : ""}</CardBody>
          </Card>
        </GridItem>
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
                    <h4 className={classes.cardTitleWhite}>Edit Category </h4>
                  </CardHeader>
                  <CardBody>
                    <form onSubmit={submitHandler}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            className={classes.inputText}
                            placeholder="Name"
                            variant="outlined"
                            name="name"
                            onChange={(e) => nameChangeHandler(e.target.value)}
                            type="text"
                            size="small"
                            value={
                              filteredCat && filteredCat.name
                                ? filteredCat.name
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
                            placeholder="Description"
                            variant="outlined"
                            name="description"
                            id="description"
                            onChange={(e) => descChangeHandler(e.target.value)}
                            type="text"
                            size="small"
                            value={
                              filteredCat && filteredCat.description
                                ? filteredCat.description
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
      </GridContainer>
    </React.Fragment>
  );
};

export default CategoryListScreen;
