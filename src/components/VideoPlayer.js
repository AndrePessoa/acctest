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
        background: transparent;
        border: none;
        color: white;
        font-weight: bolder;
        width: 25px;
        height: 25px;
        border-radius: 50%;

        cursor: pointer;

        &:hover{
            background: rgba( 255, 255, 255, 0.5 );
        }
    }

    h1{
        color: #ffffff4f;
        margin-bottom: 10px;
        position: relative;
        z-index: 11;
    }
`

const Wrap = styled.div`
    position: relative;

    .loading{
        display: flex;
        vertical-align: middle;
        align-items: center;
        justify-content: center;  
        
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.78);
        color: white;
        z-index: 10;

        &:before{
            content:"loading";
        }
    }

    .loaded{
        display: none;
    }

`

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.container = null;
        this.videoPlayer = null;

        this.state = {
            loaded: false,
        };
    }

    _handleEnd(){
        this.props.onVideoEnd();
    }

    _handleStart(){
        this.setState( ( state ) => { return { loaded: true } } );
    }

    _handleClick(){
        this.props.onVideoClosed();
    }

    componentDidMount(){
        this.setState( ( state ) => { return { loaded: false } } );        
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
        const loading = !this.state.loaded? "loading" : "loaded";
        return  <Container innerRef={(div) => { this.container = div; }}>
                    <Wrap>
                        <h1>{this.props.data.title}</h1>
                        <div className={loading}></div>
                        <video ref={(video) => { this.videoPlayer = video; }} controls id="myvideo" onEnded={(e)=>this._handleEnd(e)} onCanPlay={(e)=>this._handleStart(e)} >
                            <source src={this.props.data.contents[0].url}></source>
                        </video>
                    </Wrap>
                    <button onClick={(e)=>this._handleClick(e)}>X</button>
                </Container>;
    }
}

export default VideoPlayer;