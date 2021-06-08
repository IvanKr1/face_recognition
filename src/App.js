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
  apiKey: "439b8db36d6e4a888c7973b4ff2ce201",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
      route: "signIn",
    };
  }

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: face.left_col * width,
      top: face.top_row * height + 25,
      right: width - face.right_col * width,
      bottom: height - face.bottom_row * height,
    };

    // let box = data.outputs[0].data.regions;

    // for (const data of box) {
    //   console.log(`data`, data);
    // }
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
      .then((response) =>
        this.updateFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(`err`, err));

    this.setState({
      input: "",
    });
  };

  onRouteChange = (route) => {
    this.setState({
      route,
    });
  };

  render() {
    const { input, box, imgUrl, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={option} />
        <Navigation onSignOut={this.onRouteChange} />
        <Header />
        {route === "home" ? (
          <React.Fragment>
            <FaceDetection />
            <ImageLinkForm
              onChange={this.onChange}
              onSubmitImage={this.onSubmitImage}
              input={input}
            />{" "}
            <FaceRecognitionBox box={box} imgUrl={imgUrl} />
          </React.Fragment>
        ) : route === "signIn" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
