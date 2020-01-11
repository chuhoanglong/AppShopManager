import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { loginWithFirebase } from '../../redux/action/rootAction';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};



class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      values: {},
      touched: {},
      errors: null,
      email: null,
      password: null
    }
  }

  handleSignIn = event => {
    const { history } = this.props;
    event.preventDefault();
    new Promise((resolve, reject) => {
      this.props.loginWithFirebase({ email: this.state.email, password: this.state.password, resolve, reject });
    })
      .then(res => {
        if (!res.message) {
          console.log(res);
          localStorage.setItem('userId', res.uid);
          localStorage.setItem('userName', res.email);
          history.push('/users');
        } else {
          this.setState({ errors: res.message });
        }
      })
      .catch(err => {
        this.setState({ errors: err })
      })
  };

  handleChange = (e) => {
    const value = e.target[e.target.type === "checkbox" ? "checked" : "value"]
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div style={styles.root}>
        <Grid
          style={styles.grid}
          container
        >
          <Grid
            style={styles.content}
            item
            lg={7}
            xs={12}
          >
            <div style={styles.content}>
              <div style={styles.contentBody}>
                <form
                  style={styles.form}
                  onSubmit={this.handleSignIn}
                >
                  <Typography
                    style={styles.title}
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                  >
                    Sign in with social media
                  </Typography>
                  <Grid
                    style={styles.socialButtons}
                    container
                    spacing={2}
                  >
                    <Grid item>
                      <Button
                        color="primary"
                        onClick={this.handleSignIn}
                        size="large"
                        variant="contained"
                      >
                        <FacebookIcon style={styles.socialIcon} />
                        Login with Facebook
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={this.handleSignIn}
                        size="large"
                        variant="contained"
                      >
                        <GoogleIcon style={styles.socialIcon} />
                        Login with Google
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography
                    align="center"
                    style={styles.sugestion}
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>


                  {
                    this.state.errors &&
                    <Typography
                      align="center"
                      style={styles.sugestion}
                      variant="body1"
                      color="error"
                    >
                      {this.state.errors}
                    </Typography>
                  }

                  <TextField
                    style={styles.textField}
                    label="Email address"
                    name="email"
                    fullWidth
                    onChange={this.handleChange}
                    type="text"
                    variant="outlined"
                  />
                  <TextField
                    style={styles.textField}
                    label="Password"
                    name="password"
                    fullWidth
                    onChange={this.handleChange}
                    type="password"
                    variant="outlined"
                  />
                  <Button
                    style={styles.signInButton}
                    color="primary"
                    disabled={!this.state.password || !this.state.email}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don't have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/sign-up"
                      variant="h6"
                    >
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = {
  root: {
    // backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    display: 'none'
  },
  quote: {
    // backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: "#333",
    fontWeight: 300
  },
  name: {
    marginTop: "3px",
    color: "#333"
  },
  bio: {
    color: "#333"
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: "5px",
    paddingBototm: "2px",
    paddingLeft: "2px",
    paddingRight: "2px"
  },
  logoImage: {
    marginLeft: "4px"
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    paddingLeft: "2px",
    paddingRight: "2px"
  },
  title: {
    marginTop: "3px"
  },
  socialButtons: {
    marginTop: "3px"
  },
  socialIcon: {
    marginRight: "1px"
  },
  sugestion: {
    marginTop: "2px"
  },
  textField: {
    marginTop: "2px",
  },
  signInButton: {
    margin: "2px",

  }
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithFirebase: (payload) => { dispatch(loginWithFirebase(payload)) },

  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.users,

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
