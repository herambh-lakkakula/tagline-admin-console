/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../actions/userAction";

import {
  Typography,
  Grid,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Table,
} from "@material-ui/core";
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeIcon from "@material-ui/icons/Home";
import { red } from "@material-ui/core/colors";
import Message from "views/Message";
import CustomBackdropSpinner from "views/CustomBackdropSpinner";
import SignUpForm from "views/SignupForm";
const styles = {
  root: {
    minWidth: "100%",
  },
  margin: {
    margin: 1,
  },
  container: {
    maxHeight: 440,
    // maxWidth: "75%",
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
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const AdminUsersListPage = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open,setOpen] = useState(()=>false)
  const [newUserStatus,setNewUserStatus] = useState(()=>"")
  const valueTrue = true;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

   const handleAddUser = () => {
     console.log("Handle Add User..!")
    setOpen(prevState=>!prevState);
  };

  const handleCallBackAddUser =(e)=>{
     console.log("EXEC handleCallBackAddUser from Parent Componnet!",e)
     setOpen(false)
     setNewUserStatus("Created User:"+e.name)
  }

  useEffect(() => {
    console.log(" Loading Users List  ");
    dispatch(listUsers());
  }, [newUserStatus,dispatch, history]);

  let renderUsers = "";
  if (users) {
    renderUsers = (
      <Table
        stickyHeader
        aria-label="sticky table"
        className="table-sm"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} >
              <td align="center">{user.name}</td>
              <td align="center">
                {user.userName}
              </td>
              <td align="center">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td align="center">
                {user.role}
              </td>
              <td align="center">
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  variant="danger"
                  onClick={() => deleteHandler(user._id)}
                >
                  <DeleteIcon style={{ color: red[500] }} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
                  <IconButton aria-label="create" className={classes.margin} onClick={handleAddUser}>
                    <AddCircleIcon
                      fontSize="small"
                      style={{
                        color: "#86B817",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Home" arrow>
                  <IconButton aria-label="Home" className={classes.margin}  onClick={() => history.push("/")}>
                    <HomeIcon
                      fontSize="small"
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
              <h4 className={classes.cardTitleWhite}>USERS</h4>
            </CardHeader>
            <CardBody>{renderUsers}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>New User </h4>
                  </CardHeader>
                  <CardBody>
                    <SignUpForm history={history} handleCallBackAddUser={handleCallBackAddUser}/>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AdminUsersListPage;
