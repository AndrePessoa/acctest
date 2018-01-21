import React, { Component } from 'react';
import Videos from './components/Videos';
import VideosService from './services/VideosService';
import styled from 'styled-components';
 
const Header = styled.header`
  padding: 25px 50px 25px;
  background-color: #888;
  height: 75px;

  .App-title{
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .App-page-title{
    color: white;
    font-size: 1.6em;    
  }
`

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: undefined,
      afterLoad: false
    };

    VideosService.getVideos().then(response => {
      this.setState( ( state ) => { return { videos: response.result.entries || [] }; } );
    });
  }

  render() {
    return (
      <div className="App">
        <Header className="App-header">
          <h1 className="App-title">Accedo Video Player</h1>
          <h2 className="App-page-title">Home</h2>
        </Header>
        <Videos videos={this.state.videos} ></Videos>
      </div>
    );
  }
}

export default App;
