import React, { Component } from 'react';
import styled from 'styled-components';

const Thumb = styled.li`
  box-sizing: content-box;
  display: block;
  width: 200px;
  height: 350px;
  border: 1px solid rgba( 0, 0, 0, 0.2 );
  float: left;
  margin: 0 10px 10px;
  
  transition: all 0.5s;
  
  &.selected{
    border: 1px solid rgba( 0, 0, 0 , 0.1 );
    transform-origin: center center;
    transform: scale( 1.1 );
    box-shadow: 0 5px 20px rgba( 0, 0, 0, 0.2 ), 0 2px 5px rgba( 0, 0, 0, 0.5 );
    position: relative;
    z-index: 100;
  }

  img{
    width:  ${props => ( props.width + 'px' )};
    height:  ${props => ( props.height + 'px' )};
    display: block;
    background: #cccccc;
  }

  h3{
    padding: 10px 10px;
  }
`

class Video extends Component {
  render() {
      const cover = this.props.viewed ? this.props.metadata.images[0].url : "";
      const height = this.props.viewed ? Math.floor( this.props.metadata.images[0].height / this.props.metadata.images[0].width * 200 ) : 0;
      const width = this.props.viewed ? 200 : 0;

      const alt = this.props.viewed ? this.props.metadata.title : "waiting";
      const title = this.props.metadata.title || "No-title";

      const selected = this.props.selected ? "selected" : "";
      const className = (['video', selected]).join(" ");

      return  <Thumb className={className} height={height} width={width} >
                <img src={cover} alt={alt}/>
                <h3>{title}</h3>           
              </Thumb>;
  }
}

export default Video;