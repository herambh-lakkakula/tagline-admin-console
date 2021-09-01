/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import DialogContent from "@material-ui/core/DialogContent";
import ConfirmDialog from "../views/ConfirmDialog";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import InputLabel from "@material-ui/core/InputLabel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeIcon from "@material-ui/icons/Home";
import CustomizedSnackBar from "../views/CustomizedSnackBar";
import {
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  Dialog,
  FormControl,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import { red } from "@material-ui/core/colors";

import { listCategories } from "../actions/categoryAction";
import {
  listSubCategoriesByCategoryId,
  updateSubCategory,
  deleteSubCategory,
} from "../actions/subCategoryAction";
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

const SubCategoryListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [categorySelected, setCategorySelected] = useState(() => "");
  const snackBarMesg = "Please Select Sub Category!";
  const dispatch = useDispatch();
  const [open, setOpen] = useState(() => false);
  const [confirmOpen, setConfirmOpen] = useState(() => false);

  const [filteredSubCat, setFilteredSubCat] = useState(() => {});
  const [action, setAction] = useState(() => {});

  const subCategoryUpdate = useSelector((state) => state.subCategoryUpdate);
  const { loading, error, success_subcat_update } = subCategoryUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading_categories,
    error_loading_categories,
    categories,
  } = categoryList;

  useEffect(() => {
    console.log("useEffect Getting Called CategoryListScreen");
    setAction(() => "");
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listSubCategoriesByCategoryId(categorySelected));
  }, [dispatch, categorySelected]);

  const subCategoriesByCategory = useSelector(
    (state) => state.subCategoryListByCategory
  );

  let cats;
  if (categories) {
    console.log(categories);
    cats = categories.categories;
  }

  const { subcategories } = subCategoriesByCategory;
  let renderCategoriesOptions = "";
  if (cats && cats.length > 0) {
    renderCategoriesOptions = cats.map((eachCategory, idx) => {
      return (
        <MenuItem key={idx} value={eachCategory._id}>
          {eachCategory.name}
        </MenuItem>
      );
    });
  }

  const handleChangeCategory = (e) => {
    console.log("Category Changed  " + e.target.value);
    setCategorySelected(() => e.target.value);
  };

  const createHandler = (category) => {
    history.push("/admin/subcategory/new");
  };

  const handleEdit = (subcatg) => {
    setOpen(true);
    console.log("ID SELECTED : " + subcatg._id);
    setFilteredSubCat(subcatg);
    setAction("edit");
  };

  const handleDelete = (subcatg) => {
    console.log("handleDelete Exec..." + subcatg._id);
    setAction("delete");
    setConfirmOpen(true);
    console.log("ID SELECTED : " + subcatg._id);
  };

  const nameChangeHandler = (nm) => {
    setFilteredSubCat({ ...filteredSubCat, name: nm });
    console.log(filteredSubCat);
  };

  const descChangeHandler = (dsc) => {
    setFilteredSubCat({ ...filteredSubCat, description: dsc });
    console.log(filteredSubCat);
  };

  const submitHandler = () => {
    console.log("EXEC submitHandler");
    if (action === "edit") {
      console.log(filteredSubCat);
      dispatch(
        updateSubCategory(
          filteredSubCat._id,
          filteredSubCat.name,
          filteredSubCat.description
        )
      );
      setOpen(false);
      setFilteredSubCat({});
    } else if (action === "delete") {
      console.log(filteredSubCat);
      dispatch(deleteSubCategory(filteredSubCat._id));
      setOpen(false);
    }
  };
  let renderContent = "";
  if (subcategories) {
    renderContent = (
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
              {subcategories.map((eachsubcat) => (
                <tr key={eachsubcat._id}>
                  <td align="center">{eachsubcat.name}</td>
                  <td align="center">{eachsubcat.description}</td>
                  <td align="center">
                    <Tooltip title="Edit" arrow>
                      <EditRoundedIcon
                        style={{ color: "Gray" }}
                        onClick={() => handleEdit(eachsubcat)}
                      />
                    </Tooltip>
                  </td>
                  <td align="center">
                    <Tooltip title="Delete" arrow>
                      <DeleteIcon
                        style={{ color: red[500] }}
                        onClick={() => handleDelete(eachsubcat)}
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
      {error_loading_categories && (
        <Message variant="danger">{error_loading_categories}</Message>
      )}
      {loading_categories && <CustomBackdropSpinner />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={6} md={6} sm={6}>
              <div>
                <Tooltip title="Create User" arrow>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <AddCircleIcon
                      fontSize="medium"
                      style={{
                        color: "#86B817",
                      }}
                      onClick={() => console.log("Clicked New")}
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
            <GridItem
              xs={6}
              md={6}
              sm={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl className={classes.formControl}>
                <InputLabel id="category-controlled-open-select-label">
                  Category
                </InputLabel>
                <Select
                  labelId="category-controlled-open-select-label"
                  label="Category"
                  value={categorySelected}
                  onChange={handleChangeCategory}
                  alignItems="center"
                  style={{ width: "50%" }}
                >
                  {renderCategoriesOptions}
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Sub Categories </h4>
            </CardHeader>
            <CardBody>{renderContent ? renderContent : ""}</CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomizedSnackBar mesg={snackBarMesg} />
        </GridItem>
        <ConfirmDialog
          title="Delete Category ?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={() => console.log("...DELETING")}
        >
          Are you sure you want to delete ?
        </ConfirmDialog>
        <Dialog open={open}>
          <DialogContent>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      Edit Sub Category{" "}
                    </h4>
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
                              filteredSubCat && filteredSubCat.name
                                ? filteredSubCat.name
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
                              filteredSubCat && filteredSubCat.description
                                ? filteredSubCat.description
                                : ""
                            }
                            fullWidth
                            InputProps={{
                              classes: { input: classes.input },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} justify="center">
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

export default SubCategoryListScreen;
