import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


const useStyles = makeStyles(theme => ({
  formContainer: {
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(50vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 300,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const Signin = ({ location, history }) => {
  const classes = useStyles();


  return (
    <div>
      <GridContainer spacing={2} alignItems="center" justify="center">
        <GridItem >
          <Card style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',}}>
            <CardBody>
                <div className={classes.formContainer}>
                  <LoginForm location={location} history={history} />
                </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    </div>
  );
};

export default Signin;