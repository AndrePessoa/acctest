import React, { Component } from 'react';
import Videos from './components/Videos';
import HistoryList from './components/HistoryList';
import LoginForm from './components/LoginForm';
import UserService from './services/UserService';

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
    float: left;
  }

  .App-history-button{
    color: white;
    border: none;
    background: none;
    float: right;
    height: 25px;
  }
`

const Main = styled.main`
  position: relative;
`

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        historyOpen: false,
        userIsLogged: false
    };

    this.history = null;
    UserService.name = "teste";
  }


  _handleLoginComplete(e){
    this.setState( ( state ) => { return { userIsLogged: true }; } );
  }

  _handleHistoryClick(e){
    this.setState( ( state ) => { return { historyOpen: !state.historyOpen }; } );
  }

  _handleVideoOpened(e){
    console.log("Opened", e);
    this.refs.history.addVideo(e);
  }

  _handleHistorySelect(e){
    console.log("Selected", e);
    this.refs.videos.selectVideo(e.video.id);
    this.setState( ( state ) => { return { historyOpen: false }; } );    
  }

  render() {
    return (
      <div className="App">
        <Header className="App-header">
          <h1 className="App-title">Accedo Video Player</h1>
          <h2 className="App-page-title">Home</h2>
          <button tabIndex="1" className="App-history-button" onClick={(e)=>this._handleHistoryClick(e)}>{ this.state.historyOpen ? "Back" : "History" }</button>
        </Header>
        <Main>
          { !this.state.userIsLogged &&
            (
              <LoginForm ref="login" loginComplete={ (e)=>this._handleLoginComplete(e) } />  
            )
          }
          { this.state.userIsLogged &&
            (
              <div>
                <HistoryList ref="history" visible={this.state.historyOpen} selectVideo={ (e)=>this._handleHistorySelect(e) } />
                <Videos ref="videos" visible={!this.state.historyOpen} onVideoPlays={ (e)=>this._handleVideoOpened(e) }></Videos>
              </div>         
            )
          }
        </Main>
      </div>
    );
  }
}

export default App;
