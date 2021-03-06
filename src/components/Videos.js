import React, { Component } from 'react';
import Video from '../components/Video';
import VideoPlayer from '../components/VideoPlayer';
import VideosService from '../services/VideosService';
import styled from 'styled-components';

const Stage = styled.section`
    background: #eaeaea;
    width: 100vw;
    height: calc( 100vh - 75px );

    overflow: hidden;

    transition: all 0.5s;
   
    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: center;

    &.loading,
    &.error{
        line-height: 1.5em;
        text-align: center;
        color: rgba( 0, 0, 0, 0.5 );

        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        font-weight: bold;
    }

    &.error {    
        color: red;
    }

`

const Wrap = styled.div = styled.ul`
    height: 425px;
    overflow:hidden;
    width: 100%;
    padding: 25px 0;
`

const Content = styled.ul`
    height: 400px;
    padding: 0 25px;
    margin-left: ${props => ( -1 * props.scroll + 'px' )};
    transition: all 0.5s;
    width:  ${props => ( props.size + 'px' )};
`

class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: undefined,
            selected: 0,
            playing: false
        };
        this.scrollWrap = null;

        VideosService.getVideos().then(response => {
            this.setState( ( state ) => { return { videos: response && response.result.entries ? response.result.entries : [] }; } );
        });
    }

    selectVideo( videoId ){
        (this.state.videos || []).some( ( element, index ) => {
            if( element.id === videoId ){
                this.setState( { selected: index } );                
                return true;
            }else{
                return false;
            }
        }, this);
    }

    _next(){
        if( this.state.playing ) return;
        this.setState((prevState, props)=>{ 
            return {
                selected: Math.min( prevState.selected + 1, this.state.videos.length - 1 )
            };
        });
    }

    _previous(){
        if( this.state.playing ) return;
        this.setState((prevState, props)=>{ 
            return {
                selected: Math.max( prevState.selected - 1, 0 )
            };
        });
    }

    _handleKey( event ){
        if(event.keyCode === 27){ this._handleVideoClosed(); }

        if( !this.props.visible || this.state.playing ) return;
        if(event.keyCode === 13){ this._handleVideoOpen(); }
        if(event.keyCode === 40){ this._next(); }
        if(event.keyCode === 39){ this._next(); }
        if(event.keyCode === 38){ this._previous(); }
        if(event.keyCode === 37){ this._previous(); }
        
    }

    _handleVideoOpen(){
        if( this.state.playing ) return;
        this.setState((prevState, props)=>{ 
            return {
                playing: this.state.videos[ this.state.selected ]
            };
        });
        this.props.onVideoPlays(this.state.videos[ this.state.selected ]);
    }

    _handleVideoClosed(){
        this.setState((prevState, props)=>{ 
            return {
                playing: false
            };
        });
        this.forceUpdate();
    }

    _calculateViewed(){
        if( !this.scrollWrap || !this.scrollWrap.children.length ) return 0;
        
        let wrapWidth = this.scrollWrap.parentNode.getBoundingClientRect().width;
        let itemWidth = this.scrollWrap.children[0].getBoundingClientRect().width + 22;

        let count = Math.floor( wrapWidth / itemWidth );
        let lastLimit = this.scrollWrap.children.length;

        let firstViewed = Math.min( Math.max( ( this.state.selected - count / 2 ), 0 ), lastLimit - count );
        let lastViewed = Math.max( Math.min( ( this.state.selected + count / 2 ), lastLimit ), count );

        let scroll = firstViewed * itemWidth;

        return { 
            first: Math.floor(firstViewed), 
            last: Math.ceil(lastViewed),
            middle: Math.round( ( lastViewed + firstViewed ) / 2 ),
            wrapWidth: wrapWidth,
            itemWidth: itemWidth,
            scroll: scroll,
            totalScroll: lastLimit * itemWidth
        };
    }

    _calculateScrollOffset(){
        if( !this.scrollWrap || !this.scrollWrap.children.length ) return 0;
        
    }

    _checkScrollState(){
        if( !this.scrollWrap || !this.scrollWrap.children.length ){
            setTimeout( ()=>this._calculateViewed(), 10 )
        }
    }

    componentDidMount(){
        setTimeout( ()=>this.forceUpdate(), 10 );
    }
    
    componentDidUpdate(prevProps, prevState){
        if( prevState && prevState.videos !== this.state.videos ) this.forceUpdate();
    }

    componentWillMount(){
        document.addEventListener("keydown", (e)=>this._handleKey(e), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", (e)=>this._handleKey(e) , false);
    }
    
    render() {
        let dynLimits = this._calculateViewed();
        let viewLimit = dynLimits.last || 0;

        let canTab = this.props.visible ? "0" : "";

        if( !this.state.videos ){               return <Stage className="loading">Loading...</Stage> }
        else if( !this.state.videos.length ){   return <Stage className="error">Error on loading.<br/> Please, check your connection and try again in a minute.</Stage> }
        else {
            let template =  <Stage>
                                { this.state.playing && 
                                    <VideoPlayer data={this.state.playing} onVideoEnd={()=>this._handleVideoClosed()} onVideoClosed={()=>this._handleVideoClosed()} /> 
                                }
                                <Wrap>
                                    <Content className="" innerRef={(wrap) => { this.scrollWrap = wrap; }} scroll={dynLimits.scroll} size={ dynLimits.totalScroll } >
                                        {this.state.videos.map((video, index) => <Video key={index} onFocus={ (e)=>this.selectVideo( video.id ) } onClick={ (e)=>this._handleVideoOpen( video.id ) } tabIndex={canTab} selected={ index === this.state.selected } viewed={ index <= viewLimit + 2 } metadata={video} />)}
                                    </Content>
                                </Wrap>
                            </Stage>
            return template;          
        }

    }
}

export default Videos;