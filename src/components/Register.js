import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../scss/Register.scss";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/IvanKr1">
        Github
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerEmail: "",
      registerPassword: "",
      registerName: "",
      passwordLength: false,
    };
  }

  onEmailChange = (e) => {
    console.log(`e`, e.target.value);
    this.setState({ registerEmail: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ registerPassword: e.target.value });
  };

  onNameChange = (e) => {
    this.setState({ registerName: e.target.value });
  };

  onSubmitRegister = (e) => {
    e.preventDefault();

    const { registerPassword } = this.state;

    if (registerPassword.length < 8) {
      this.setState({
        passwordLength: true,
      });
    } else {
      fetch("http://localhost:5000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.registerEmail,
          password: this.state.registerPassword,
          name: this.state.registerName,
        }),
      })
        .then((res) => res.json())
        .then((user) => {
          if (user.status === 200) {
            this.props.loadUser(user);
            this.props.onRouteChange("signIn");
          } else {
            this.setState({
              error: true,
            });

            setTimeout(() => {
              this.setState({ error: false });
            }, 3000);
          }
        });
    }
  };

  render() {
    const { error, registerPassword, passwordLength } = this.state;
    return (
      <Container component="main" maxWidth="xs" className="form">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className="form__container" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={this.onNameChange}
            />
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
              type="password"
              id="password"
              autoComplete="current-password"
              value={registerPassword}
              onChange={this.onPasswordChange}
            />
            {passwordLength && (
              <div className="register__password__error">
                Password has to have atleast 8 characters
              </div>
            )}
            {error && (
              <div className="error__msg">This email is already in use</div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={(e) => this.onSubmitRegister(e)}
            >
              Create an account
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default Register;
