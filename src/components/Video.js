import React, { Component } from 'react';
import styled from 'styled-components';

const Thumb = styled.li`
  box-sizing: content-box;
  display: block;
  width: 200px;
  height: 375px;
  border: 1px solid rgba( 0, 0, 0, 0.2 );
  float: left;
  margin: 0 10px 10px;
  
  transition: all 0.5s;

  margin-bottom: 50px;
  
  &.selected{
    border: 1px solid rgba( 0, 0, 0 , 0.1 );
    transform-origin: center center;
    transform: scale( 1.1 );
    box-shadow: 0 5px 20px rgba( 0, 0, 0, 0.2 ), 0 2px 5px rgba( 0, 0, 0, 0.5 );
    position: relative;
    z-index: 10;
  }

  img{
    width:  ${props => ( props.width + 'px' )};
    height:  ${props => ( props.height + 'px' )};
    display: block;
    background: #cccccc;
  }

  .fakecover{
    width:  ${props => ( props.width + 'px' )};
    height:  ${props => ( props.height + 'px' )};
    display: block;
    background: #cccccc;

    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-weight: bold;
  }

  h3{
    padding: 10px 10px;
    line-height: 1.25em;
  }
`

class Video extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loaded: false,
      };
  }

  handleImageLoaded() {
    this.setState({ loaded: true });
  }

  handleFocus(){
    this.props.onFocus();
  }

  handleClick(){
    this.props.onClick();
  }

  handleKeydown(e){
    if( e.keyCode === 13 ) this.props.onClick();
  }

  render() {
      const loaded = this.state.loaded || this.props.viewed;

      const cover = this.props.metadata.images[0].url;
      const height = Math.floor( this.props.metadata.images[0].height / this.props.metadata.images[0].width * 200 );
      const width = 200;

      const title = this.props.metadata.title || "no-title";

      const selected = this.props.selected ? "selected" : "";
      const className = (['video', selected]).join(" ");

    return  <Thumb className={className} height={height} width={width} tabIndex={this.props.tabIndex} onFocus={(e)=>{this.handleFocus()}} onMouseOver={ (e)=>{this.handleFocus()} } onClick={ (e)=>{this.handleClick()} } onKeyDown={(e)=>{ this.handleKeydown(e) }}>
              { loaded && cover && <img src={cover} onLoad={this.handleImageLoaded.bind(this)}/>}
              { !cover && <div className="fakecover">no-cover</div>}
              <h3>{title}</h3>           
            </Thumb>;
  }
}

export default Video;