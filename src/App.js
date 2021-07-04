import React, { Component } from "react";
import "./scss/App.scss";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceDetection from "./components/FaceDetection";
import FaceRecognitionBox from "./components/FaceRecognitionBox";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const option = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({
  apiKey: "",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
      route: "signIn",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  calculateFaceLocation = (data) => {
    let arrOfFaces = [];

    for (const facesObj of data.outputs[0].data.regions) {
      arrOfFaces.push(facesObj.region_info.bounding_box);
    }

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    let faces = [];

    for (const position of arrOfFaces) {
      faces.push({
        left: position.left_col * width,
        top: position.top_row * height + 25,
        right: width - position.right_col * width,
        bottom: height - position.bottom_row * height,
      });
    }

    return faces;

  };

  updateFaceBox = (box) => {
    this.setState({
      box,
    });
  };

  onSubmitImage = () => {
    const { input } = this.state;

    this.setState({
      imgUrl: this.state.input,
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => {
        if (response) {
          fetch("http://localhost:5000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: this.state.user.email,
              faces: response.outputs[0].data.regions.length
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count.entries,
                },
              });
            });
        }
        this.updateFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(`err`, err));

    this.setState({
      input: "",
    });
  };

  onRouteChange = (route) => {
    if (route === "signIn") {
      this.setState({
        imgUrl: "",
      });
    }

    this.setState({
      route,
    });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  render() {
    const { input, box, imgUrl, route, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={option} />
        <Navigation onSignOut={this.onRouteChange} signedIn={route} />
        <Header />
        {route === "home" ? (
          <React.Fragment>
            <FaceDetection currentUser={user} />
            <ImageLinkForm
              onChange={this.onChange}
              onSubmitImage={this.onSubmitImage}
              input={input}
            />{" "}
            <FaceRecognitionBox box={box} imgUrl={imgUrl} />
          </React.Fragment>
        ) : route === "signIn" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
