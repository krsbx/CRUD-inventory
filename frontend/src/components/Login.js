import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import axiosInstance from './axios';

const styles = {
    root: {
      background: "black"
    },
    input: {
      color: "white"
    }
  };

export default class Login extends Component {
    constructor(props){
        super(props);

        const { classes } = props;

        this.state = {
            fields: {},
            errors: {}
        }
     }


    Submit = () => {
        const data = this.state.fields;

        if(this.handleValidation()){
            axiosInstance.post(`/api/login/`, {
                nip_nrk: data.nip_nrk,
                password: data.password,
            }).then((result) => {
                if(result.status === 200){
                    if(result.data.access_token){
                        localStorage.setItem('access_token', result.data.access_token);
                        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
                        console.log(localStorage.getItem('access_token'));
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

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    render () {
        return (
            <div className='Register'>
                <p>
                    <br /> <TextField variant="filled" color='primary' type='text' size="30" onChange={this.handleChange.bind(this, "nip_nrk")} value={this.state.fields["nip_nrk"]} 
                    label='NIP/NRK' InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 120 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["nip_nrk"]}</span>
                </p>
                <p>
                    <br /> <TextField variant="filled" color='primary' type='password' size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} 
                    label='Password' InputLabelProps={{className: 'label_textfield'}} InputProps={{className: 'login_textFields'}} inputProps={{ maxLength: 16, minLength: 8 }} />
                    <br /> <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                </p>
                <p>
                    <Button variant="contained" color="primary" onClick={() => this.Submit()}>Login!</Button>
                </p>
            </div>
        );
    }
}