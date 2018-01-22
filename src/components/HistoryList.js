import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import HistoryService from '../services/HistoryService';
import styled from 'styled-components';

const Stage = styled.section`

    position: absolute;
    top: 0;
    bottom: 0;
    rigth: 0;
    left: 0;

    background: #eaeaea;
    width: 100vw;
    padding: 25px;
    height: calc( 100vh - 75px );

    overflow: auto;
    display: block;

    z-index: 1000;

    &.hide{
        display: none;
    }

    counter-reset: ul;   
    ol{
        li{
            position: relative;
            margin-left: 50px;
            font-size: 1.2em;
            margin-bottom: 10px;
            cursor: pointer;

            &:before {
                color: #0000004f;

                position: absolute;
                left: -20px;
                text-align: right;

                counter-increment: ul;
                content: counter(ul) ". "; 
            }

            &:hover,
            &:focus{
                background: gray;
            }
        }
    }

    time{
        width: 100px;
        color: rgba(0,0,0,0.25);
        font-size: 0.75em;
        display: inline-block;
        position: relative;
        bottom: 1px;
        margin-left: 10px;            
    }
`

class HistoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
        };
        HistoryService.load().then((list)=>{
            list.map((e)=>{ this.state.videos.push( e ); });
        });
    }
  
    addVideo(video){
        var data = { time: Date.now(), video: video }
        this.state.videos.unshift( data );
        HistoryService.save( this.state.videos ); 
    }

    selectVideo(video){
        this.props.selectVideo(video);

    }

    handleKeydown(e, video){
        if( e.keyCode === 13 ) this.selectVideo(video);
    }
  
    render() {
        var visible = this.props.visible ? "" : "hide" ;
        let canTab = this.props.visible ? "0" : "";

        return  <Stage className={ "history " + visible }  >
                    <ol>
                        {this.state.videos.map((video, index) => <li key={index} metadata={video} onClick={(e)=>{this.selectVideo(video)}} onKeyDown={(e)=>{ this.handleKeydown(e, video) }} tabIndex={canTab} > 
                                                                    <TimeAgo date={ video.time }/><span>{ video.video.title }</span>
                                                                </li>)}
                    </ol>
                </Stage>;
    }
  }
  
  export default HistoryList;