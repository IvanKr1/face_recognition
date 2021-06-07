import React, { Component } from "react";
import "./scss/App.scss";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceDetection from "./components/FaceDetection";
import Particles from "react-particles-js";

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onChange = (e) => {
    console.log(`e`, e.target.value);
  };

  onSubmitImage = () => {
    console.log("tuuu");
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={option} />
        <Navigation />
        <Header />
        <FaceDetection />
        <ImageLinkForm
          onChange={this.onChange}
          onSubmitImage={this.onSubmitImage}
        />
      </div>
    );
  }
}

export default App;
