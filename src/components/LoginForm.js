import React, { Component } from 'react';
import styled from 'styled-components';
import UserService from '../services/UserService';

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

    &> div{
        background: #cecece;
        border: 1px solid #a7a7a7;
        padding: 20px;
        box-shadow: 0px 5px 10px rgba( 0,0,0,0.5);
        width: 250px;

        h2{
            font-size: 0.7em;
            margin-bottom: 5px;
            text-align: center;
            font-weight: bold;
        }

        h3{
            font-size: 1.2em;
            margin-bottom: 25px;
            font-weight: bold;
            background: #ababab;
            padding: 20px;
            margin: -20px -20px 15px;
        }

        &>div{
            margin-bottom: 10px;

            input{
                font-size: 1.1em;
                border: none;
                border-top: 1px solid #00000042;
                margin-top: 5px;
                width: 100%;
                padding: 5px 7px;
                box-sizing: border-box;
                background: #ffffff3d;
                border-radius: 2.5px;
                box-shadow: inset 0 0 2px #0000005c;
            }

            &:hover{
                input{
                    background: white;
                }
            }
        }

        label {
            display: block;
            font-size: 0.7em;
            opacity: 0.5;
        }

        .error-alert{
            color: red;
            font-weight: bolder;
        }

        .primary{            
            display: block;
            width: 150px;
            margin: 20px auto;
            background: gray;
            color: white;
            border: none;
            height: 30px;
            border-radius: 25px;
            cursor: pointer;
            -webkit-transition: all 0.25s;
            transition: all 0.25s;

            &:hover{
                background: rgb( 66, 66, 66 );
            }
        }

        
        .secondary{            
            display: block;
            width: 100px;
            margin: 10px auto;
            background: none;
            border: none;
            height: 25px;
            border-radius: 25px;
            text-decotarion: undeline;
            cursor:pointer;

            transition: all 0.25s;

            &:hover{
                color: white;
                background: rgb( 66, 66, 66 );
            }        
        }
    }

`

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            error: ""
        };
        
        console.log( UserService.name );
    }

    _verifyForm(){
        if( this.refs.user.value.length < 3 ) return "The username must be at least 3 characters.";
        if( this.refs.password.value.length < 6 ) return "The password must be at least 6 characters.";
        if( this.refs.password.value !== this.refs.cpassword.value ) return "The password and the confirm must be the same.";

        return "";
    }

    _handleSubmitClick(e){
        if( !this.state.register ){
            UserService.login( this.refs.user.value, this.refs.password.value ).then(()=>this.props.loginComplete());
        }else{
            let errors = this._verifyForm();
            if( errors ){
                this.setState( ( state ) => { return { error: errors }; } );
            }else{
                UserService.register( this.refs.user.value, this.refs.password.value ).then(()=>this.props.loginComplete()); 
            }                       
        }        
    }

    _handleRegisterClick(e){
        this.setState( ( state ) => { return { register: !state.register }; } );
    }

    render() {

        const title = this.state.register ? "Register" : "Login";
        const regAction = this.state.register ? "go back" : "create account";

        return  <Stage>
                    <div>
                        <h3>{ title }</h3>
                        { this.state.error && (
                            <div className="error-alert">
                                { this.state.error }
                            </div>
                        ) }
                        <div>
                            <label>Username</label>
                            <input ref="user" type="text" name="user" />
                        </div>
                        <div>
                            <label>Password</label>
                            <input ref="password" type="password" name="password" />
                        </div>
                        { this.state.register && (
                            <div>
                                <label>Confirm Password</label>
                                <input ref="cpassword" type="password" name="cpassword" />
                            </div>
                        ) }
                        <div>
                            <button className="primary" onClick={ this._handleSubmitClick.bind(this) } >{ title }</button> 
                        </div>
                        <div>
                            <button className="secondary"  onClick={ this._handleRegisterClick.bind(this) } >{ regAction }</button>
                        </div>
                    </div>
                </Stage>;
    }
}

export default LoginForm;