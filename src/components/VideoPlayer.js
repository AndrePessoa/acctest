import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    background-color: #060606;

    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: center;

    video{
        width: 100%;
    }
    button{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1000;
    }
    h1{
        color: #ffffff4f;
        margin-bottom: 10px;
    }
`

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.container = null;
        this.videoPlayer = null;
    }

    _handleEnd(){
        this.props.onVideoEnd();
    }

    _handleClick(){
        this.props.onVideoClosed();
    }

    componentDidMount(){
        this.videoPlayer.play();
        var el = this.videoPlayer,
            rfs = el.requestFullscreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullscreen 
            ;
            rfs.call(el);
    }

    componentWillUnmount() {
       //this.videoPlayer.removeEventListener("ended", (e)=>(e), false);
    }

    render() {
        return  <Container innerRef={(div) => { this.container = div; }}>
                    <div>
                    <h1>{this.props.data.title}</h1>
                    <video ref={(video) => { this.videoPlayer = video; }} controls id="myvideo" onEnded={(e)=>this._handleEnd(e)}>
                        <source src={this.props.data.contents[0].url}></source>
                    </video>
                    <button onClick={(e)=>this._handleClick(e)}>X</button>
                    </div>
                </Container>;
    }
}

export default VideoPlayer;