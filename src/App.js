import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import ParticleBackground from './components/Particles/Particles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SingIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

const setupClarifaiOptions = (imageURL) => {
  const PAT = process.env.CLARIFAI_PAT;
  const USER_ID = process.env.CLARIFAI_USER_ID;       
  const APP_ID = process.env.CLARIFAI_APP_ID;
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageURL: '',
      box: [],
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", setupClarifaiOptions(this.state.input))
    .then(response => response.json())
  
    .then(response =>this.displayFaceBox(this.calculateFaceLocations(response)))
    .catch(err => console.log('error', err));
  }

  calculateFaceLocations = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
  
    return clarifaiFaces.map((face) => {
      const boundingBox = face.region_info.bounding_box;
      const image = document.getElementById('inputImage')
      const imageSize = { width:Number(image.width), height: Number(image.height) };
  
      return {
        leftCol: boundingBox.left_col * imageSize.width,
        topRow: boundingBox.top_row * imageSize.height,
        rightCol: imageSize.width - (boundingBox.right_col * imageSize.width),
        bottomRow: imageSize.height - (boundingBox.bottom_row * imageSize.height),
      };
    });
  }
  
  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route :route})
  }

  displayFaceBox = (box) => {
    this.setState({box})
  }

  render(){
    return (
      <div className="App">
        <ParticleBackground />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
          ? <div>
              <Logo/>
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={this.state.box} imageURL= {this.state.imageURL}/>
          </div>
          : (
            this.state.route === 'signin'
            ?<SignIn onRouteChange={this.onRouteChange}/>
            :<Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
