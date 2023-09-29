import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import ParticleBackground from './components/Particles/Particles';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ParticleBackground />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
