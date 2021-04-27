import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { axiosInstance } from './AxiosInstance';
import jwt_decode from 'jwt-decode';

export default class Login extends Component {
    constructor(props){
        super(props);

        const { classes } = props;

        this.state = {
            fields: {},
            errors: {}
        }
     }

     /*
        Submit function will create a post request to login the user
            The result of the user action will be illustrated by the page redirecting the user to the homepage
    */

    Submit = event => {
        event.preventDefault();

        const data = this.state.fields;

        if(this.handleValidation()){
            axiosInstance.post(`/api/login/`, data).then((result) => {
                if(result.status === 200){
                    if(result.data.access_token){
                        localStorage.setItem('access_token', result.data.access_token);

                        //Decode The Access Token
                        const decode = jwt_decode(result.data.access_token);

                        //Cache the current user nip_nrk to
                        localStorage.setItem('nip_nrk', decode.user_id);

                        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
                    }
                    if(result.data.refresh){
                        localStorage.setItem('refresh', result.data.refresh);
                        console.log(localStorage.getItem('refresh'));
                    }
                    
                    localStorage.setItem('isAuthorized', true);
                    window.location.href = '/';
                }
            });
        }
    };

    /*
        handleValidation function will set state value for error input
            the function will check all user the input same as the database require or nots
    */

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //nip_nrk
        if(!fields["nip_nrk"]){
           formIsValid = false;
           errors["nip_nrk"] = "Cannot be empty";
        }
  
        if(typeof fields["nip_nrk"] !== "undefined"){
            if(!fields["nip_nrk"].match(/^[a-zA-Z0-9]+$/)){
               formIsValid = false;
               errors["nip_nrk"] = "Alpha Numeric Only";
            }
         }
 
        //password
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }
    
        if(typeof fields["password"] !== "undefined"){
             if(!fields["password"].match(/^[a-zA-Z0-9]+$/)){
                formIsValid = false;
                errors["password"] = "Alpha Numeric Only";
            }
        }

       this.setState({errors: errors});
       return formIsValid;
   }

   /*
        handleChange function will set the state value for text input
    */

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    /*
        render function is used to render all necessary component for the page
        render function will render:
            Textfield for NIP/NRK
            Textfield for Password
            Button for submitting response
    */

    render () {
        return (
            <div className='Login'>
                <form onSubmit={this.Submit}>
                    <p>
                        <br /> <TextField variant="filled" color='primary' type='text' size="30" onChange={this.handleChange.bind(this, "nip_nrk")} value={this.state.fields["nip_nrk"]} 
                        label='NIP/NRK' inputProps={{ maxLength: 120 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["nip_nrk"]}</span>
                    </p>
                    <p>
                        <br /> <TextField variant="filled" color='primary' type='password' size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} 
                        label='Password' inputProps={{ maxLength: 16, minLength: 8 }} />
                        <br /> <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                    </p>
                    <p>
                        <br /><Button variant="contained" color="primary" type="submit">Login!</Button>
                    </p>
                </form>
            </div>
        );
    }
}