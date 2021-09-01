/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
// import Spinner from "../components/controls/Spinner";
import { listUsers, deleteUser } from "../../actions/userAction";
import { Button, Table } from "@material-ui/core";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(() => false);
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    console.log(" Loading UserList SCreen  ");
    if (userInfo && userInfo.role === "ROLE_ADMIN") {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  const addHandler = () => {
    setOpen(true);
    console.log("Adding New User" );
  };
  return (
    <React.Fragment>
      <h1>Users</h1>

      {loading ? (
        // <Spinner />
        <></>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.emailId}`}>{user.emailId}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
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
    </React.Fragment>
  );
};

export default UserListScreen;
