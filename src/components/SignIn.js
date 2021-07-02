import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../scss/SignIn.scss";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ marginBottom: "2rem" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/IvanKr1">
        Github
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      error: false,
      inputType: "password",
    };
  }

  onEmailChange = (e) => {
    this.setState({ signInEmail: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ signInPassword: e.target.value });
  };

  onSubmitSignIn = (e) => {
    const { signInEmail, signInPassword } = this.state;
    e.preventDefault();

    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({
            error: true,
          });

          setTimeout(() => {
            this.setState({ error: false });
          }, 3000);
        }
      });
  };

  showPassword = (checked) => {
    if (checked) {
      this.setState({
        inputType: "text",
      });
    } else {
      this.setState({
        inputType: "password",
      });
    }
  };

  render() {
    const { onRouteChange } = this.props;
    const { inputType, error } = this.state;

    return (
      <Container component="main" maxWidth="xs" className="form">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form__container" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={inputType}
              id="password"
              autoComplete="current-password"
              onChange={this.onPasswordChange}
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="Show Password"
                    color="primary"
                    onChange={(e) => this.showPassword(e.target.checked)}
                  />
                }
                label="Show Password"
              />
            </div>
            {error && (
              <div className="error__msg">Enter correct password & email</div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={(e) => this.onSubmitSignIn(e)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className="singIn__registerLink"
                  variant="body2"
                  onClick={() => onRouteChange("register")}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default SignIn;
