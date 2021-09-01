/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
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
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
// import Paginate from "../components/Paginate";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeIcon from "@material-ui/icons/Home";
import ConfirmDialog from "./ConfirmDialog";
import DialogContent from "@material-ui/core/DialogContent";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import BusinessIcon from "@material-ui/icons/Business";
import TuneIcon from "@material-ui/icons/Tune";
import CustomizedSnackBar from "./CustomizedSnackBar";

import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

import {
  deleteProduct,
  listProductsByCategoryId,
  listProductsBySubCategoryId,
  updateProduct,
} from "../actions/productAction";
import { listCategories } from "../actions/categoryAction";
import { listSubCategoriesByCategoryId } from "../actions/subCategoryAction";
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

const ProductListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const pageNumber = match.params.pageNumber || 1;
  const snackBarMesg = "Please Select Category & Sub Category ..";
  const [categorySelected, setCategorySelected] = useState(() => "");
  const [subCategorySelected, setSubCategorySelected] = useState(() => "");

  const [open, setOpen] = useState(() => false);
  const [confirmOpen, setConfirmOpen] = useState(() => false);
  const [filteredProduct, setFilteredProduct] = useState(() => { });
  const [action, setAction] = useState(() => { });

  const dispatch = useDispatch();

  const handleChangeCategory = (e) => {
    console.log("Category Changed  " + e.target.value);
    setCategorySelected(() => e.target.value);
    setSubCategorySelected(() => "");
  };
  const handleChangeSubCategory = (e) => {
    console.log("Sub Category Changed  " + e.target.value);
    setSubCategorySelected(() => e.target.value);
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listSubCategoriesByCategoryId(categorySelected));
  }, [dispatch, categorySelected]);

  useEffect(() => {
    dispatch(listProductsBySubCategoryId(subCategorySelected));
  }, [dispatch, subCategorySelected]);

  const nameChangeHandler = (nm) => {
    setFilteredProduct({ ...filteredProduct, name: nm });
  };

  const descChangeHandler = (dsc) => {
    setFilteredProduct({ ...filteredProduct, description: dsc });
  };

  const countInStockHandler = (cis) => {
    setFilteredProduct({ ...filteredProduct, countInStock: cis });
  };

  const taxPercentHandler = (tp) => {
    setFilteredProduct({ ...filteredProduct, taxPercent: tp });
  };

  const isTaxableChangeHandler = (it) => {
    setFilteredProduct({ ...filteredProduct, isTaxable: it });
  };

  const brandChangeHandler = (brd) => {
    setFilteredProduct({ ...filteredProduct, brand: brd });
  };

  const productListBySubCategory = useSelector(
    (state) => state.productListBySubCategory
  );
  const { products, page, pages } = productListBySubCategory;

  const subCategoriesByCategory = useSelector(
    (state) => state.subCategoryListByCategory
  );
  let cats = [];
  if (categories) {
    cats = categories.categories;
  }

  const { subcategories } = subCategoriesByCategory;

  let renderCategoriesOptions = "";
  if (cats && cats.length > 0) {
    renderCategoriesOptions = cats.map((eachCategory, idx) => {
      return (
        <MenuItem key={idx} value={eachCategory._id} style={{ color: "Gray" }}>
          {eachCategory.name}
        </MenuItem>
      );
    });
  }

  let renderSubCategoriesOptions = "";
  if (subcategories && subcategories.length > 0) {
    renderSubCategoriesOptions = subcategories.map((eachSubCategory, idx) => {
      return (
        <MenuItem
          key={idx}
          value={eachSubCategory._id}
          style={{ color: "Gray" }}
        >
          {eachSubCategory.name}
        </MenuItem>
      );
    });
  }

  let renderContent = "";

  if (products && products.length > 0) {
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
                  <Typography align="center">Stock#</Typography>
                </th>
                <th>
                  <Typography align="center">Tax %</Typography>
                </th>
                <th>
                  <Typography align="center">Brand</Typography>
                </th>
                <th>
                  <Typography align="center">Taxable?</Typography>
                </th>
                <th>
                  <Typography align="center">Edit</Typography>
                </th>
                <th>
                  <Typography align="center">Delete</Typography>
                </th>
                <th>
                  <Typography align="center">Home</Typography>
                </th>
                <th>
                  <Typography align="center">Bulk</Typography>
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td align="center">{product.name}</td>
                  <td align="center">{product.countInStock}</td>
                  <td align="center">{product.taxPercent}</td>
                  <td align="center">{product.brand}</td>
                  <td align="center">{product.isTaxable}</td>
                  <td align="center">
                    <Tooltip title="Edit" arrow>
                      <EditRoundedIcon
                        style={{ color: "Gray" }}
                        onClick={() => handleEdit(product)}
                      />
                    </Tooltip>
                  </td>
                  <td align="center">
                    <Tooltip title="Delete" arrow>
                      <DeleteIcon
                        style={{ color: red[500] }}
                        onClick={() => console.log("Clicked Delete")}
                      />
                    </Tooltip>
                  </td>
                  <td align="center">
                    <Tooltip title="Configure Domestic" arrow>
                      <TuneIcon onClick={() => handleDomestic(product._id)} />
                    </Tooltip>
                  </td>
                  <td align="center">
                    <Tooltip title="Configure Bulk" arrow>
                      <TuneIcon onClick={() => handleBulk(product._id)} />
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

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      history.push("/admin/products");
    } else {
      dispatch(listProductsByCategoryId());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (product) => {
    console.log(product);
    setOpen(true);
    console.log("ID SELECTED : " + product._id);
    setFilteredProduct(product);
    setAction("edit");
  };
  const handleDomestic = (id) => {
    console.log("Domestic :ProductID : " + id);
    history.push(`/admin/domestic/${id}`);
  };
  const handleBulk = (id) => {
    history.push(`/admin/bulk/${id}`);
  };
  const createProductHandler = (product) => {
    history.push("/admin/product/new");
  };

  const submitHandler = () => {
    console.log("EXEC submitHandler");
    if (action === "edit") {
      console.log(filteredProduct);
      // dispatch(updateProduct(filteredProduct._id, filteredProduct.name, filteredProduct.description,filteredProduct.countInStock,filteredProduct.isTaxable,filteredProduct.taxPercent,filteredProduct.isTaxable,filteredProduct.brand));
      dispatch(updateProduct(filteredProduct));
      setOpen(false);
      setFilteredProduct({});
    } else if (action === "delete") {
      console.log(filteredProduct);
      dispatch(deleteProduct(filteredProduct._id));
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      {loading && <Message variant="danger">{loading}</Message>}
      {loading && <CustomBackdropSpinner />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={4} md={4} sm={4} align="center">
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
            <GridItem xs={4} md={4} sm={4} align="center">
              <FormControl className={classes.formControl}>
                <InputLabel id="category-controlled-open-select-label">
                  Category
                </InputLabel>
                <Select
                  labelId="category-controlled-open-select-label"
                  label="Category"
                  alignItems="center"
                  style={{ width: "50%", color: "Gray" }}
                  value={categorySelected}
                  onChange={handleChangeCategory}
                >
                  {renderCategoriesOptions}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={4} md={4} sm={4} align="center">
              <FormControl className={classes.formControl}>
                <InputLabel id="sub-category-controlled-open-select-label">
                  Sub - Category
                </InputLabel>
                <Select
                  labelId="sub-category-controlled-open-select-label"
                  label="SubCategory"
                  value={subCategorySelected}
                  onChange={handleChangeSubCategory}
                  alignItems="center"
                  style={{ width: "50%" }}
                >
                  {renderSubCategoriesOptions}
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Products </h4>
            </CardHeader>
            <CardBody>{renderContent ? renderContent : ""}</CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomizedSnackBar mesg={snackBarMesg} />
        </GridItem>
      </GridContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Product </h4>
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
                            filteredProduct && filteredProduct.name
                              ? filteredProduct.name
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
                            filteredProduct && filteredProduct.description
                              ? filteredProduct.description
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
                          placeholder="In Stock #"
                          variant="outlined"
                          name="countInStock"
                          id="countInStock"
                          onChange={(e) => countInStockHandler(e.target.value)}
                          type="text"
                          size="small"
                          value={
                            filteredProduct && filteredProduct.countInStock
                              ? filteredProduct.countInStock
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
                          placeholder="Tax Percent"
                          variant="outlined"
                          name="countInStock"
                          onChange={(e) => taxPercentHandler(e.target.value)}
                          type="text"
                          size="small"
                          value={
                            filteredProduct && filteredProduct.taxPercent
                              ? filteredProduct.taxPercent
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
                          placeholder="Brand"
                          variant="outlined"
                          name="brand"
                          onChange={(e) => brandChangeHandler(e.target.value)}
                          type="text"
                          size="small"
                          value={
                            filteredProduct && filteredProduct.brand
                              ? filteredProduct.brand
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
                          placeholder="Brand"
                          variant="outlined"
                          name="brand"
                          onChange={(e) =>
                            isTaxableChangeHandler(e.target.value)
                          }
                          type="text"
                          size="small"
                          value={
                            filteredProduct && filteredProduct.isTaxable
                              ? filteredProduct.isTaxable
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

export default ProductListScreen;
